import Vue from 'vue'
import CreateItem from './templates/create-item.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#create-item',
  template: '<CreateItem/>',
  components: { CreateItem }
})
