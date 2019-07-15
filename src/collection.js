import Vue from 'vue'
import Collection from './templates/collection.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#collection',
  template: '<Collection/>',
  components: { Collection }
})
