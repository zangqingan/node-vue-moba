import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

// 引用axios模块http.js
import http from './http'

// 引入css
import './style.css'
// 赋值给vue原型属性 $http,这样就可以在任何页面使用axios了
Vue.prototype.$http = http

// 让每一个组件都能使用，全局的意思。
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}` 
      }
    }
  },
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
