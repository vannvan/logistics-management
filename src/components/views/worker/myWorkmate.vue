<template lang="html">
  <div class="myWorkmate">
    <x-header>工友通讯录</x-header>
    <div class="workerList">
      <group>
        <template v-for="(item, index) in workerList">
          <!-- 不展示自己的信息 -->
          <cell :title="item.name" is-link @click.native="getWorkerInfo(item.worker_id)" v-show="item.id!=userInfo.id">
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
              <!-- {{workerInfo.tel}} -->
              <a :href="'tel:' + workerInfo.tel">{{workerInfo.tel}}</a>
            </cell>
            <cell title="工作状态">
              <span v-html="formatWorkStatus(workerInfo.workstatus)"></span>
            </cell>
          </group>

          </div>

        </div>
      </popup>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import { mapState } from 'vuex'
import { XButton,ButtonTab, ButtonTabItem, Divider,XHeader,Cell, CellBox, CellFormPreview, Group,Popup,PopupRadio } from 'vux'
export default {
  data(){
    return{
      workerList:[],
      workerInfo:[],
      leftPop:{
        show:false,
        type:'',
      },
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    XHeader,
    Cell, CellBox, CellFormPreview, Group,Popup,XButton,PopupRadio
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
    statusColor() {
      return function(status){
        if(status==0){
          return '#f00'
        }else{
          return "#18B500"
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
  },
  mounted() {
    //do something after mounting vue instance
    this.getWorkerList()
  },
  methods: {
    getWorkerList(){
      let datas = {
        type:this.userInfo.type,
        area:this.userInfo.area
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
  }
}
</script>

<style lang="scss">
.myWorkmate{
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
}
</style>
