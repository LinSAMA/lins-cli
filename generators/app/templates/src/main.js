import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import watermark from './directives/watermark'

Vue.directive(watermark.name,watermark.directives);

Vue.config.productionTip = false
console.log('当前环境:', process.env.VUE_APP_ENV)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
