<template>
  <div>
    <swiper loop auto :list="bannerList"></swiper>
    <divider>后勤服务</divider>
    <grid :show-lr-borders="false" :cols="3">
      <grid-item :label="item.title" v-for="(item,index) in serviceList" :key="index">
        <!-- {{item.title}} -->
        <img slot="icon" :src="item.url"  @click="getLinkInfo(index,item.linkUrl)">
      </grid-item>
    </grid>
    <divider>便民服务</divider>
    <grid :show-lr-borders="false" :cols="3">
      <grid-item :label="item.title" v-for="(item,index) in convenientList" :key="index" :link="item.linkUrl">
        <!-- {{item.title}} -->
        <img slot="icon" :src="item.url">
      </grid-item>
    </grid>
  </div>
</template>

<script>
// require("@/assets/json/getBanner.js");
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { Swiper,Divider,Grid, GridItem} from 'vux'
export default {
  data () {
    return {
      bannerList: [],
      serviceList:[],
      convenientList:[]
    }
  },
  components: {
     Swiper,Divider,Grid,GridItem,
  },
  mounted() {
    this.getBanner()
    this.getServiceList()
    this.getConvenientList()
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading
    }),
    ...mapState({
  　　　 ajaxIsLoading: state => state.ajaxSwitch.ajaxIsLoading
    })
  },
  methods: {
    getBanner() {
      this.$http.get(URL_CONFIG.UrlConfig.getBannerList)
      // this.$http.get('/api/getBanner')
      .then(res =>{
        // console.log(res.data.errorCode)
        if(res.data.errorCode==0){
          this.bannerList=res.data.data
          this.bannerList=JSON.parse(JSON.stringify(this.bannerList).replace(/url/g,"img"));//将对象属性值url替换为img
          this.bannerList.forEach(function(e){ e.title='' })
        }
        // console.log(this.bannerList)
      })
    },
    getServiceList(){
      this.$http.get(URL_CONFIG.UrlConfig.getServiceList)
      .then(res =>{
        if(res.data.errorCode==0){
          this.serviceList=res.data.data
        }
      })
    },
    getConvenientList(){
      this.$http.get(URL_CONFIG.UrlConfig.getServiceList)
      .then(res =>{
        if(res.data.errorCode==0){
          this.convenientList=res.data.data
        }
      })
    },
    getLinkInfo(index,linkUrl){
      if(index==0){
        this.$router.push({
          path:'/repair',
        });
      }else{
        window.location=linkUrl
      }

    }

  }
}
</script>

<style lang="css">

</style>
