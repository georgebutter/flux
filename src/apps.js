import Vue from 'vue'
import Apps from './templates/apps.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#apps',
  template: '<Apps/>',
  components: { Apps }
})
