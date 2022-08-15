import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.1861chengshijian.com:8443'
Vue.prototype.$http = axios

new Vue({
  render: h => h(App)
}).$mount('#app')
