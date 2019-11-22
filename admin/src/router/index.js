import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 引入主页面Main
import Main from '../views/Main.vue'

// login组件
import Login from '../views/Login.vue'

// 引入新建分类组件
import CategoryEdit from '../views/CategoryEdit.vue'
// 分类列表组件
import CategoryList from '../views/CategoryList.vue'

// 物品组件
// 引入物品组件
import ItemEdit from '../views/ItemEdit.vue'
// 物品列表组件
import ItemList from '../views/ItemList.vue'

// 英雄组件
import HeroEdit from '../views/HeroEdit.vue'
// 英雄列表组件
import HeroList from '../views/HeroList.vue'

// 文章组件
import ArticleEdit from '../views/ArticleEdit.vue'
// 文章列表组件
import ArticleList from '../views/ArticleList.vue'

// 广告组件
import AdEdit from '../views/AdEdit.vue'
// 广告列表组件
import AdList from '../views/AdList.vue'


// 用户组件
import AdminUserEdit from '../views/AdminUserEdit.vue'
// 用户列表组件
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  // 登陆路由
  {path:'/login',name:'login',component:Login,meta:{isPublic:true}},
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      // 添加分类子路由
      { path:'/categories/create',component:CategoryEdit},
      { path:'/categories/list',component:CategoryList},
      { path:'/categories/edit/:id',component:CategoryEdit,props:true},
      // 物品子路由
      { path:'/items/create',component:ItemEdit},
      { path:'/items/list',component:ItemList},
      { path:'/items/edit/:id',component:ItemEdit,props:true},
      // 英雄路由
      { path:'/heroes/create',component:HeroEdit},
      { path:'/heroes/list',component:HeroList},
      { path:'/heroes/edit/:id',component:HeroEdit,props:true},
      // 文章路由
      { path:'/articles/create',component:ArticleEdit},
      { path:'/articles/list',component:ArticleList},
      { path:'/articles/edit/:id',component:ArticleEdit,props:true},
      // 广告路由
      { path:'/ads/create',component:AdEdit},
      { path:'/ads/list',component:AdList},
      { path:'/ads/edit/:id',component:AdEdit,props:true},
      // 用户路由
      { path:'/admin_users/create',component:AdminUserEdit},
      { path:'/admin_users/list',component:AdminUserList},
      { path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},

    ]
    
  },
  
  



  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  // 不是公开访问的页面且本地没有token，先登录
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
