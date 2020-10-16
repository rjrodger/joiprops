import Vue from 'vue'
import Canary from './Canary.vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.component('canary', Canary)

var vue = new Vue({
  render: (h) => h(App),
}).$mount('#app')
