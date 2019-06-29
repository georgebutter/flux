import Vue from 'vue'
import Navigation from './templates/navigation.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#navigation',
  template: '<Navigation/>',
  components: { Navigation }
})
