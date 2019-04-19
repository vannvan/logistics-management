<template lang="html">
  <div>
    <div class="doRepairBox">
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">我要报修</x-header>
    <div class="repairFormBox">
      <x-input title="联系电话"  placeholder="请输入联系电话" v-model="tel" :show-clear=false keyboard="number" is-type="china-mobile" :max="11"></x-input>
      <cell title="选择区域" v-model="area" is-link @click.native="choseArea()"></cell>
      <x-input title="详细地址"  placeholder="请填写详细地址" v-model="areadetail" v-if="area!=''" :show-clear="false" required></x-input>
      <cell title="故障类型" v-model="type" is-link @click.native="choseType()"></cell>
      <x-textarea :max="50" placeholder="" title="故障描述" v-model="details" required></x-textarea>
      <div class="photoBox clearfix">
        <template v-if="photoFile.length!=0">
          <span class="photoList" v-for="(item, index) in photoFile">
            <span>
              <span @click="delPhoto(index)"><icon type="cancel"></icon></span>
              <img :src="item.absolute_path" alt="">
            </span>
          </span>
        </template>
        <span class="uploadbtn" v-if="photoFile.length<3">
          <input type="file" @change="chooseImage()" accept="image/*" ref="chooseImage"/>
        </span>
      </div>
    </div>
    <div class="areaTips">
      <div>
        <actionsheet :menus="menus" v-model="showMenus" show-cancel  @on-click-menu="chooseUserArea"></actionsheet>
      </div>
    </div>
    <div class="submitbtn" @click="doSubmit()">提交信息</div>
    <div>
      <popup v-model="areaShow" position="bottom" max-height="50%">
          <template v-for="(item, index) in areaList">
            <cell :title="item.text" @click.native="checkArea(item)">
            </cell>
          </template>
      </popup>
     <popup v-model="typeShow" position="bottom" max-height="50%">
         <template v-for="(item, index) in typeList">
           <cell :title="item.text" @click.native="checkType(item)">
           </cell>
         </template>
     </popup>
   </div>
   </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import areaList from '@/assets/json/area.js'
import typeList from '@/assets/json/type.js'
import { XInput,XHeader,Cell,XTextarea,Popup,XButton,Group,PopupPicker,Actionsheet, TransferDom,Icon} from 'vux'
export default {
  data(){
    return{
      areaList:areaList.areaList,
      typeList:typeList.typeList,
      tel:'',
      area:'',
      areadetail:'',
      type:'',
      details:'',
      typeShow:false,
      areaShow:false,
      photoFile:[],
      showMenus:false,
      menus: {
        myarea: '使用我的地址',
      },
      userArea:null
    }
  },
  components:{
    XInput,XHeader,Cell,XTextarea,Popup,XButton,Group,PopupPicker,Actionsheet, TransferDom,Icon
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
        isLogin:state => state.userInfo.isLogin
    }),
  },
  mounted(){
    // console.log(this.isLogin)
    if(this.isLogin==true){
      this.getUserArea()
    }
  },
  methods:{
    choseArea(){
      if(this.area!=''){
        this.area = ''
      }
      if(this.areaList.length==0){
        this.areaList=areaList.areaList
        this.area=''
      }
      this.areaShow=true
    },
    checkArea(item){
      // console.log(this.area)
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
    choseType(){
      if(this.typeList.length==0){
        this.typeList=typeList.typeList
        this.type=''
      }
      this.typeShow=true
    },
    checkType(item){
      let tmptype=''
      if(item.children!=undefined){
        this.type=item.text+"/"
      }else{
        this.type=this.type+item.text
      }
      this.typeList=item.children
      // console.log(item)
      if(this.typeList==undefined){
        this.typeList=[]
      }
      if(item.children==undefined){
        this.typeShow=false
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
    chooseUserArea(key){
      if(key=='myarea'){
        if(this.userArea==null){
          this.$vux.toast.text('你还没有地址信息', 'middle')
          return
        }
        this.area = this.userArea.area+'/'+this.userArea.floor
        this.areadetail = this.userArea.room
      }
    },
    chooseImage(){
      if(this.isLogin==false){
        this.showModule('该模块需要登录！')
        return false
      }
      var e=window.event||event;
      let file = e.target.files[0];
      // console.log(file)
      if(file!=undefined){
         // console.timeEnd("timer");
         var formData = new FormData()
         formData.append('image',file)
         formData.append('user_id',this.userInfo.student_id)
         let config = {
           headers:{
               'X-Requested-With': 'XMLHttpRequest'
           },
         }
         this.$http.post(URL_CONFIG.UrlConfig.uploadFile,formData,config)
         .then(res =>{
            console.log(res.data.data)
            if(res.data.status==1){
              this.photoFile.push(res.data.data)
            }
         })
      }
    },
    delPhoto(index){
      this.photoFile.splice(index)
    },
    doSubmit(){
      let user_id = this.userInfo.student_id
      let user_name = this.userInfo.student_name
      // let tmpPhotoFile = JSON.parse(JSON.stringify(this.photoFile))
      // // let tmpVisitorsList=this.deepClone(this.visitorsList)
      // for(let i=0;i<tmpPhotoFile.length;i++){
      //   delete tmpPhotoFile[i].absolute_path
      //   delete tmpPhotoFile[i].user_id
      // }
      let servicePhoto = []
      for(let i=0;i<this.photoFile.length;i++){
        servicePhoto.push(this.photoFile[i].relative_path)
      }
      if(this.isLogin==false){
        this.showModule('该模块需要登录！')
        return false
      }
      let datas={
        tel:this.tel,
        area:this.area,
        area_detail:this.areadetail,
        type:this.type,
        details:this.details,
        user_id:user_id,
        user_name:user_name,
        photoFile:JSON.stringify(servicePhoto),
        area_:this.area.substring(0,2)
      }
      // console.log(datas)
      this.$http.post(URL_CONFIG.UrlConfig.studentDoRepair,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.$router.push({
            path:'/myRepair',
          });
        }
      })
    },
    showModule (msg) {
      AlertModule.show({
        title: '提示',
        content:msg,
      })
    },
  }
}
</script>

<style lang="scss">
.doRepairBox{
  .repairFormBox{
    width: pxTorem(700px);
    margin:pxTorem(25px) auto;
    box-shadow: #ccc 0px 3px 5px;
    height: auto;
    background: #fff;
    position: relative;
  }
  // .areaTips{
  //   @include wh(100px,100px);
  //   background: #f00;
  //   position: absolute;
  //   top:pxTorem(90px);
  //   right: 0
  // }
  .weui-cell:before{
    left:0 !important
  }
  .photoBox{
    // height: pxTorem(180px);
    padding: pxTorem(25px);
    width: pxTorem(650px);
    border-top: 1px solid #d9d9d9
    // background: #f00
  }
  .uploadbtn{
    // position: relative;
    float: left;
    display: block;
    height: pxTorem(150px);
    width: pxTorem(140px);
    margin-top: pxTorem(15px);
    // background: url('~@/assets/images/upload_btn1.png') no-repeat;
    @include bg100('~@/assets/images/upload_btn1.png');
    background-size: 100% auto;
  }
  .uploadbtn input {
    height: pxTorem(150px);
    width: pxTorem(140px)!important;
    // position: absolute;
    // // font-size: 100px;
    // top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .photoList{
    float: left;
    height: pxTorem(150px);
    width: auto;
    // background: #f00;
    margin-top: pxTorem(15px);
    margin-right: pxTorem(15px);
  }
  .photoList>span{
    display: block;
    width: pxTorem(150px);
    height: pxTorem(150px);
    position: relative;
  }
  .photoList>span>span>i{
    position: absolute;
    right: pxTorem(-20px);
    top:pxTorem(-15px)
  }
  .photoList>span>img{
    width: pxTorem(150px);
    height: pxTorem(150px);
  }
  .submitbtn{
    width: pxTorem(600px);
    height: pxTorem(80px);
    background: #1296DB;
    margin:pxTorem(35px) auto;
    text-align: center;
    color: #fff;
    line-height: pxTorem(80px);
    font-size: pxTorem(30px);
    border-radius: pxTorem(40px)
  }
}

</style>
