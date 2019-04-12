<template>
  <div class="workerPop">
    <popup v-model="leftPop.show" position="left" width="100%">
        <div class="position-horizontal-demo clearfix">
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
                {{workerInfo.tel}}
              </cell>
              <cell title="工作状态">
                <span v-html="formatWorkStatus(workerInfo.workstatus)"></span>
              </cell>
              <template>
                <cell title="启用状态">
                  <span v-html="formatStatus(workerInfo.status)"></span>
                </cell>
              </template>
            </group>
            <group>
                <cell title="所属区域" v-model="workerInfo.area"></cell>
                <cell title="维修范围" v-model="workerInfo.type"></cell>
            </group>
            <div class="actionBox">
              <x-button type="primary" plain @click.native="dispatched(workerInfo.name,workerInfo.worker_id)">派工给他</x-button>
            </div>
          </div>
        </div>
      </popup>
  </div>
</template>

<script>
import { XButton,Cell,Group,Popup } from 'vux'
import { mapState } from 'vuex'
export default {
  data(){
    return{
      leftPop:{
        show:false,
        type:'',
      },
      workerInfo:[],
    }
  },
  computed:{
    ...mapState({
      userInfo: state => state.userInfo.userInfo
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
  components: {
    Cell, Group,Popup,XButton
  },
  mounted(){
    // this.leftPop.show=true
  },
  methods: {
    getWorkerInfo(data) {
      this.leftPop.show=true
      this.workerInfo=data
      // console.log(this.workerInfo)
    },
    dispatched(worker_name,worker_id){
      let datas = {
        worker_id:worker_id,
        worker_name:worker_name,
        admin_id:this.userInfo.admin_id,
        admin_name:this.userInfo.name,
        service_id:this.$route.query.repair_id
      }
      this.$http.post("Api/service/dispatchedWorker",datas)
      .then(res =>{
        if(res.data.status==1){
          this.$vux.toast.text(res.data.msg, 'middle')
          this.leftPop.show=false
          this.$router.go(0)
          // this.$router.push({
          //   path:'/adminRepairDetails',
          //   query:{
          //     "repair_id":this.$route.query.repair_id
          //   }
          // });
          // this.$router.push({path:'/adminRepairCenter'})
        }
      })
      console.log(datas)
    }
  }
}
</script>

<style lang="scss">
.workerPop{
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
}
</style>
