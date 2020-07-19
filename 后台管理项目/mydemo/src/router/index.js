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
          component: () => import('@/components/views/menu'),
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
          component: () => import('@/components/views/goods'),
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
          path: '/size',
          component: () => import('@/components/views/size'),
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
          path: '/demo',
          component: () => import('@/components/views/demo')
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
