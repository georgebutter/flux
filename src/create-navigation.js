import Vue from 'vue'
import CreateNavigation from './templates/create-navigation.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#create-navigation',
  template: '<CreateNavigation/>',
  components: { CreateNavigation }
})
