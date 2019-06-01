import Vue from 'vue'
import CreateApp from './templates/create-app.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#create-app',
  template: '<CreateApp/>',
  components: { CreateApp }
})
