<template>
  <div v-html="frameInfo">
    <!-- <iframe :src="linkUrl"></iframe> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      frameInfo:'',
      linkUrl:''
    }
  },
  mounted(){
    // if(this.$route.query)
    let linkUrl=this.$route.query.linkUrl
    this.linkUrl=linkUrl
    if(linkUrl!=undefined){
      this.getLinkInfo(linkUrl)
    }
  },
  methods:{
    getLinkInfo(link){
      console.log(link)
      let datas={
        linkUrl:link
      }
      this.$http.post('Api/Xfuapi/getLinkInfo',datas)
      .then(res =>{
        // console.log(JSON.stringify(res.data.data))
        this.frameInfo=res.data.data
      })
    }
  }

}
</script>

<style lang="css">
</style>
