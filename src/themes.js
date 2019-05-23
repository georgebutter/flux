import Vue from 'vue'
import Themes from './templates/themes.vue'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#themes',
  template: '<Themes/>',
  components: { Themes }
})
