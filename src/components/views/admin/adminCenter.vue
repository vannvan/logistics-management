<template>
  <div>
    <div class="adminCenter">
      <div class="baseInfoBox">
        <div class="headImg">
          <template v-if="JSON.stringify(userInfo)!='{}'&&userInfo.headimg_path!=null">
              <img :src="userInfo.headimg_path" alt=""  @click="toDetailInfo()">
          </template>
          <template v-else>
            <img src="@/assets/images/defaultPhoto.png" alt="">
          </template>
        </div>
          <div class="name_id"   @click="toDetailInfo()">
            <p>{{userInfo.name}}</p>
            <p>{{userInfo.tel}}</p>
          </div>
      </div>
      <div class="item">
        <group>
          <cell is-link title="维修中心" link="/adminRepairCenter">
              <i class="icon-hammer icon" slot="icon" :style="{color:RandomColor()}"></i>
              <!-- <span slot="title" style="color:green;"><span style="vertical-align:middle;">我的保修</span> <badge text="1"></badge></span> -->
          </cell>
          <cell is-link title="我的派工" link="/adminExamine">
              <i class="icon-eye icon" slot="icon" :style="{color:RandomColor()}"></i>
              <!-- <span slot="title" style="color:green;"><span style="vertical-align:middle;">我的保修</span> <badge text="1"></badge></span> -->
          </cell>
        </group>
        <group>
          <cell title="管理员管理" is-link link="/adminManage">
            <i class="icon-user icon" slot="icon" :style="{color:RandomColor()}"></i>
          </cell>
          <cell title="维修工管理" is-link link="/workerManage">
            <i class="icon-user-tie icon" slot="icon" :style="{color:RandomColor()}"></i>
          </cell>
        </group>
        <group>
          <!-- <cell title="地址管理" is-link>
            <i class="icon-location2 icon" slot="icon" :style="{color:RandomColor()}"></i>
          </cell> -->
          <cell title="消息管理" is-link>
            <i class="icon-messages icon" slot="icon" :style="{color:RandomColor()}"></i>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
export default {
  data(){
    return{

    }
  },
  computed:{
    RandomColor() {
      return function(){
        let r, g, b;
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        return "rgb(" +r + ',' +g+ ',' +b+ ")";
      }
    },
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
        isLogin:state => state.userInfo.isLogin
    }),
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  create(){

  },
  mounted() {
    //do something after mounting vue instance
    if(!this.isLogin){
      this.$router.push({
        path:"/adminLogin"
      })
    }
  },
  methods: {
    toDetailInfo(){
      this.$router.push({path:'/adminDetails'})
    }
  }
}
</script>

<style lang="scss">
.adminCenter{
  .baseInfoBox{
    height: pxTorem(150px);
    width: 100%;
    background: #fff
  }
  .baseInfoBox:hover{
    background: #f6f6f6
  }
  .headImg{
    width: pxTorem(150px);
    height: pxTorem(150px);
    margin-left: pxTorem(30px);
    float: left;
    // background: #f00
  }
  .headImg>img{
    width: pxTorem(130px);
    height: pxTorem(130px);
    border-radius: pxTorem(10px);
    margin-top: pxTorem(10px);
    position: relative;
  }
  .clickToLogin{
    width: pxTorem(130px);
    height: pxTorem(130px);
    position: absolute;
  }
  .name_id{
    width: pxTorem(500px);
    height: pxTorem(90px);
    // background: #ccc;
    float: left;
    padding: pxTorem(30px);
  }
  .name_id>p:nth-child(1){
    font-size: pxTorem(28px);
    font-weight: bold;
    line-height: pxTorem(40px)
  }
  .name_id>p:nth-child(2){
    margin-top: pxTorem(30px);
    font-size: pxTorem(25px);
    color:#999;
  }
  .name_id>p:nth-child(2)>i{
    float: right;
    font-size: pxTorem(35px) !important
  }
  .item{
    height: auto;
    // margin-top: pxTorem(25px);
  }

  .icon{
    margin-right: pxTorem(15px)
  }
}
</style>
