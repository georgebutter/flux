import Vue from 'vue'
import FourOhFour from './templates/404.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#FourOhFour',
  template: '<FourOhFour/>',
  components: { FourOhFour }
})
