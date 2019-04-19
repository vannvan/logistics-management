<template>
  <div class="pubRepairList">
    <template v-if="isLoaded!=false">
      <div class="detailBox clearfix">
        <p class="detail_title">
          <badge :text="process(repairDatail.process).txt" :style="process(repairDatail.process)"></badge>
          <span class="icon-price-tags">{{repairDatail.repair_num}}</span>
          <span>{{repairDatail.date|date}}</span>
        </p>
        <div class="detail_content">
          故障详情：{{repairDatail.details}}
        </div>
        <div class="detail_content">
          联系方式：<a :href="'tel:' + repairDatail.tel">{{repairDatail.tel}}</a>
        </div>
        <p class="detail_footer">
          <span class="icon-user">{{repairDatail.user_name}}</span>
          <span class="icon-location" style="overflow:hidden">{{repairDatail.area}}</span>
        </p>
      </div>
      <!-- 图片 -->
      <template  v-if="repairDatail.photoFile!=null">
        <div class="photoBox clearfix">
          <template v-for="(item, index) in JSON.parse(repairDatail.photoFile)">
            <div class="imgItem">
              <!-- <img :src="photo_ab_url+item" alt="" ref="preView.getImgUrl"> -->
              <img v-gallery :src="photo_ab_url+item">
            </div>
          </template>
        </div>
      </template>

      <!-- 是管理员且未审核的 -->
      <template v-if="repairDatail.process==1&&userInfo.userType=='admin'">
        <divider>派工维修</divider>
        <div class="workerBox">
          <div class="workerType">
            {{areaType}}/{{workerType}}工
          </div>
          <div class="workerList clearfix">
            <template v-if="workerList.length!=0">
              <group>
                <template v-for="(item, index) in workerList">
                  <cell :title="item.name" is-link @click.native="getWorkerInfo(item.worker_id,'popShow')">
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
        <divider>报修进度</divider>
        <div class="processBox clearfix">
            <template v-for="(item, index) in processList">
                    <div style="width:100%;margin-bottom:15px;height:auto;" class="clearfix">
                      <div style="width:10%;display:block;float:left;margin-right:2%">
                      {{item.time|dateTime}}
                      </div>
                      <div style="width:85%;display:block;float:left;">
                        <p style="font-size:16px;" :style="{color:RandomColor()}">{{item.status}}</p>{{item.info}}
                      </div>
                    </div>
            </template>
        </div>
      </template>
      <!-- 维修工操作 -->
      <template v-if="userInfo.userType=='worker'&&repairDatail.process==3">
        <div class="workerActionBox">
          <x-button type="primary" plain @click.native="fanishWork(repairDatail.repair_id)">完成维修</x-button>
          <!-- <x-button type="warn" plain @click.native="fanishWork(repairDatail.repair_id)">转交工单</x-button> -->
        </div>
      </template>
      <!-- 管理员操作 -->
      <template v-if="userInfo.userType=='admin'&&repairDatail.process==3">
        <div class="workerInfo">
          <group>
            <cell title="维修工姓名">
              <span>{{workerInfo.name}}</span>
            </cell>
            <cell title="联系电话">
              <a :href="'tel:' + workerInfo.tel">{{workerInfo.tel}}</a>
            </cell>
          </group>
          <!-- <group>
            <x-button type="warn" plain @click.native="">重新派工</x-button>
          </group> -->
        </div>
      </template>
      <template v-if="repairDatail.process==5">
        <div class="raterBox">
          <cell title="管理员评分">
            <rater v-model="repairDatail.admin_rater" star="☻" active-color="#FF9900"  :font-size=30 :margin="6" disabled></rater>
          </cell>
          <cell title="维修工评分">
            <rater v-model="repairDatail.worker_rater" star="☻" active-color="#FF9900" :font-size=30 :margin="6"  disabled></rater>
          </cell>
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
const domain_url = 'http://127.0.0.1/composerProject/logistics-management-api/uploads/'
import URL_CONFIG from '@/assets/js/urlConfig.js';
import workerPop from '@/components/common/workerPop'
import { mapState } from 'vuex'
import { formatDate } from '@/assets/js/date.js';
import { Badge,XHeader,LoadMore,Divider,Group,Cell,XButton,Rater  } from 'vux'
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
      workerInfo:[],
      photo_ab_url:domain_url
    }
  },
  components: {
    Badge,
    XHeader,
    LoadMore,
    Divider,
    Group,
    Cell,
    workerPop,
    XButton,
    Rater,
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
        actionStatus:state => state.actionStatus.actionStatus
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
      }
    },
    process(){
      return function(process){
        let formatProcess = {
          txt:'',
          color:''
        }
        switch(process){
          case 1:
          return formatProcess = {txt:'已申报',background:'#ff0000'}
          break;
          case 2:
          return formatProcess = {txt:'已审核',background:'#00CC99'}
          break;
          case 3:
          return formatProcess = {txt:'已派工',background:'#CEEF00'}
          break;
          case 5:
          return formatProcess = {txt:'已完工',background:'#009933'}
          break;
          case 4:
          return formatProcess = {txt:'已转单',background:'#BF7E00'}
          break;
        }
      }
    },
  },
  mounted(){
    // this.getWorkerList()
    //根据工单进度调取相应接口
    // console.log(this.actionStatus)
  },
  methods: {
    getReapairDetails(data) {
      this.isLoaded=true
      this.repairDatail=data
      this.processList=data.processInfo
      console.log(this.repairDatail.photoFile)
      if(this.userInfo.userType=='admin'&&this.repairDatail.process!=5){
        this.getWorkerList()
      }
      // 当工单状态为3的时候获取维修工信息
      if(this.repairDatail.process==3){
        this.getWorkerInfo(this.repairDatail.worker_id,'getInfo')
      }
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
      this.$http.post(URL_CONFIG.UrlConfig.getWorkerList,datas)
      .then(res =>{
        if(res.data.status==1){
          this.workerList=res.data.data
        }
      })
    },
    getWorkerInfo(worker_id,type){
      let datas = {
        worker_id:worker_id
      }
      // console.log(datas)
      // return
      this.$http.post(URL_CONFIG.UrlConfig.getWorkerInfo,datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          if(type=='popShow'){
            this.leftPop.show=true
            this.$refs.workerData.getWorkerInfo(res.data.data)
          }
          if(type=='getInfo'){
            this.workerInfo=res.data.data
          }

        }
      })
    },
    fanishWork(service_id){
      this.$store.commit('setActionStatus',true)
        let datas = {
          service_id:service_id,
          worker_name:this.userInfo.name
        }
      this.$http.post(URL_CONFIG.UrlConfig.finishWork,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.$store.commit('setActionStatus',true)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.pubRepairList{
  padding-bottom: pxTorem(70px);
  .vux-divider{
    padding: 10px 3% !important;
  }

  .workerBox,.raterBox,.processBox,.detailBox,.workerActionBox,.workerInfo,.photoBox{
    width: 90%;
    height: auto;
    margin: pxTorem(25px) auto 0 auto;
    background: #F2F7F0;
    padding: 8px 8px 15px 8px;
    box-shadow: #ccc 0px 3px 5px;
    .workerType{
      text-align: center;
      font-size: pxTorem(28px)
    }
    .weui-cells{
      background: #f2f7f0 !important
    }
  }
  .imgItem{
    img{
      width: 20%;
      margin-right: 10%;
      float: left;
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

  .detail_title{
    height: auto;
    // font-size: 18px;
    margin-bottom: 5px;
  }
  .detail_title>span:nth-child(1){
    margin-bottom: 5px;
  }
  .detail_title>span:nth-child(2){
    font-size: pxTorem(25px);
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
