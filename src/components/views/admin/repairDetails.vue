<template lang="html">
  <div>
    <x-header>报修详情</x-header>
    <pubRepairDetails ref="getData"></pubRepairDetails>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import pubRepairDetails from '@/components/common/pubRepairDetails'
export default {
  data(){
    return{

    }
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
      console.log(repair_id)
      // return
      if(repair_id!=''||repair_id!=undefined){
        let datas={
          "repair_id":repair_id
        }
        this.$http.post('/Api/Service/getRepairDetails',datas)
        .then(res =>{
          if(res.data.status==1){
            this.$refs.getData.getReapairDetails(res.data.data)
            // console.log(res.data.data)
            // this.repairDatail=res.data.data
            // this.processList=res.data.data.processInfo
            // for(let i)
            // console.log(this.processList)
          }
            // this.isLoaded=true
          // }
        })
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
