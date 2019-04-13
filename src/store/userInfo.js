export default {
  state: {
    userInfo: {},
    isLogin:false
  },
  mutations: {
    setUserInfo (state, newInfo) {
      state.userInfo = newInfo;
    },
    setIsLogin (state, newV) {
      state.isLogin = newV
    }
  }
}
