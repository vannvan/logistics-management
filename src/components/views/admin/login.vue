<template>
  <div>
    <div class="loginBox">
      <img src="@/assets/images/bgtop.png" alt="" class="bgtop">
      <img src="@/assets/images/bgbottom.png" alt="" class="bgbottom">
      <div class="formBox">
        <div class="inputBox">
            <input type="number" name="" v-model="admin_tel" placeholder="请输入手机号" oninput="if(value.length > 11)value = value.slice(0, 11)">
          <i class="icon-user user-icon" :style="{color:RandomColor()}"></i>
        </div>
        <div class="inputBox">
          <input type="password" name="" v-model="admin_pwd" placeholder="请输入密码">
          <i class="icon-lock user-icon" :style="{color:RandomColor()}"></i>
        </div>
        <div class="btnBox" @click="doLogin()">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
export default {
  data(){
    return{
      admin_tel:'',
      admin_pwd:''
    }
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading,
        // ajaxIsLoading: state => state.ajaxSwitch.ajaxIsLoading,
        responseData: state => state.responseInfo.response,
        userInfo: state => state.userInfo.userInfo
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
  mounted() {
    //do something after mounting vue instance
    this.$store.commit('setUserInfo',{})
    this.$store.commit('setIsLogin',false)
  },
  methods: {
    doLogin(){
      let datas = {
        tel:this.admin_tel,
        password:this.admin_pwd
      }
      if(this.admin_tel==''){
        this.$vux.toast.text('手机号不能为空', 'middle')
        return
      }
      if(this.admin_pwd==''){
        this.$vux.toast.text('密码不能为空', 'middle')
        return
      }
      this.$http.post(URL_CONFIG.UrlConfig.adminDoLogin,datas)
      .then(res =>{
        if(res.data.status==1){
          res.data.data.userType="admin"
          this.$store.commit('setUserInfo',res.data.data)
          this.$store.commit('setIsLogin',true)
          this.$router.push({
            path:'/adminCenter',
          });
        }
      })
    }
  }
}
</script>

<style lang="scss">
.loginBox{
  width: pxTorem(750px);
  img{
    width: pxTorem(750px);
    height: pxTorem(400px);
  }
  .bgtop{
    position: fixed;
    top:0;
    // background-color: #65B4DB;
    // border-radius:0 0 pxTorem(150px) 0;
    // background: linear-gradient(21deg, transparent 1.5em, green 0);
  }

  .bgbottom{
    position: fixed;
    bottom: 0;

  }
  .formBox{
    width: pxTorem(650px);
    height: pxTorem(400px);
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
  }
  .inputBox{
    position: relative;
  }
  .inputBox{
    height: pxTorem(80px);
    width: pxTorem(560px);
    padding: pxTorem(10px) 0;
    margin: 0 auto;
    // background: #f00
  }
  .inputBox:nth-child(1),.inputBox:nth-child(2){
    margin-bottom: pxTorem(30px)
  }
  .btnBox{
    height:pxTorem(80px);
    width: pxTorem(560px);
    margin:0 auto;
    background: #1296DB;
    border-radius: pxTorem(80px);
    text-align: center;
    line-height: pxTorem(80px);
    font-size: pxTorem(35px);
    color: #fff
  }
  .btnBox:hover{
    background: #33CCFF
  }
  input{
    width: pxTorem(480px);
    height: 100%;
    border:none;
    border-radius: pxTorem(80px);
    padding-left: pxTorem(80px)
    // background: #f6f6f6
  }
  .user-icon{
    position: absolute;
    top:pxTorem(30px);
    left:pxTorem(28px);
    font-size: pxTorem(40px)
  }
  // background: #fff
}

</style>
