import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      component: () => import('@/components/pages/index'),
      children: [
        {
          path: '/menu',
          component: () => import('@/pages/menu/menu'),
          meta: {//自定义对象
            name: '菜单管理'
          }
        },
        {
          path: '/user',
          component: () => import('@/components/views/user'),
          meta: {//自定义对象
            name: '管理员管理'
          }
        },
        {
          path: '/goods',
          component: () => import('@/pages/goods/goods'),
          meta: {//自定义对象
            name: '商品管理'
          }
        },
        {
          path: '/sort',
          component: () => import('@/components/views/sort'),
          meta: {//自定义对象
            name: '商品分类'
          }
        },
        {
          path: '/specs',
          component: () => import('@/components/views/specs'),
          meta: {//自定义对象
            name: '商品规格'
          }
        },
        {
          path: '/home',
          component: () => import('@/components/views/home')
        },
        {
          path: '/role',
          component: () => import('@/components/views/role'),
          meta: {//自定义对象
            name: '角色管理'
          }
        },
        {
          path: '/member',
          component: () => import('@/pages/member/member'),
          meta: {
            name: '会员管理'
          }
        },
        {
          path: '/banner',
          component: () => import('@/pages/banner/banner'),
          meta: {
            name: '轮播图管理'
          }
        },
        {
          path: '/seck',
          component: () => import('@/pages/seck/seck'),
          meta: {
            name: '限时秒杀管理'
          }
        },

        {
          path: '',
          redirect: '/home'
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/pages/login')
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})
