import Vue from 'vue'
import StyleGuide from './templates/style-guide.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#style-guide',
  template: '<StyleGuide/>',
  components: { StyleGuide }
})
