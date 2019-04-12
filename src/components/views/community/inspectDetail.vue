<template>
  <div>
    <x-header>服务监督</x-header>
    <template v-if="isLoaded!=false">
      <div class="detailBox clearfix">
        <p class="detail_title">
          <badge :text="inspectDetail.text_category" :style="{background:RandomColor()}"></badge>
          <span>{{inspectDetail.title}}</span>
        </p>

        <p class="detail_info">
          <span class="icon-message">{{inspectDetail.comment}}</span>
          <span class="icon-eye">{{inspectDetail.views}}</span>
          <span class="icon-like">{{inspectDetail.likecount}}</span>
        </p>
        <div class="detail_content">
          {{inspectDetail.content}}
        </div>
        <p class="detail_footer">
          <span class="icon-user">{{inspectDetail.studentName}}</span>
          <span>{{inspectDetail.date}}</span>
        </p>
      </div>
      <divider>官方回复</divider>
      <div class="replyBox">
        <div v-for="(item, index) in inspectDetail.replyList" :key="index">
          <span v-html="item"></span>
        </div>
      </div>
    </template>
    <template v-else>
      <load-more tip="正在加载"></load-more>
    </template>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ButtonTab, ButtonTabItem, Divider,Card,Badge,XHeader,LoadMore } from 'vux'
export default {
  data() {
    return {
      inspectDetail:[],
      inspectId:'',
      isLoaded:false
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    Card,
    Badge,
    XHeader,
    LoadMore
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading
    }),
    ...mapState({
  　　　 ajaxIsLoading: state => state.ajaxSwitch.ajaxIsLoading
    }),
    ...mapState({
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
      let inspectId=this.$route.query.inspectId
      if(inspectId!=''||inspectId!=undefined){
        let datas={
          "inspectId":this.$route.query.inspectId
        }
        this.$http.post('/Api/Xfuapi/getIntendredirect',datas)
        .then(res =>{
          // console.log(res.data.data.title)
          this.inspectDetail=res.data.data
          this.isLoaded=true
        })
      }

    }
  }
}
</script>

<style lang="scss">
.vux-divider{
  padding: 10px 3% !important;
}
.detailBox,.reply-warp{
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
  font-size: 18px;
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
.replyBox{

}
.detail_footer>span:nth-child(2){
  float: right;
}

.reply-body{
  line-height: 24px;
}
.reply-about>span{
  float: right;
}
</style>
