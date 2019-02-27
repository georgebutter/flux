import Vue from 'vue'
import Login from './templates/login.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#login',
  template: '<Login/>',
  components: { Login }
})
