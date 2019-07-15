import Vue from 'vue'
import Items from './templates/items.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#items',
  template: '<Items/>',
  components: { Items }
})
