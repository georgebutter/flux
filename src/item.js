import Vue from 'vue'
import Item from './templates/item.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#item',
  template: '<Item/>',
  components: { Item }
})
