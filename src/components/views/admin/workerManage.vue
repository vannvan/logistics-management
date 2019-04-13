<template lang="html">
  <div class="workerManage">
    <x-header>维修工管理</x-header>
    <div class="choseBox">
        <cell title="选择区域" v-model="checkedArea" is-link @click.native="choseArea()"></cell>
        <!-- <cell title="选择区域" v-model="checkedArea" is-link @click.native="choseArea()"></cell> -->
        <cell title="维修范围" v-model="checkedType" is-link @click.native="choseType();isAll=true"></cell>
    </div>
    <div class="workerList">
      <group>
        <template v-for="(item, index) in workerList">
          <cell :title="item.name" is-link @click.native="getWorkerInfo(item.worker_id)">
            <i class="icon-user" slot="icon" :style="{color:statusColor(item.status)}"></i>
            <span>{{item.tel}}</span>
          </cell>
        </template>
      </group>
    </div>
        <popup v-model="areaShow" position="bottom" max-height="50%">
            <template v-for="(item, index) in areaList">
              <cell :title="item.text" @click.native="checkArea(item)">
              </cell>
            </template>
        </popup>

      <popup v-model="typeShow" position="bottom" max-height="50%"  style="z-index:1001">
          <template v-for="(item, index) in typeList">
            <cell :title="item.text" @click.native="checkType(item)">
            </cell>
          </template>
      </popup>
      <popup v-model="leftPop.show" position="left" width="100%">
          <div class="position-horizontal-demo clearfix">
            <!-- <x-header>修改信息</x-header> -->
            <div class="header">
              <div class="header-title">
                <div class="left-arrow"></div>
                <b class="backbtn" @click="leftPop.show=!leftPop.show">返回</b>
                <span class="saveBtn" v-if="userInfo.level==2">
                  <x-button mini @click.native="updateInfo(workerInfo.worker_id);leftPop.show=!leftPop.show">保存</x-button>
                </span>
              </div>
            </div>
            <div class="infoBox clearfix">
              <group>
              <cell title="照片">
                <div>
                  <span style="">
                    <div class="headImg">
                      <template v-if="workerInfo.headimg_path!=null">
                        <span class="defaultHeadImg" v-bind:style="{backgroundImage:'url(' + workerInfo.headimg_path + ')'}">
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
                {{workerInfo.name}}
              </cell>
              <cell title="手机号">
                {{workerInfo.tel}}
              </cell>
              <cell title="工作状态">
                <span v-html="formatWorkStatus(workerInfo.workstatus)"></span>
              </cell>
              <template v-if="userInfo.level==2">
                <cell title="启用状态">
                  <span v-html="formatStatus(workerInfo.status)"></span>
                </cell>
              </template>
            </group>
            <group>
                <popup-radio title="所属区域" :options="areaType" v-model="workerInfo.area" :readonly="isReadOnly"></popup-radio>
                <cell title="维修范围" v-model="workerInfo.type" is-link @click.native="choseType();isAll=false"></cell>
            </group>
            </div>
            <template v-if="userInfo.level==2">
              <div class="actionBox">
                <template v-if="workerInfo.status==0">
                  <x-button type="primary" plain @click.native="changeWorkerStatus(workerInfo.worker_id,1)">启用</x-button>
                </template>
                <template v-else>
                  <x-button type="warn" plain @click.native="changeWorkerStatus(workerInfo.worker_id,0)">禁用</x-button>
                </template>
                <x-button type="warn" @click.native="changeWorkerStatus(workerInfo.worker_id,-1)">删除</x-button>
              </div>
            </template>
          </div>
        </popup>

        <div class="addAdmin">
          <x-button type="primary" plain @click.native="addWorker()">添加维修工</x-button>
        </div>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import typeList from '@/assets/json/type.js'
import { XButton,ButtonTab, ButtonTabItem, Divider,XHeader,Cell, CellBox, CellFormPreview, Group, Badge,Popup,PopupRadio } from 'vux'
export default {
  data(){
    return{
      workerList:[],
      areaList:[
        {key:'',text:'全校'},
        {key:'东区',text:'东区'},
        {key:'西区',text:'西区'}
      ],
      areaType: ['东区','西区','全校'],
      typeList:typeList.typeList,
      checkedArea:'全校',
      checkedType:'全部',
      typeShow:false,
      areaShow:false,
      isAll:true,
      leftPop:{
        show:false,
        type:'',
      },
      bottomPop:{
        show:false,
        type:'',
      },
      workerInfo:[],
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
  mounted(){
    //只读权限
    if(this.userInfo.level==2){
      this.isReadOnly=false
    }
    this.getWorkerList()
  },
  methods:{
    choseArea(){
      this.areaShow=true
    },
    checkArea(item){
      this.checkedArea=item.text
      // console.log(item)
      this.areaShow=false
      this.getWorkerList()
    },
    choseType(){
      // console.log(this.typeList)
      if(this.isAll==true){
        this.typeList[0]={text:'全部'}
      }
      this.typeShow=true
    },
    checkType(item){
      if(this.isAll==true){
        this.checkedType=item.text
      }else{
        this.workerInfo.type=item.text
      }
      this.typeShow=false
      this.getWorkerList()
    },
    getWorkerList(){
      let datas = {
        type:this.checkedType,
        area:this.checkedArea
      }
      if(datas.type=='全部'){
        datas.type=''
      }
      if(datas.area=='全校'){
        datas.area=''
      }
      this.$http.post(URL_CONFIG.UrlConfig.getWorkerList,datas)
      .then(res =>{
        if(res.data.status==1){
          this.workerList=res.data.data
        }
      })
    },
    getWorkerInfo(worker_id){
      let datas = {
        worker_id:worker_id
      }
      // console.log(datas)
      // return
      this.$http.post(URL_CONFIG.UrlConfig.getWorkerInfo,datas)
      .then(res =>{
        // console.log(res)
        if(res.data.status==1){
          this.leftPop.show=true
          this.workerInfo=res.data.data
        }
      })
    },
    changeWorkerStatus(worker_id,status){
      let datas = {
        worker_id:worker_id,
        status:status
      }
      this.$http.post(URL_CONFIG.UrlConfig.changeWorkerStatus,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.leftPop.show=false
          this.getWorkerList()
        }
      })
    },
    updateInfo(worker_id){
      // console.log(this.workerInfo.type)
      let datas ={
        worker_id:worker_id,
        area:this.workerInfo.area,
        type:this.workerInfo.type
        // level:this.workerInfo.level
      }
      // console.log(datas)
      this.$http.post(URL_CONFIG.UrlConfig.updateOneWorkerInfo,datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.leftPop.show=false
          this.getWorkerList()
        }
      })
    },
    addWorker(){
      this.$router.push({path:'/addWorker'})
    }
  }
}
</script>

<style lang="scss">
.workerManage{
  .typeBox{
    // position: fixed;
    // left: 0;
    // bottom: 0;
    // width: 100%;
    // background: #eee;
    // z-index:999;
    // -webkit-transition-property: -webkit-transform;
    // transition-property: -webkit-transform;
    // transition-property: transform;
    // transition-property: transform, -webkit-transform;
    // -webkit-transition-duration: 300ms;
    // transition-duration: 300ms;
    // max-height: 100%;
    // overflow-y: auto;
  }
  .choseBox{
    height: pxTorem(160px);
    width: pxTorem(750px);
    background: #fff
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
