import Vue from 'vue'
import Install from './templates/install.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#install',
  template: '<Install/>',
  components: { Install }
})
