<template>
  <div>
    <div class="baseInfoBox">
      <div class="headImg">
        <template v-if="userInfo.headimg_path!=null">
          <img :src="userInfo.headimg_path" alt=""  @click="toDetailInfo()">
        </template>
        <template v-else>
          <img src="@/assets/images/defaultPhoto.png" alt="" @click="toLogin()">
        </template>
      </div>
      <template v-if="userInfo.student_name!=undefined">
        <div class="name_id"   @click="toDetailInfo()">
          <p>{{userInfo.student_name}}</p>
          <p>{{userInfo.student_id}}</p>
        </div>
      </template>
      <template v-else>
        <div class="name_id">
          <p>点击头像登录</p>
          <p>登录使用完整功能</p>
        </div>
      </template>
    </div>
    <div class="item">
      <group>
        <cell is-link title="我的报修" link="/myrepair">
            <i class="icon-hammer icon" slot="icon" :style="{color:RandomColor()}"></i>
            <!-- <span slot="title" style="color:green;"><span style="vertical-align:middle;">我的保修</span> <badge text="1"></badge></span> -->
        </cell>
      </group>
      <group>
        <cell title="我的失物" is-link>
          <i class="icon-box-remove icon" slot="icon" :style="{color:RandomColor()}"></i>
        </cell>
        <cell title="我的招领" is-link>
          <i class="icon-box-add icon" slot="icon" :style="{color:RandomColor()}"></i>
        </cell>
      </group>
      <group>
        <cell title="地址管理" is-link link="/areaManage">
          <i class="icon-location2 icon" slot="icon" :style="{color:RandomColor()}"></i>
        </cell>
        <cell title="我的消息" is-link>
          <i class="icon-messages icon" slot="icon" :style="{color:RandomColor()}"></i>
        </cell>
      </group>
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
    })
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  mounted(){
    // console.log(this.userInfo.student_name=='')
  },
  methods: {
    toDetailInfo() {
      this.$router.push({
        path:'/detailInfo',
      });
    },
    toLogin(){
      this.$router.push({
        path:'/loginReg',
      });
    }
  }
}
</script>

<style lang="scss">
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
</style>
