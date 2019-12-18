import Vue from 'vue'
import App from './App.vue'

// 引入css
import './assets/scss/style.scss'

// icon-font
import './assets/iconfont/iconfont.css'
import router from './router'

// card组件
import Card from './components/Card.vue'
Vue.component('m-card',Card)

// ListCard组件
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)

//axios
import axios from 'axios' 
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api',
  // baseURL:'http://localhost:3000/web/api'
})


// 轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
