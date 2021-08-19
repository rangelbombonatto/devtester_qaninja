import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

window.axios = require('axios')

window.axios.defaults.baseURL= 'http://localhost:3000'

window.axios.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('user_token')
  if(userToken)
    config.headers.Authorization = userToken

  return config

}, (error) => Promise.reject(error))

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
