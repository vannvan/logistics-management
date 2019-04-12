export default {
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo (state, newInfo) {
      state.userInfo = newInfo;
    }
  }
}
