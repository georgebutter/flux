import Vue from 'vue'
import Settings from './templates/settings.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#settings',
  template: '<Settings/>',
  components: { Settings }
})
