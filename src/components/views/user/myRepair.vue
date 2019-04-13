<template>
  <div>
    <x-header>报修纪录</x-header>
    <div class="myRepair">
    <button-tab>
        <button-tab-item @on-item-click="getRepairList(-1)" selected>未完工</button-tab-item>
        <button-tab-item @on-item-click="getRepairList(1)">已完工</button-tab-item>
    </button-tab>
    <divider>{{currText}}</divider>
    <div class="repairList">
      <template  v-if="repairList.length!=0">
        <card v-for="(item, index) in repairList" :key="index">
          <div slot="content" class="card-padding" v-on:click="gotoRepairDetails(item.repair_id)">
            <p style="color:#999;font-size:12px;line-height:25px">{{item.date|date}}
               <span style="float:right" v-if="item.finishSpend!=-1" class="houerBadge">
                <badge :text="toHouer(item.finishSpend)"></badge>
               </span>
               <span style="float:right" v-else>
                 <badge :text="process(item.process).txt" :style="process(item.process)"></badge>
               </span>
             </p>
            <p style="font-size:14px;line-height:1.5;">类型：{{item.type}}</p>
            <p style="font-size:14px;line-height:1.5;">{{item.details}}</p>
            <!-- <p style="font-size:14px;line-height:1.5;"><span class="icon-price-tags" style="font-size:8px">{{item.repair_num}}</span></p> -->
          </div>
        </card>
      </template>

      <template v-else="repairList.length==0">
        <Empty></Empty>
      </template>
    </div>
    </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import Empty from '@/components/common/empty'
import { mapState } from 'vuex'
import { formatDate } from '@/assets/js/date.js';
import { ButtonTab, ButtonTabItem, Divider,Card,Badge,XHeader,LoadMore } from 'vux'
export default {
  data(){
    return{
      repairList:[],
      currText:'未完成'
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    Card,
    Badge,
    XHeader,
    LoadMore,
    Empty
  },
  filters:{
      date:function(timestamp){
        let data=new Date(timestamp*1000)
        return formatDate(data,'yyyy-MM-dd hh:mm')
    }
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading,
        userInfo: state => state.userInfo.userInfo,
    }),
    ...mapState({
  　　　 ajaxIsLoading: state => state.ajaxSwitch.ajaxIsLoading
    }),
    toHouer(){
      return function(minutes){
        if(Math.floor(minutes/60)>0){
          return ((minutes/60).toFixed(1) + "小时");
        }else{
          return minutes+"分钟"
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
    formatType(){
      return function(typename){
        if(typename=='建议'){
          return "<span style='color:#19be6b'><b>[建议]</b></span>"
        }else if(typename=='投诉'){
          return "<span style='color:#f00'><b>[投诉]</b></span>"
        }else{
          return typename
        }
      }
    },
  },
  mounted(){
    if(this.userInfo.student_name==undefined){
      this.$vux.toast.text('请登录', 'middle')
      this.$router.push({path:'/loginReg'})
    }
    this.getRepairList()
  },
  methods:{
    getRepairList(process){
      if(process==1){
        process=[5]
        this.currText='已完成'
      }else{
        process=[1,2,3,4]
        this.currText='未完成'
      }
      let datas = {
        user_id:this.userInfo.student_id,
        process:process
      }
      // if()
      this.$http.post(URL_CONFIG.UrlConfig.studentGetRepairList,datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          this.repairList=res.data.data
          // console.log(this.repairList.length)
        }
      })
    },
    gotoRepairDetails(id){
      this.$router.push({
        path:'/myRepairDetails',
        query:{
          "repair_id":id
        }
      });
    }
  }
}
</script>

<style lang="scss">
.weui-panel__bd{
  padding: pxTorem(20px) !important;
  border-radius:8px !important

}
.houerBadge>.vux-badge{
  background: #19be6b !important
}
.more{
  text-align: center;
  font-size: 16px;
  color: #999 !important
}
.repairList{
  // padding: pxTorem(20px)
}
.myRepair{
  padding: pxTorem(20px)
}
</style>
