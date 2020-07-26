import Vue from 'vue'
import Router from 'vue-router'

// 引入一级路由
import Index from '@/components/pages/index'
// import ProList from '@/components/pages/proList'
// import ProDetail from '@/components/pages/proDetail'
// import Search from '@/components/pages/search'
// import Order from '@/components/pages/order'

// 引入二级路由
// import Home from '@/components/views/home'
// import Car from '@/components/views/shopCar'
// import Mine from '@/components/views/mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/home',
          component: () => import('@/components/views/home')
        },
        {
          path: '/car',
          component: () => import('@/components/views/shopCar'),
          name: '购物车'
        },
        {
          path: '/mine',
          component: () => import('@/components/views/mine'),
          name: '我的订单'
        },
        {
          path: '',
          redirect: '/home'
        },
      ]
    },
    {
      path: '/proList',
      component: () => import('@/components/pages/proList'),
      name: '商品分类'
    },
    {
      path: '/proDetail',
      component: () => import('@/components/pages/proDetail'),
      name: '商品详情'
    },
    {
      path: '/search',
      component: () => import('@/components/pages/search')
    },
    {
      path: '/order',
      component: () => import('@/components/pages/order'),
      name: '确认订单'
    },
    {
      path: '/login',
      component: () => import('@/components/pages/login'),
      name: '登录'
    },
    {
      path: '/register',
      component: () => import('@/components/pages/register'),
      name: '注册'
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
