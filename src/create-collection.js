import Vue from 'vue'
import CreateCollection from './templates/create-collection.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#create-collection',
  template: '<CreateCollection/>',
  components: { CreateCollection }
})
