<template>
  <div id="app">
    <router-view/>
    <loading :text="loadText" v-model="isLoading"></loading>
    <loading :text="loadText" v-model="ajaxIsLoading"></loading>
  </div>
</template>

<script>
import { Loading,AlertModule} from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      loadText:"",
    }
  },
  components: {
    Loading,AlertModule
  },
  computed:{
    ...mapState({
        isLoading: state => state.pageSwitch.isLoading
    }),
    ...mapState({
  　　　 ajaxIsLoading: state => state.ajaxSwitch.ajaxIsLoading
    }),
    ...mapState({
  　　　 responseData: state => state.responseInfo.response
    })

  },
  watch:{
    responseData:{
      handler(newV){
        // console.log(newV.status)
        if(newV.status==-1){
          this.showModule(newV.msg)
        }
      },
      immediate:true
    }
  },
  mounted(){
    // console.log(this.responseData)
  },
  methods:{
    showModule (msg) {
      AlertModule.show({
        title: '提示',
        content:msg,
      })
    },
    showModuleAuto (msg) {
      this.showModule(msg)
      setTimeout(() => {
        AlertModule.hide()
      }, 4000)
    },
  }
}
</script>
