// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import axios from 'axios'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// 引入API文件
//import api from './api/index.js'
// 将API方法绑定到全局
//Vue.prototype.$api = api

//axios.interceptors.request.use((req) => {
  // console.log('加入userToken')
  // console.log(state.user.userToken)
//if (state.user.userToken) {
//  console.log('req.data', req.data)
//  if (!req.data) {
//    req.data = []
//  }
//  req.data['userToken'] = state.user.userToken
//}
//req.data = qs.stringify(req.data)
//return req
//}, (err) => {
//console.log(err)
//return Promise.reject(err)
//})

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
