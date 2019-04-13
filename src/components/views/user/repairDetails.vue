<template>
  <div>
    <div class="studentRepair">
    <x-header>报修详情</x-header>
    <template v-if="isLoaded!=false">
      <div class="detailBox clearfix">
        <p class="detail_title">
          <badge :text="process(repairDatail.process).txt" :style="process(repairDatail.process)"></badge>
          <span class="icon-price-tags">{{repairDatail.repair_num}}</span>
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
      </div>
    </template>
    <template v-else>
      <load-more tip="正在加载"></load-more>
    </template>
    <template v-if="repairDatail.process==5">
      <div class="raterBox">
        <cell title="管理员评分">
          <rater v-model="repairDatail.admin_rater" star="☻" active-color="#FF9900"  :font-size=30 :margin="6" :disabled="isDisabled" @click.native="doRater(repairDatail.repair_id,repairDatail.admin_rater)"></rater>
        </cell>
        <cell title="维修工评分">
          <rater v-model="repairDatail.worker_rater" star="☻" active-color="#FF9900" :font-size=30 :margin="6"  :disabled="isDisabled" @click.native="doRater(repairDatail.repair_id,repairDatail.worker_rater)"></rater>
        </cell>
        <!-- <template v-if="repairDatail.admin_rater===0&&repairDatail.worker_rater===0">
          <x-button type="primary" plain @click.native="doRater(repairDatail.repair_id)">确认评价</x-button>
        </template> -->
      </div>

    </template>
  </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { formatDate } from '@/assets/js/date.js';
import { Badge,XHeader,LoadMore,Divider,Rater,Cell,XButton } from 'vux'
export default {
  data() {
    return {
      repairDatail:[],
      repairId:'',
      isLoaded:false,
      processList:[],
      isDisabled:false
    }
  },
  components: {
    Badge,
    XHeader,
    LoadMore,
    Divider,
    Rater,
    Cell,
    XButton
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
    this.getInspectDetail()
  },
  methods:{
    getInspectDetail(){
      let repair_id=this.$route.query.repair_id
      // console.log(repair_id)
      // return
      if(repair_id!=''||repair_id!=undefined){
        let datas={
          "repair_id":repair_id
        }
        this.$http.post(URL_CONFIG.UrlConfig.studentGetRepairDetails,datas)
        .then(res =>{
          if(res.data.status==1){
            // console.log(res.data.data)
            this.repairDatail=res.data.data
            this.processList=res.data.data.processInfo
            if(this.repairDatail.worker_rater!=0&&this.repairDatail.admin_rater!=0){
              this.isDisabled = true
            }
            // for(let i)
            // console.log(this.processList)
          }
            this.isLoaded=true
          // }
        })
      }
    },
    doRater(repair_id,rater){
      if(this.isDisabled){
        return
      }
      let datas = {
        admin_rater:this.repairDatail.admin_rater,
        worker_rater:this.repairDatail.worker_rater,
        service_id:repair_id
      }
      this.$http.post(URL_CONFIG.UrlConfig.studentDoRater,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text('感谢你的评价！', 'middle')
          this.getInspectDetail()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.studentRepair{
  padding-bottom: pxTorem(70px);
  .vux-divider{
    padding: 10px 3% !important;
  }
  .detailBox,.processBox,.raterBox{
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
  .raterBox{
    .taterLabel{
      font-size: pxTorem(28px)
    }
  }

}

</style>
