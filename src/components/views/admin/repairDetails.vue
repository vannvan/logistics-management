<template lang="html">
  <div>
    <x-header>报修详情</x-header>
    <pubRepairDetails ref="getData"></pubRepairDetails>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { XHeader } from 'vux'
import { mapState } from 'vuex'
import pubRepairDetails from '@/components/common/pubRepairDetails'
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
        actionStatus:state => state.actionStatus.actionStatus
    }),
  },
  watch:{
    actionStatus:{
      handler(newV){
        if(newV){
          this.getInspectDetail()
        }
      }
    },
    immediate:true
  },
  components:{
    pubRepairDetails,XHeader
  },
  mounted(){
    // this.$refs.getData.getReapairDetails('ajajaj')
    this.getInspectDetail()
  },
  methods: {
    getInspectDetail(){
      let repair_id=this.$route.query.repair_id
      // console.log(repair_id)
      // return
      if(repair_id!=''||repair_id!=undefined){
        let datas={
          "repair_id":repair_id
        }
        this.$http.post(URL_CONFIG.UrlConfig.pubGetRepairDetails,datas)
        .then(res =>{
          if(res.data.status==1){
            this.$refs.getData.getReapairDetails(res.data.data)
            this.$store.commit('setActionStatus',false)
          }
        })
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
