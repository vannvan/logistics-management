<template lang="html">
  <div>
    <group>
      <cell title="我的地址"></cell>
      <cell-form-preview :list="userArea"></cell-form-preview>
    </group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { CellFormPreview, Group, Cell,XHeader } from 'vux'
export default {
  data(){
    return{
      userArea:[{
        label: '区域',
        value: '3.29'
      }, {
        label: '楼区',
        value: '1.04'
      }, {
        label: '详细地址',
        value: '8.00'
      }]
    }
  },
  components: {
    CellFormPreview,
    Group,
    Cell,
    XHeader
  },
  computed:{
    ...mapState({
        userInfo: state => state.userInfo.userInfo,
    }),
  },
  mounted() {
    //do something after mounting vue instance
    this.getUserArea()
  },
  methods: {
    getUserArea() {
      let datas = {
        student_id:this.userInfo.student_id
      }
      this.$http.post('Api/user/getUserArea',datas)
      .then(res =>{
        if(res.data.status==1){
          this.userArea = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
