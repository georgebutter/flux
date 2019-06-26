import Vue from 'vue'
import Collections from './templates/collections.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#collections',
  template: '<Collections/>',
  components: { Collections }
})
