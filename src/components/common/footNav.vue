<template>
  <div class="content">
    <router-view></router-view>
      <tabbar style="">
      <tabbar-item link="/serviceCenter">
        <img slot="icon" src="~@/assets/images/icon/fuwu.png">
        <span slot="label">后勤中心</span>
      </tabbar-item>
      <tabbar-item link="/communityCenter">
        <img slot="icon" src="~@/assets/images/icon/shequ.png">
        <span slot="label">公开信息</span>
      </tabbar-item>
      <tabbar-item link="/userCenter">
        <img slot="icon" src="~@/assets/images/icon/gerenzhongxin.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
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

</style>
