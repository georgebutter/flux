import Vue from 'vue'
import Admin from './layout/admin.vue'
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  template: '<Admin/>',
  components: { Admin }
})
