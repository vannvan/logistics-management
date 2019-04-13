<template lang="html">
  <div class="workerDetails">
    <group>
      <cell title="照片" is-link>
        <div>
          <span style="">
            <div class="headImg">
              <template v-if="userInfo.headimg_path!=null">
                <span class="uploadbtn" v-bind:style="{backgroundImage:'url(' + userInfo.headimg_path + ')'}">
                  <input type="file" @change="chooseImage()" accept="image/*" ref="chooseImage"/>
                </span>
              </template>
              <template v-else>
                <span class="uploadbtn" >
                  <input type="file" @change="chooseImage()" accept="image/*" ref="chooseImage"/>
                </span>
              </template>
            </div>
          </span>
        </div>
      </cell>
      <cell title="维修类别">
        <div>
          <span style="">{{userInfo.type}}</span>
        </div>
      </cell>
      <cell title="所属区域">
        <div>
          <span style="">{{userInfo.area}}</span>
        </div>
      </cell>
    </group>
      <group>
        <cell title="工作状态" is-link @click.native="changeWorkStatus()">
          <div>
            <span v-html="formatWorkStatus(userInfo.workstatus)"></span>
            <!-- <x-switch :title="formatWorkStatus(userInfo.workstatus)" v-model="userInfo.workstatus"></x-switch> -->
          </div>
        </cell>
        <cell title="手机号" is-link @click.native="leftPop.show=!leftPop.show;leftPop.type='tel'">
          <div>
            <span style="">{{userInfo.tel}}</span>
          </div>
        </cell>
        <cell title="姓名" is-link @click.native="leftPop.show=!leftPop.show;leftPop.type='name'">
          <div>
            <span style="">{{userInfo.name}}</span>
          </div>
        </cell>
        <cell title="更改密码" is-link @click.native="leftPop.show=!leftPop.show;leftPop.type='password'">
          <div>
            <!-- <span style="">{{userInfo.name}}</span> -->
          </div>
        </cell>
      </group>
      <popup v-model="leftPop.show" position="left" width="100%">
          <div class="position-horizontal-demo">
            <!-- <x-header>修改信息</x-header> -->
            <div class="header">
              <div class="header-title">
                <div class="left-arrow"></div>
                <b class="backbtn" @click="back()">返回</b>
                <span class="saveBtn">
                  <x-button mini @click.native="updateInfo();leftPop.show=!leftPop.show">保存</x-button>
                </span>
              </div>
            </div>
            </span>
            <div class="nameOrTelBox">
              <template v-if="leftPop.type=='name'">
                <input type="text" name="" v-model="worker_name">
              </template>
              <template v-if="leftPop.type=='tel'">
                <input type="number" name="" v-model="worker_tel"  oninput="if(value.length > 11)value = value.slice(0, 11)">
              </template>
              <template v-if="leftPop.type=='password'">
                <input type="text" name="" v-model="worker_password">
              </template>
            </div>

              <!-- <x-input title="必须输入2333"></x-input> -->
          </div>
        </popup>

  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { Cell, Group, Popup,XInput, XButton, XHeader,XSwitch } from 'vux'
export default {
  data(){
    return{
      leftPop:{
        show:false,
        type:'',
      },
      worker_name:'',
      worker_tel:'',
      worker_password:'',
      saveStatus:0
    }
  },
  components: {
    Group,
    Cell,
    Popup,
    XInput,
    XButton,
    XHeader,
    XSwitch
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
    formatWorkStatus(){
      return function (status) {
        if(status==0){
          return "<span style='color:#f00'>休息</span>"
        }else if(status==1){
          return "<span style='color:#19be6b'>在岗</span>"
        }
      }
    },
    formatStatus(){
      return function(status){
        if(status==0){
          return "<span style='color:#f00'>禁用中</span>"
        }else if(status==1){
          return "<span style='color:#19be6b'>启用中</span>"
        }
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.worker_name=this.userInfo.name
    this.worker_tel=this.userInfo.tel
  },
  methods: {
    chooseImage(){
      var e=window.event||event;
      let file = e.target.files[0];
      // console.log(file)
      if(file!=undefined){
         // console.timeEnd("timer");
         var formData = new FormData()
         formData.append('image',file)
         formData.append('user_id',this.userInfo.id)
         let config = {
           headers:{
               'X-Requested-With': 'XMLHttpRequest'
           },
         }
         this.$http.post(URL_CONFIG.UrlConfig.uploadFile,formData,config)
         .then(res =>{
            console.log(res.data.data)
            if(res.data.status==1){
              // this.photoFile.push(res.data.data)
              this.userInfo.headimg_path=res.data.data.absolute_path
              this.$store.commit('setUserInfo',this.userInfo)
              this.updateInfo()
              // console.log(this.headimg_path_ab)
            }
         }).catch(error =>{
           console.log(error)
         })
      }
    },
    changeWorkStatus(){
      if(this.userInfo.workstatus==1){
        this.userInfo.workstatus = 0
      }else{
        this.userInfo.workstatus = 1
      }
      this.updateInfo()
    },
    updateInfo(){
      if(this.worker_password!=''){
        this.updatePassword()
        return
      }
      let datas = {
        id:this.userInfo.id, //必须
        headimg_path:this.userInfo.headimg_path,
        name:this.worker_name,
        tel:this.worker_tel,
        area:this.userInfo.area,
        type:this.userInfo.type,
        workstatus:this.userInfo.workstatus
        // level:this.userInfo.level
      }
      this.$http.post(URL_CONFIG.UrlConfig.workerUpdateInfo,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.userInfo.name=this.worker_name
          this.userInfo.tel=this.worker_tel
          this.$store.commit('setUserInfo',this.userInfo)
          this.saveStatus=1
        }else{
          this.leftPop.show=true
        }
      })
    },
    updatePassword(){
      console.log('changepassword')
      let datas = {
        password:this.worker_password,
        id:this.userInfo.id
      }
      this.$http.post(URL_CONFIG.UrlConfig.workerUpdatePassword,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.$vux.toast.text('请重新登录', 'middle')
          this.$router.push({path:'/workerLogin'})
        }
      })
    },

    back(){
      this.worker_password = ''
      if(this.worker_name!=this.userInfo.name){
        if(this.saveStatus==0){
          this.worker_name=this.userInfo.name
        }
      }
      if(this.worker_tel!=this.userInfo.tel){
        if(this.saveStatus==0){
          this.worker_tel=this.userInfo.tel
        }
      }
      this.leftPop.show=false
    }
  }
}
</script>

<style lang="scss">
.workerDetails{
  .headImg{
    width: pxTorem(120px);
    height: pxTorem(120px);
    margin-left: pxTorem(30px);
    float: left;
    // background: #f00
  }
  .headImg>img{
    width: pxTorem(120px);
    height: pxTorem(120px);
    border-radius: pxTorem(10px);
    margin-top: pxTorem(10px)
  }
  .uploadbtn{
    // position: relative;
    float: left;
    display: block;
    height: pxTorem(120px);
    width: pxTorem(120px);
    // margin-top: pxTorem(15px);
    // background: url('~@/assets/images/upload_btn1.png') no-repeat;
    @include bg100('~@/assets/images/defaultPhoto.png');
    background-size: 100% auto;
  }
  .uploadbtn input {
    height: pxTorem(120px);
    width: pxTorem(120px)!important;
    // position: absolute;
    // // font-size: 100px;
    // top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .closeBtnBox{
    padding: pxTorem(20px);

    width: pxTorem(710px);
  }
  .nameOrTelBox{
    margin-top: pxTorem(25px);
    height: pxTorem(70px);
    width: 100%;
    // background: #f00
  }
  .nameOrTelBox>input{
    height: 100%;
    width: pxTorem(730px);
    border:none;
    padding-left: pxTorem(20px)
  }
  .saveBtn{
    float: right;
    margin:pxTorem(10px)
  }
  .header{
    position: relative;
    padding: 3px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #1296DB;
  }
  .header-title{
    height: pxTorem(80px);
  }
  .left-arrow{
    position: absolute;
    width: 30px;
    height: 30px;
    top: pxTorem(15px);
    left: pxTorem(15px)
  }
  .left-arrow::before{
    content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid #ccc;
      border-width: 1px 0 0 1px;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
      top: 8px;
      left: 7px;
  }
  .backbtn{
    position: absolute;
    left:pxTorem(55px);
    line-height: pxTorem(80px);
    color: #fff;
    font-size: pxTorem(28px)
  }
}
</style>
