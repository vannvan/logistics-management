export default {
  state: {
    actionStatus:false
  },
  mutations: {
    setActionStatus (state, newV) {
      state.actionStatus = newV;
    },
  }
}
