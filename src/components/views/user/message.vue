<template lang="html">
  <div class="userMessage">
    <x-header>我的消息</x-header>
    <div class="messageList">
      <div v-for="(item, index) in messageList" :key="index">
      <div class="cellBox" @touchstart="gotouchstart(index)" @touchmove="gotouchmove" @touchend="gotouchend(index)">
        <div class="leftlabel" v-show="!item.delShow">
          <i class="icon-message" :style="formatStatus(item.status)"></i>
        </div>
        <div class="rightContent" @click="viewDetails(index,item)">
          <div class="head-title">
            <span>系统消息</span>
            <span>{{item.time|date}}</span>
          </div>
          <div class="content-body">
            {{item.content}}
          </div>
        </div>
        <transition name="slide-fade">
          <div class="delBox" v-if="item.delShow==true" @click="delMessage(item.id)">
            <i class="icon-bin"></i>
          </div>
        </transition>
      </div>

    </div>
    </div>
    <popup v-model="leftPop.show" position="left" width="100%">
      <div class="position-horizontal-demo">
        <!-- <x-header>修改信息</x-header> -->
        <div class="header">
          <div class="header-title">
            <div class="left-arrow"></div>
            <b class="backbtn" @click="back()">返回</b>
          </div>
        </div>
        </span>
        <div class="messageDetailBox">
          <template v-if="leftPop.show==true">
            <div class="msg">
              <div>{{messageList[leftPop.message_index].content}}</div>
              <div>{{messageList[leftPop.message_index].time|time}}</div>
            </div>
          </template>
        </div>

      </div>
    </popup>
  </div>
</template>

<script>
import URL_CONFIG from '@/assets/js/urlConfig.js';
import Empty from '@/components/common/empty';
import { mapState } from 'vuex';
import { formatDate } from '@/assets/js/date.js';
var timeOutEvent = 0
import { ButtonTab, ButtonTabItem, Divider,Card,Badge,XHeader,LoadMore,Popup } from 'vux'
export default {
  data(){
    return{
      messageList:[],
      leftPop:{
        show:false,
        message_index:'',
      },
    }
  },
  filters:{
    date:function(timestamp){
      let date=new Date(timestamp*1000)
      return formatDate(date,'yyyy-MM-dd')
    },
    time:function(timestamp){
      let date = new Date(timestamp*1000)
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    Card,
    Badge,
    XHeader,
    LoadMore,
    Empty,
    Popup
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
    formatStatus(){
      return function(status){
        let obj = {color:"#999"}
        if(status==1){
          obj.color = '#093'
        }
        return obj
      }
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getMessageList()
  },
  methods: {
    getMessageList() {
      let datas = {
        user_id:this.userInfo.student_id,
        status:[0,1]
      }
      this.$http.post(URL_CONFIG.UrlConfig.getMessageByUserId,datas)
      .then(res =>{
        if(res.data.status==1){
          this.messageList = res.data.data
          for(let i=0;i<this.messageList.length;i++){
            this.messageList[i].delShow = false
          }
        }
      })
    },
    // /  @click="leftPop.show=true;leftPop.message_index=index;leftPop.message_id=item.id;item.delShow=false"
    viewDetails(index,item){
      this.leftPop.show = true
      this.leftPop.message_index = index
      for(let i=0;i<this.messageList.length;i++){
        this.messageList[i].delShow = false
        this.$set(this.messageList,i,this.messageList[i])
      }
      // 如果未读更新状态
      if(item.status==0){
        this.updateMessageStatus(item.id,1)
      }
    },
    delMessage(message_id){
      this.confirmModal(message_id,-1)
      // this.updateMessageStatus(message_id,-1)
    },
    confirmModal(message_id,status){
      let _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '提示',
        content: '确认删除吗？',
        onConfirm () {
          _this.updateMessageStatus(message_id,status) // 当前 vm
        }
      })
    },
    updateMessageStatus(message_id,status){
      let datas = {
        id:message_id,
        status:status  //操作类型删除还是已读 1或-1
      }
      this.$http.post(URL_CONFIG.UrlConfig.updateMessageStatus,datas)
      .then(res =>{
        if(res.data.status==1){
          if(res.data.msg!=''){
            this.$vux.toast.text(res.data.msg, 'middle')
          }
          this.getMessageList()
        }
      })
    },
    back(){
      this.leftPop.message_index = ''
      this.leftPop.show = false
    },
    gotouchstart(index){
       clearTimeout(timeOutEvent);//清除定时器
       timeOutEvent = 0;
       let _this = this
       timeOutEvent = setTimeout(function(){
            //执行长按要执行的内容，
          console.log('长按啦')
          // console.log(_this.messageList)
          _this.messageList[index].delShow = true
          _this.$set(_this.messageList,index,_this.messageList[index])
         },600);//这里设置定时
     },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend(index){
        let _this = this
        clearTimeout(timeOutEvent);
          if(timeOutEvent!=0){
            console.log('手放开啦')
            // 关闭所有删除按钮
            _this.messageList[index].delShow = false

            //这里写要执行的内容（尤如onclick事件）
         }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove(){
         clearTimeout(timeOutEvent);//清除定时器
         timeOutEvent = 0;
    },
  }
}
</script>

<style lang="scss">
.userMessage{
  .messageList{
    width: pxTorem(750px);
    height: auto;
    margin-top: pxTorem(30px);
    .cellBox{
      height: pxTorem(120px);
      width: pxTorem(750px);
      background: #fff;
      border-bottom: pxTorem(2px) solid #ccc;
      .leftlabel{
        @include wh(120px,120px);
        // background: #f00;
        float: left;
        font-size: pxTorem(60px);
        line-height: pxTorem(120px);
        text-align: center;
        // border-right: pxTorem(2px) solid #ccc;
      }
      .delBox{
        @include wh(118px,120px);
        // background: #E64340;
        float: left;
        font-size: pxTorem(50px);
        line-height: pxTorem(120px);
        text-align: center;
        border-left: pxTorem(2px) solid #ccc;
        i{
          color: #e64340
        }
      }
      .rightContent{
        @include wh(610px,110px);
        float: left;
        background: #fff;
        position: relative;
        padding: pxTorem(5px) 0 pxTorem(5px) pxTorem(20px);
        .head-title{
          @include whl(605px,55px);
          span:nth-child(1){
            font-size: pxTorem(28px);
            font-weight: bold;
            letter-spacing: 0.2em;
            // line-height:
            vertical-align: bottom;
          }
          span:nth-child(2){
            float: right;
            padding-right: pxTorem(25px);
          }
        }
        .content-body{
          @include whl(570px,55px);
          // padding: 0 pxTorem(30px);
          // background: #999;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

        }
        // .content-body::after{
        //   content: " ";
        //   display: inline-block;
        //   height: 6px;
        //   width: 6px;
        //   border-width: 2px 2px 0 0;
        //   border-color: #C8C8CD;
        //   border-style: solid;
        //   -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        //   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        //   position: relative;
        //   top: -2px;
        //   position: absolute;
        //   top: 50%;
        //   margin-top: -4px;
        //   right: 12px;
        // }
      }
    }
  }
  .messageDetailBox{
    .msg{
      width: pxTorem(600px);
      height: auto;
      margin: pxTorem(30px) auto auto pxTorem(50px);
      background: #20B2AA;
      position: relative;
      border-radius: pxTorem(10px);
      padding: pxTorem(25px) pxTorem(25px) pxTorem(10px) pxTorem(25px);
      div:nth-child(1){
        font-size: pxTorem(30px);
        line-height: pxTorem(50px);
      }
      div:nth-child(2){
        margin-top: pxTorem(15px);
      }
    }
    .msg::after{
      content: '';
      display: block;
      width: 0;
      height: 0;
      border: solid pxTorem(30px);
      border-top: pxTorem(30px);
      border-color: transparent  #20B2AA transparent transparent;
      position: absolute;
      top:pxTorem(15px);
      left:pxTorem(-55px)
    }
  }

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
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
