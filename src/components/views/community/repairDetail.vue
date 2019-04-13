<template>
  <div>
    <div class="pubRepairDetails">
    <x-header>报修详情</x-header>
    <template v-if="isLoaded!=false">
      <div class="detailBox clearfix">
        <p class="detail_title">
          <badge :text="repairDatail.text_category" :style="{background:RandomColor()}"></badge>
          <span class="icon-price-tags">{{repairDatail.repair_num}}</span>
          <span>{{repairDatail.date}}</span>
        </p>
        <div class="detail_content">
          {{repairDatail.content}}
        </div>
        <p class="detail_footer">
          <span class="icon-user">{{repairDatail.studentName}}</span>
          <span class="icon-location" style="overflow:hidden">{{repairDatail.area}}</span>
        </p>
      </div>
      <divider>进度详情</divider>
      <div class="processBox clearfix">
          <template v-for="(item, index) in process">
              <!-- <div class=""> -->
                  <div style="width:100%;margin-bottom:15px;height:auto;" class="clearfix">
                    <div style="width:10%;display:block;float:left;margin-right:2%;">
                      {{item.date}}<br/>{{item.time}}
                    </div>
                    <!--  -->
                    <div style="width:88%;display:block;float:left">
                      <p style="font-size:16px;" :style="{color:RandomColor()}">{{item.status}}</p>{{item.info}}
                    </div>
                  </div>


              <!-- </div> -->
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
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { Badge,XHeader,LoadMore,Divider } from 'vux'
export default {
  data() {
    return {
      repairDatail:[],
      repairId:'',
      isLoaded:false,
      process:[]
    }
  },
  components: {
    Badge,
    XHeader,
    LoadMore,
    Divider,
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
		}
  },
  mounted(){
    this.getInspectDetail()
  },
  methods:{
    getInspectDetail(){
      let repairId=this.$route.query.repairId
      if(repairId!=''||repairId!=undefined){
        let datas={
          "repairId":this.$route.query.repairId
        }
        this.$http.post(URL_CONFIG.UrlConfig.getRepairredirect,datas)
        .then(res =>{
          let timeArr=res.data.data.process.time
          let statusArr=res.data.data.process.status
          let infoArr=res.data.data.process.info
          if(res.data.status==1){
            for (var i = 0; i < timeArr.length; i++) {
                var obj = {
                    date:timeArr[i].substring(5,10),
                    time:timeArr[i].substring(10,16),
                    status:statusArr[i],
                    info:infoArr[i]
                };
                this.process.push(obj);
            }
            this.repairDatail=res.data.data
            this.isLoaded=true
          }
        })
      }
    },
  }
}
</script>

<style lang="scss">
.pubRepairDetails{
  padding-bottom: pxTorem(30px);
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
}

</style>
