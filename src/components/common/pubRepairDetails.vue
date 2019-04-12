<template>
  <div class="pubRepairList">
    <template v-if="isLoaded!=false">
      <div class="detailBox clearfix">
        <p class="detail_title">
          <badge :text="process(repairDatail.process)" :style="{background:RandomColor()}"></badge>
          <span class="icon-price-tags" style="font-size:8px">{{repairDatail.repair_num}}</span>
          <span>{{repairDatail.date|date}}</span>
        </p>
        <div class="detail_content">
          {{repairDatail.content}}
        </div>
        <p class="detail_footer">
          <span class="icon-user">{{repairDatail.user_name}}</span>
          <span class="icon-location" style="overflow:hidden">{{repairDatail.area}}</span>
        </p>
      </div>
      <!-- 是管理员且未审核的 -->
      <template v-if="repairDatail.process==1&&userInfo.userType=='admin'">
        <divider>派工维修</divider>
        <div class="workerBox">
          <div class="workerInfo">
            {{areaType}}/{{workerType}}工
          </div>
          <div class="workerList clearfix">
            <template v-if="workerList.length!=0">
              <group>
                <template v-for="(item, index) in workerList">
                  <cell :title="item.name" is-link @click.native="getWorkerInfo(item.id)">
                    <i class="icon-user" slot="icon" :style="{color:statusColor(item.status)}"></i>
                    <span>{{item.tel}}</span>
                  </cell>
                </template>
              </group>
            </template>
            <template v-else>
              <div class="emptyWorker">
                {{areaType}}暂无{{workerType}}维修工
              </div>
            </template>

          </div>
        </div>
      </template>
      <template v-if="repairDatail.process!=1">
        <divider>进度详情</divider>
        <div class="processBox clearfix">
            <template v-for="(item, index) in processList">
                    <div style="width:100%;margin-bottom:15px;height:auto;" class="clearfix">
                      <div style="width:10%;display:block;float:left;margin-right:2%;">
                      {{item.time|dateTime}}
                      </div>
                      <div style="width:88%;display:block;float:left">
                        <p style="font-size:16px;" :style="{color:RandomColor()}">{{item.status}}</p>{{item.info}}
                      </div>
                    </div>
            </template>
          <div class="stepBox">
            <template v-for="i in 5">
              <p></p>
            </template>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <load-more tip="正在加载"></load-more>
    </template>
    <workerPop ref="workerData" v-show="leftPop.show=true"></workerPop>
  </div>
</template>

<script>
import workerPop from '@/components/common/workerPop'
import { mapState } from 'vuex'
import { formatDate } from '@/assets/js/date.js';
import { Badge,XHeader,LoadMore,Divider,Group,Cell } from 'vux'
export default {
  data(){
    return{
      repairDatail:[],
      repairId:'',
      isLoaded:false,
      processList:[],
      workerList:[],
      leftPop:{
        show:false,
        type:'',
      },
      areaType:'',
      workerType:'',
    }
  },
  components: {
    Badge,
    XHeader,
    LoadMore,
    Divider,
    Group,
    Cell,
    workerPop
  },
  filters:{
    date:function(timestamp){
        let data=new Date(timestamp*1000)
        return formatDate(data,'yyyy-MM-dd hh:mm')
    },
    dateTime:function(timestamp){
      let data=new Date(timestamp*1000)
      return formatDate(data,'MM-dd hh:mm')
  }
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading,
        userInfo: state => state.userInfo.userInfo,
        ajaxIsLoading: state => state.ajaxSwitch.ajaxIsLoading,
        responseData: state => state.responseInfo.response
    }),
    RandomColor() {
      return function(){
        let r, g, b;
				r = Math.floor(Math.random() * 256);
				g = Math.floor(Math.random() * 256);
				b = Math.floor(Math.random() * 256);
				return "rgb(" +r + ',' +g+ ',' +b+ ")";
      }
		},
    statusColor() {
      return function(status){
        if(status==0){
          return '#f00'
        }else{
          return "#18B500"
        }
        // let r, g, b;
        // r = Math.floor(Math.random() * 256);
        // g = Math.floor(Math.random() * 256);
        // b = Math.floor(Math.random() * 256);
        // return "rgb(" +r + ',' +g+ ',' +b+ ")";
      }
    },
    process(){
      return function(process){
        switch(process){
          case 1:
          return '已申报';
          break;
          case 2:
          return '已审核';
          break;
          case 3:
          return '已派工';
          break;
          case 5:
          return '已完工';
          break;
          case 4:
          return '已转单';
          break;
        }
      }
    },
  },
  mounted(){
    // this.getWorkerList()
  },
  methods: {
    getReapairDetails(data) {
      this.isLoaded=true
      this.repairDatail=data
      this.processList=data.processInfo
      this.getWorkerList()
    },
    getWorkerList(){
      let type = this.repairDatail.type
      let area = this.repairDatail.area
      // var str = "000/asdasf/asfaewf/agaegr/trer/rhh";
      let index = type .indexOf("\/");
      this.workerType = type .substring(0, index);
      this.areaType = area.substring(0,2)
      let datas = {
        type:this.workerType,
        area:this.areaType
      }
      this.$http.post("Api/Worker/getWorkerList",datas)
      .then(res =>{
        if(res.data.status==1){
          this.workerList=res.data.data
        }
      })
    },
    getWorkerInfo(worker_id){
      let datas = {
        id:worker_id
      }
      // console.log(datas)
      // return
      this.$http.post('Api/Worker/getWorkerInfo',datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          this.leftPop.show=true
          // this.workerInfo=res.data.data
          this.$refs.workerData.getWorkerInfo(res.data.data)
        }
      })
    },
  }
}
</script>

<style lang="scss">
.pubRepairList{

  .workerBox{
    width: 90%;
    height: auto;
    margin: pxTorem(25px) auto 0 auto;
    background: #fff;
    padding: 8px 8px 15px 8px;
    box-shadow: #ccc 0px 3px 5px;
    .workerInfo{
      text-align: center;
    }
  }
  .emptyWorker{
    height: pxTorem(150px);
    width: 60%;
    background: #f6f6f6;
    // color: #f00;
    line-height: pxTorem(150px);
    font-size: pxTorem(30px);
    text-align: center;
    margin: pxTorem(30px) auto;
    border-radius: pxTorem(10px)
  }
  .detailBox,.processBox{
    width: 90%;
    height: auto;
    margin: pxTorem(25px) auto 0 auto;
    background: #F2F7F0;
    padding: 8px 8px 15px 8px;
    box-shadow: #ccc 0px 3px 5px;
  }
  .detail_title{
    height: auto;
    // font-size: 18px;
    margin-bottom: 5px;
  }
  .detail_title>span:nth-child(1){
    margin-bottom: 5px;
  }
  .detail_title>span:nth-child(2){
    font-size: 8px;
    // color: #f00
  }
  .detail_title>span:nth-child(3){
    float: right;
  }
  .detail_info{
    width: 100%;
    margin-bottom: 5px;
  }
  .detail_info>span{
    margin-right: 12px;
  }
  .detail_content{
    line-height: 24px;
    margin-bottom: 5px;
  }
  .timeBox{
    // width:10%;
    height: auto;
    // background: #ccc;
    float: left;
  }
  .stepBox{
    width: 5%;
    height: auto;
    background: #f00;
    float: left;
  }
  .stepBox>p{
    position: relative;
  }
  // .stepBox>p::before{
  //   content: '';
  //   display: block;
  //   position: absolute;  /*日常绝对定位*/
  //   left:0;
  //   top:0;
  //   height: 8px;
  //   width: 8px;
  //   background: #000;
  // }
  .infoBox{
    // background:
    width:85%;
    height: auto;
    float: left;
    // overflow-x:scroll;
  }
  .infoBox>p:nth-child(odd){
    font-size: 15px;
    font-weight: bolder;
    white-space :nowrap
  }
  .timeBox>p{
    display: block;
    background: #f00;
    font-size: 6px;
    margin-bottom: 15px;
  }
  .statusBox{
    width: 10%;
    float: left;
  }
}
</style>
