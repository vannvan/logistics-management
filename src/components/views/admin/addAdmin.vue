<template lang="html">
  <div class="addAdmin">
    <x-header>添加管理员</x-header>
    <div class="formBox">
      <group>
        <x-input title="联系电话"  placeholder="请输入联系电话" v-model="tel" :show-clear=false keyboard="number" is-type="china-mobile" :max="11"></x-input>
        <x-input title="真实姓名"  placeholder="请输入姓名" :show-clear=false v-model="name"></x-input>
        <popup-radio title="管理区域" :options="areaType" v-model="area"></popup-radio>
        <popup-radio title="权限级别" :options="levelType" v-model="level"></popup-radio>
      </group>
      <div class="photoBox clearfix">
        <template v-if="headimg_path!=null">
          <span class="uploadbtn" v-bind:style="{backgroundImage:'url(' + headimg_path + ')'}">
            <input type="file" @change="chooseImage()" accept="image/*" ref="chooseImage"/>
          </span>
        </template>
        <template v-else>
          <span class="uploadbtn" >
            <input type="file" @change="chooseImage()" accept="image/*" ref="chooseImage"/>
          </span>
        </template>
      </div>
    </div>
     <div class="submitbtn" @click="doSubmit()">提交信息</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { XButton,XHeader,XInput,Group,PopupRadio,Popup,Cell  } from 'vux'
export default {
  data(){
    return{
      tel:'',
      name:'',
      headimg_path:null,
      area:'',
      level:'',
      levelType: [{
         key: 1,
         value: '普通权限'
       }, {
         key: 2,
         value: '高级权限'
      }],
      areaType: ['东区','西区','全校']
    }
  },
  components: {
    XHeader,
    XInput,
    Group,
    PopupRadio,
    Popup,
    Cell
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
  },
  mounted(){

  },
  methods:{
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
         this.$http.post('/Api/File/uploadFile',formData,config)
         .then(res =>{
            // console.log(res.data.data)
            if(res.data.status==1){
              this.headimg_path=res.data.data.absolute_path
            }
         })
      }
    },
    doSubmit(){
      let datas = {
        tel:this.tel,
        name:this.name,
        headimg_path:this.headimg_path,
        level:this.level,
        area:this.area
      }
      // console.log(datas)
      this.$http.post("Api/admin/doAddAdmin",datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.$router.push({
            path:'/adminManage',
          });
        }
      })
    }
  }
}
</script>

<style lang="scss">
.addAdmin{
  .formBox{
    width: pxTorem(700px);
    margin:pxTorem(25px) auto;
    box-shadow: #ccc 0px 3px 5px;
    height: auto;
    background: #fff
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
