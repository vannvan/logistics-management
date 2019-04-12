<template lang="html">
  <div class="repairList">
    <template  v-if="repairList.length!=0">
      <card v-for="(item, index) in repairList" :key="index">
        <div slot="content" class="card-padding" v-on:click="gotoRepairDetails(item.repair_id)">
          <p style="color:#999;font-size:12px;line-height:25px">{{item.date|date}}
             <span style="float:right" v-if="item.finishSpend!=-1" class="houerBadge">
              <badge :text="toHouer(item.finishSpend)"></badge>
             </span>
             <span style="float:right" v-else>
               <badge :text="process(item.process)"></badge>
             </span>
           </p>
          <p style="font-size:14px;line-height:1.5;">类型：{{item.type}}</p>
          <p style="font-size:14px;line-height:1.5;">{{item.details}}</p>
          <span class="icon-location" style="overflow:hidden">{{item.area}}</span>
          <!-- <p style="font-size:14px;line-height:1.5;"><span class="icon-price-tags" style="font-size:8px">{{item.repair_num}}</span></p> -->
        </div>
      </card>
    </template>

    <template v-else="repairList.length==0">
      <Empty></Empty>
    </template>
  </div>
</template>

<script>
import Empty from '@/components/common/empty'
import { formatDate } from '@/assets/js/date.js';
import { ButtonTab, ButtonTabItem, Divider,Card,Badge,XHeader,LoadMore } from 'vux'
export default {
  data(){
    return{
      repairList:[],
    }
  },
  components:{
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

  },
  methods:{
    getRepairList(data){
      this.repairList=data
    },
    gotoRepairDetails(id){
      this.$router.push({
        path:'/adminRepairDetails',
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
    margin-bottom: pxTorem(60px);
    // padding: pxTorem(20px)
  }
  .myRepair{
    padding: pxTorem(20px);
  }

</style>
