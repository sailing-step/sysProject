import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


const router = new Router({
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
// 
router.beforeEach((to, from, next) => {
  // 如果跳转的是登录页，就继续
  if (to.path == '/login') {
    next()
    return
  }
  // 如果缓存没数据，就重新登录
  if (!sessionStorage.getItem('userInfo')) {
    next('/login')
  }
  // 如果你缓存有值，你就可以继续执行
  next()
})

export default router
