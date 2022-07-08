import Vue from 'vue'
import Home from './page/home-page.vue'
import jQuery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

global.$ = jQuery
Vue.config.productionTip = false

new Vue({
  render: h => h(Home),
}).$mount('#app')
