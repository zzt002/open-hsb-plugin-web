// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './plugin/ajax'
import store from './store/index'
import "babel-polyfill"

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

