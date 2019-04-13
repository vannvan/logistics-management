import Vue from 'vue';
import Axios from 'axios'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedState'
import router from '@/router'
Vue.use(Vuex);
import userInfo_store from './userInfo'
import common_stroe from './common'
import action_store from './actionStatus'
// import classroom_store from './classroom'
const store = new Vuex.Store({
    modules: {
      // classroom:classroom_store
      userInfo:userInfo_store,
      responseInfo:common_stroe,
      actionStatus:action_store
    },
    plugins:[createPersistedState({
      storage: window.sessionStorage
    })
    ]
   })

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
    Axios.interceptors.response.use(config => {
      // console.log(config.data);
      if(config.data.error_code!=1){
        store.commit('setResponse',config.data)
      }
      // if(config.headers.refresh_token){
      //   store.commit('setToken',config.headers.refresh_token);
      //   store.commit('ajaxPromptShow');
      // }
      return config
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
