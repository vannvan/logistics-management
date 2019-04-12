import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({})

store.registerModule('pageSwitch', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

router.beforeEach(function (to, from, next) {
  if(to.meta.title){
    document.title = to.meta.title
  }
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

store.registerModule('ajaxSwitch', {
  state: {
    ajaxIsLoading: false
  },
  mutations: {
    ajaxStar (state) {
      state.ajaxIsLoading = true
    },
    ajaxEnd (state) {
      state.ajaxIsLoading = false
    }
  },
  getter : {
    ajaxIsLoading: state => state.ajaxIsLoading
  }
})

Axios.interceptors.request.use(config => {
  store.commit('ajaxStar')
  return config;
})

Axios.interceptors.response.use(config => {
  store.commit('ajaxEnd')
  return config
})

export default store;
