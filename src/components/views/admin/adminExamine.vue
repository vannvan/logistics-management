<template>
  <div class="adminExamine">
    <x-header>派工中心</x-header>
    <div class="myRepair">
    <button-tab>
        <button-tab-item @on-item-click="getRepairList(-1,'')" selected>未派工</button-tab-item>
        <button-tab-item @on-item-click="getRepairList(1,'')">已派工</button-tab-item>
    </button-tab>
    <divider>{{currText}}</divider>
    <repairList ref="getData"></repairList>
    <divider v-show="hasMore"><span class="more" @click="getMore(10)">更多</span></divider>
    </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import repairList from '@/components/common/repairList'
import { mapState } from 'vuex'
import { ButtonTab, ButtonTabItem, Divider,XHeader } from 'vux'
export default {
  data(){
    return{
      repairList:[],
      currText:'未完成',
      pageSize:10,
      hasMore:true
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    XHeader,
    repairList
  },
  filters:{
      date:function(timestamp){
        let data=new Date(timestamp*1000)
        return formatDate(data,'yyyy-MM-dd hh:mm')
    }
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
  },
  mounted(){
    this.getRepairList()
  },
  methods:{
    getMore(IncPageSize){
      if(IncPageSize){
        this.pageSize+=10
      }
      this.getRepairList('','')
    },
    getRepairList(process,IncPageSize=10){
      if(process==1){
        process=[3]
        this.currText='已派工'
      }else{
        process=[1]
        this.currText='未派工'
      }
      let datas = {
        process:process,
        area:this.userInfo.area,
        pageSize:this.pageSize,
        admin_id:this.userInfo.admin_id
      }
      if(datas.area='全校'){
        datas.area=''
      }
      // if()
      this.$http.post(URL_CONFIG.UrlConfig.pubGetRepairList,datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          // this.repairList=res.data.data
          this.$refs.getData.getRepairList(res.data.data)
          if(res.data.data.length%10!=0){
            this.hasMore=false
          }
          // console.log(this.repairList.length)
        }
      })
    },

  }
}
</script>

<style lang="scss">
.adminExamine{

}
</style>
