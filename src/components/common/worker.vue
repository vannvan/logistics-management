<template>
  <div class="content">
    <div class="worker">
      <router-view></router-view>
      <tabbar style="" v-show="isLogin">
      <tabbar-item link="/workerRepairCenter">
        <img slot="icon" src="~@/assets/images/icon/fuwu.png">
        <span slot="label">我的工单</span>
      </tabbar-item>
      <!-- <tabbar-item link="/communityCenter">
        <img slot="icon" src="~@/assets/images/icon/shequ.png">
        <span slot="label">公开信息</span>
      </tabbar-item> -->
      <tabbar-item link="/workerCenter">
        <img slot="icon" src="~@/assets/images/icon/gerenzhongxin.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
        isLogin:state => state.userInfo.isLogin
    }),
  },
  mounted() {
    // console.log(this.isLogin)
    //do something after mounting vue instance
    // console.log(JSON.stringify(this.userInfo)=='{}')
  }
}
</script>

<style lang="scss">
.weui-tabbar{
  // margin-top:150px;
  position: fixed !important;
}
.weui-tabbar__icon{
  width: 24px !important;
  height: 24px !important
}
.worker{
  .tabShow{
    display: none !important
  }
}

</style>
