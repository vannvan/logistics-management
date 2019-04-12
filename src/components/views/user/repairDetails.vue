<template>
  <div>
    <x-header>报修详情</x-header>
    <template v-if="isLoaded!=false">
      <div class="detailBox clearfix">
        <p class="detail_title">
          <badge :text="process(repairDatail.process)" :style="{background:RandomColor()}"></badge>
          <span class="icon-price-tags" style="font-size:8px">{{repairDatail.repair_num}}</span>
          <span>{{repairDatail.date|date}}</span>
        </p>
        <div class="detail_content">
          {{repairDatail.details}}
        </div>
        <p class="detail_footer">
          <span class="icon-user">{{repairDatail.user_name}}</span>
          <span class="icon-location" style="overflow:hidden">{{repairDatail.area}}</span>
        </p>
      </div>
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
    <template v-else>
      <load-more tip="正在加载"></load-more>
    </template>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDate } from '@/assets/js/date.js';
import { Badge,XHeader,LoadMore,Divider } from 'vux'
export default {
  data() {
    return {
      repairDatail:[],
      repairId:'',
      isLoaded:false,
      processList:[]
    }
  },
  components: {
    Badge,
    XHeader,
    LoadMore,
    Divider,
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
    this.getInspectDetail()
  },
  methods:{
    getInspectDetail(){
      let repair_id=this.$route.query.repair_id
      console.log(repair_id)
      // return
      if(repair_id!=''||repair_id!=undefined){
        let datas={
          "repair_id":repair_id
        }
        this.$http.post('/Api/Service/getRepairDetails',datas)
        .then(res =>{
          if(res.data.status==1){
            // console.log(res.data.data)
            this.repairDatail=res.data.data
            this.processList=res.data.data.processInfo
            // for(let i)
            // console.log(this.processList)
          }
            this.isLoaded=true
          // }
        })
      }
    },
  }
}
</script>

<style lang="scss">
.vux-divider{
  padding: 10px 3% !important;
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
</style>
