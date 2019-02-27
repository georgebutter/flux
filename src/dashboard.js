import Vue from 'vue'
import Dashboard from './templates/dashboard.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#dashboard',
  template: '<Dashboard/>',
  components: { Dashboard }
})
