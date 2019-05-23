import Vue from 'vue'
import Theme from './templates/theme.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#theme',
  template: '<Theme/>',
  components: { Theme }
})
