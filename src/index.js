import Vue from 'vue'
import Canary from './Canary.vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.component('canary', Canary)
Vue.component('foo', Foo)
Vue.component('bar', Bar)

var vue = new Vue({
  render: (h) => h(App),
}).$mount('#app')
