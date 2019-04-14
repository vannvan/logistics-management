<template lang="html">
  <div class="userAreaManage">
    <x-header>我的地址
      <template v-if="userArea==null">
        <template v-if="!showPopUp">
          <x-button mini slot="right" @click.native="showPopUp=true">添加+</x-button>
        </template>
        <template v-else>
          <x-button mini slot="right" @click.native="confirmModal">保存</x-button>
        </template>
      </template>
      </x-header>
      <group v-if="showPopUp">
        <cell title="选择区域" v-model="area" is-link @click.native="choseArea()"></cell>
        <x-input title="详细地址"  placeholder="请填写详细地址" v-model="areadetail" v-if="area!=''" :show-clear="false" required></x-input>
      </group>
      <popup v-model="areaShow" position="bottom" max-height="50%">
          <template v-for="(item, index) in areaList">
            <cell :title="item.text" @click.native="checkArea(item)">
            </cell>
          </template>
      </popup>

      <div v-if="showPopUp==false&&userArea==null">
        <Empty></Empty>
      </div>
      <!-- 当地址存在时 -->
      <div class="areaListBox" v-if="userArea!=null">
        <div class="area-title">
          <span>我的地址</span>
        </div>
        <div class="area-body">
          <div class="area-item">
            <span>区域</span>
            <span>{{userArea.area}}</span>
          </div>
          <div class="area-item">
            <span>楼区</span>
            <span>{{userArea.floor}}</span>
          </div>
          <div class="area-item">
            <span>详细地址</span>
            <span>{{userArea.room}}</span>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import areaList from '@/assets/json/area.js'
import { mapState } from 'vuex'
import Empty from '@/components/common/empty'
import { CellFormPreview, Group, Cell,XHeader,XButton,Popup,XInput } from 'vux'
export default {
  data(){
    return{
      areaList:areaList.areaList,
      area:'',
      areadetail:'',
      userArea:null,
      areaShow:false,
      showPopUp:false
    }
  },
  components: {
    CellFormPreview,
    Group,
    Cell,
    XHeader,
    Empty,
    XButton,
    Popup,
    XInput
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
  },
  mounted() {
    //do something after mounting vue instance
    this.getUserArea()
  },
  methods: {
    choseArea(){
      if(this.areaList.length==0){
        this.areaList=areaList.areaList
        this.area=''
      }
      this.areaShow=true
    },
    checkArea(item){
      if(item.children!=undefined){
        this.area+=item.text+'/'
      }else{
        this.area=this.area+item.text
      }
      this.areaList=item.children
      if(this.areaList==undefined){
        this.areaList=[]
      }
      if(item.children==undefined){
        this.areaShow=false
      }
    },
    getUserArea() {
      let datas = {
        student_id:this.userInfo.student_id
      }
      this.$http.post(URL_CONFIG.UrlConfig.getUserArea,datas)
      .then(res =>{
        if(res.data.status==1){
          this.userArea = res.data.data
        }
      })
    },
    confirmModal(){
      let _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '提示',
        content: '地址不可更改，确认保存吗？',
        onConfirm () {
          _this.saveArea() // 当前 vm
        }
      })
    },
    saveArea(){
      if(this.area==''||this.areadetail==''){
        this.$vux.toast.text('请填写完整信息', 'middle')
        return
      }
      let arr = this.area.split('/')
      let datas = {
        student_id:this.userInfo.student_id,
        area:arr[0],
        floor:arr[1],
        room:this.areadetail
      }
      this.$http.post(URL_CONFIG.UrlConfig.addArea,datas)
      .then(res =>{
        if(res.data.status==1){
          this.showPopUp = false
          this.$vux.toast.text(res.data.msg, 'middle')
          this.getUserArea()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.userAreaManage{
  .vux-header-right{
    margin-top: -5px !important
  }
  .areaListBox{
    width: pxTorem(750px);
    height: auto;
    margin:pxTorem(30px) auto;
    background: #fff;
    .area-title{
      @include whl(720px,80px);
      padding-left: pxTorem(30px);
      // margin:0 auto;
      font-size: pxTorem(35px);
      // background: #f00;
      border-bottom: pxTorem(1px) solid #ccc
    }
    .area-body{
      width:pxTorem(700px);
      height: auto;
      .area-item{
        @include whl(680px,80px);
        padding-left: pxTorem(30px);
        font-size: pxTorem(28px);
        // border-bottom: pxTorem(1px) solid #ccc;

        span:nth-child(1){
          display: block;
          float: left;
          font-weight: bold;
          width: 4em;  //最多4个字
          text-align: justify;  //两端对齐
          text-align-last: justify;  //两端对齐
          // background: #f00;
          margin-right: pxTorem(20px)
        }
        span:nth-child(2){
          float: right;
        }

      }
    }
  }
}
</style>
