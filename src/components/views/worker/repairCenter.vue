<template lang="html">
  <div class="content">
    <x-header>我的工单</x-header>
    <div class="myRepair">
      <repairList ref="getData"></repairList>
      <divider v-if="hasMore"><span class="more" @click="getMore(10)">更多</span></divider>
    </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import repairList from '@/components/common/repairList'
import { ButtonTab, ButtonTabItem, Divider,XHeader } from 'vux'

export default {
  data(){
    return{
      repairList:[],
      pageSize:10,
      hasMore:false
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
  mounted() {
    //do something after mounting vue instance
    this.getRepairList()
  },
  methods: {
    getMore(IncPageSize){
      if(IncPageSize){
        this.pageSize+=10
      }
      this.getRepairList('','')
    },
    getRepairList(process,IncPageSize=10){
      let datas = {
        process:[3],
        area:this.userInfo.area,
        pageSize:this.pageSize,
        worker_id:this.userInfo.worker_id
      }
      // if()
      this.$http.post(URL_CONFIG.UrlConfig.pubGetRepairList,datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          // this.repairList=res.data.data
          this.$refs.getData.getRepairList(res.data.data)
          if(res.data.data.length%10!=0||res.data.data.length==0){
            this.hasMore = false
          }else{
            this.hasMore = true
          }
          // console.log(this.repairList.length)
        }
      })
    },
  }
}
</script>

<style lang="css" scoped>
</style>
