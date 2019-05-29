import Vue from 'vue'
import Users from './templates/users.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#users',
  template: '<Users/>',
  components: { Users }
})
