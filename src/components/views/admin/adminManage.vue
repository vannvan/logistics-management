<template lang="html">
  <div class="adminManage">
    <x-header>管理员管理</x-header>
    <div class="adminList">
      <group>
        <template v-for="(item, index) in admin_filter">
          <cell :title="item.name" is-link @click.native="getAdminInfo(item.id)">
            <i class="icon-user" slot="icon" :style="{color:statusColor(item.status)}"></i>
            <span>{{item.tel}}</span>
          </cell>
        </template>
      </group>
    </div>

    <popup v-model="leftPop.show" position="left" width="100%">
        <div class="position-horizontal-demo clearfix">
          <!-- <x-header>修改信息</x-header> -->
          <div class="header">
            <div class="header-title">
              <div class="left-arrow"></div>
              <b class="backbtn" @click="leftPop.show=!leftPop.show">返回</b>
              <span class="saveBtn" v-if="userInfo.level==2">
                <x-button mini @click.native="updateInfo(adminInfo.id);leftPop.show=!leftPop.show">保存</x-button>
              </span>
            </div>
          </div>
          <div class="infoBox clearfix">
            <group>
              <cell title="照片">
                <div>
                  <span style="">
                    <div class="headImg">
                      <template v-if="adminInfo.headimg_path!=null">
                        <span class="defaultHeadImg" v-bind:style="{backgroundImage:'url(' + adminInfo.headimg_path + ')'}">
                        </span>
                      </template>
                      <template v-else>
                        <span class="defaultHeadImg" >
                        </span>
                      </template>
                    </div>
                  </span>
                </div>
              </cell>
              <cell title="姓名">
                {{adminInfo.name}}
              </cell>
              <cell title="手机号">
                {{adminInfo.tel}}
              </cell>
              </cell>
              <template v-if="userInfo.level==2">
                <cell title="状态">
                  <span v-html="formatStatus(adminInfo.status)"></span>
                </cell>
              </template>
            </group>
            <group>
                <popup-radio title="管理区域" :options="areaType" v-model="adminInfo.area" :readonly="isReadOnly"></popup-radio>
                <popup-radio title="权限级别" :options="levelType" v-model="adminInfo.level" :readonly="isReadOnly"></popup-radio>
            </group>
          </div>
          <template v-if="userInfo.level==2">
            <div class="actionBox">
              <template v-if="adminInfo.status==0">
                <x-button type="primary" plain @click.native="changeAdminStatus(adminInfo.id,1)">启用</x-button>
              </template>
              <template v-else>
                <x-button type="warn" plain @click.native="changeAdminStatus(adminInfo.id,0)">禁用</x-button>
              </template>
              <x-button type="warn" @click.native="changeAdminStatus(adminInfo.id,-1)">删除</x-button>
            </div>
          </template>
        </div>
      </popup>
      <template v-if="userInfo.level==2">
        <div class="addAdmin">
          <x-button type="primary" plain @click.native="addAdmin()">添加管理员</x-button>
        </div>
      </template>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { XButton,ButtonTab, ButtonTabItem, Divider,XHeader,Cell, CellBox, CellFormPreview, Group, Badge,Popup,PopupRadio } from 'vux'
export default {
  data(){
    return{
      adminList:[],
      leftPop:{
        show:false,
        type:'',
      },
      bottomPop:{
        show:false,
        type:'',
      },
      adminInfo:[],
      levelType: [{
         key: 1,
         value: '普通权限'
       }, {
         key: 2,
         value: '高级权限'
      }],
      areaType: ['东区','西区','全校'],
      isReadOnly:true
    }
  },

  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    XHeader,
    Cell, CellBox, CellFormPreview, Group, Badge,Popup,XButton,PopupRadio
  },
  computed:{
    statusColor() {
      return function(status){
        if(status==0){
          return '#f00'
        }else{
          return "#18B500"
        }
        // let r, g, b;
        // r = Math.floor(Math.random() * 256);
        // g = Math.floor(Math.random() * 256);
        // b = Math.floor(Math.random() * 256);
        // return "rgb(" +r + ',' +g+ ',' +b+ ")";
      }
    },
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
    admin_filter:function(){
      let _this=this
      return _this.adminList.filter(function(item){
        return item.id!=_this.userInfo.id
      })
    },
    formatLevel(){
      return function(level){
        if(level==1){
          return '普通权限'
        }else if(level==2){
          return '高级权限'
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
  mounted(){
    //只读权限
    if(this.userInfo.level==2){
      this.isReadOnly=false
    }
    this.getAdminList()
  },
  methods:{
    getAdminList(){
      this.$http.post(URL_CONFIG.UrlConfig.getAdminList)
      .then(res =>{
        if(res.data.status==1){
          this.adminList=res.data.data
        }
      })
    },
    getAdminInfo(admin_id){
      let datas = {
        id:admin_id
      }
      // console.log(datas)
      // return
      this.$http.post(URL_CONFIG.UrlConfig.getAdminInfo,datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          this.leftPop.show=true
          this.adminInfo=res.data.data
        }
      })
    },
    changeAdminStatus(admin_id,status){
      let datas = {
        id:admin_id,
        status:status
      }
      this.$http.post(URL_CONFIG.UrlConfig.changeAdminStatus,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.leftPop.show=false
          this.getAdminList()
        }
      })
    },
    updateInfo(admin_id){
      let datas ={
        id:admin_id,
        area:this.adminInfo.area,
        level:this.adminInfo.level
      }
      // console.log(datas)
      this.$http.post(URL_CONFIG.UrlConfig.updateOneAdminInfo,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.leftPop.show=false
          this.getAdminList()
        }
      })
    },
    addAdmin(){
      this.$router.push({path:'/addAdmin'})
    }
  }
}
</script>

<style lang="scss">
.adminManage{
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
  .infoBox{
    // float: left;
    width: 100%
  }
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
  .defaultHeadImg{
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
  .actionBox{
    // float: left;
    width: pxTorem(700px);
    height: pxTorem(50px);
    margin: pxTorem(25px) auto;
  }
  .addAdmin{
    height: pxTorem(80px);
    width: pxTorem(700px);
    left:pxTorem(25px);
    // background: #f00;
    position: fixed;
    bottom: pxTorem(120px)
  }
  .popRadio{
    position: fixed;
    bottom: 0;
    z-index: 10000
  }
}
</style>
