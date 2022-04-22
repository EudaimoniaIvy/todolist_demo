import Vue from 'vue'
import App from './App.vue'

//关闭生产提示
Vue.config.productionTip = false


new Vue({
  el:'#app',
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),

})
