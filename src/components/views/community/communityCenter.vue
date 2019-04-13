<template>
  <div class="community">
    <button-tab>
        <button-tab-item @on-item-click="getRepairList()" selected>网络报修</button-tab-item>
        <button-tab-item @on-item-click="getInspectList()">服务监督</button-tab-item>
    </button-tab>
    <divider>{{currText}}</divider>
    <div v-if="activeTab==0">
      <card v-for="(item, index) in repairList" :key="index">
        <div slot="content" class="card-padding" v-on:click="gotoRepairDetails(item.id)">
          <p style="color:#999;font-size:12px;line-height:25px">{{item.date}}
             <span style="float:right" v-if="item.finishSpend!=-1" class="houerBadge">
              <badge :text="toHouer(item.finishSpend)"></badge>
             </span>
             <span style="float:right" v-else>
               <badge text="待完工"></badge>
             </span>
           </p>
          <p style="font-size:14px;line-height:1.5;">报修人：{{item.name}}</p>
          <p style="font-size:14px;line-height:1.5;">{{item.content}}</p>
        </div>
      </card>
      <divider><span class="more" @click="getRepairList(10)">更多</span></divider>
      <!-- <p  style="margin-top:15px">更多</p> -->
    </div>
    <div v-else>
      <card v-for="(item, index) in InspectList" :key="index">
        <div slot="content" class="card-padding"  v-on:click="gotoInspectDetails(item.id)">
          <p style="color:#999;font-size:12px;line-height:25px">{{item.postTimes}}
             <span style="float:right" v-html="formatType(item.typeName)"></span>
           </p>
          <p style="font-size:14px;line-height:1.5;">发帖人：{{item.userName}}
            <span style="float:right">
             [{{item.statusName}}]
            </span>
          </p>
          <p style="font-size:14px;line-height:1.5;">{{item.title}}</p>
        </div>
      </card>
      <divider v-if="hasMore"><span class="more" @click="getInspectList(10)">更多</span></divider>
    </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { ButtonTab, ButtonTabItem, Divider,Card,Badge } from 'vux'
export default {
  data(){
    return{
      currText:'',
      activeTab:'',
      repairList:[],
      InspectList:[],
      pageSize:10,
      hasMore:false
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    Card,
    Badge
  },
  mounted() {
    //do something after mounting vue instance
    this.getRepairList()
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading
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
  methods: {
    getRepairList(IncPageSize) {
      if(IncPageSize){
        this.pageSize+=10
      }
      let datas={
        "pageSize":this.pageSize
      }
      this.$http.post(URL_CONFIG.UrlConfig.getRepairList,datas)
      .then(res =>{
        this.currText='网络报修信息'
        this.activeTab=0
        this.repairList=res.data.data.rows
        this.hasMore = true
        // console.log(this.repairList)
      })
    },
    getInspectList(IncPageSize){
      if(IncPageSize){
        this.pageSize+=10
      }
      let datas={
        "pageSize":this.pageSize
      }
      this.$http.post(URL_CONFIG.UrlConfig.getInspectList,datas)
      .then(res =>{
        this.currText='服务监督信息'
        this.activeTab=1
        this.InspectList=res.data.data.rows
        this.hasMore = true
        // console.log(this.InspectList)
      })
    },
    gotoInspectDetails(itemId){
      this.$router.push({
        path:'/inspectDetail',
        query:{
          "inspectId":itemId
        }
      });
    },
    gotoRepairDetails(itemId){
      this.$router.push({
        path:'/repairDetail',
        query:{
          "repairId":itemId
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
.community{
  padding: pxTorem(20px)
}
</style>
