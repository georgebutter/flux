import Vue from 'vue'
import Nav from './templates/nav.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#nav',
  template: '<Nav/>',
  components: { Nav }
})
