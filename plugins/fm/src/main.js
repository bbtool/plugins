import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
const errorHandler = (error) => {
  // console.log('Error 1: ', error.message)
}
Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error)
window.onerror = errorHandler
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
