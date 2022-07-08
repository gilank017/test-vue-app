import Vue from 'vue'
import Home from './page/home-page.vue'
import jQuery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Store from './store'

global.$ = jQuery
Vue.config.productionTip = false

new Vue({
  render: h => h(Home),
  Store,
}).$mount('#app')
