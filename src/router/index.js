import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import Dashboard from '@/views/dashboard/dashboard-index.vue'
import Alo from '@/views/alo/alo-page.vue'
import Matlab from '@/views/alo/matlab-page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: '首页',
          component: Dashboard,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'alo',
          name: '算法页',
          component: Alo,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'matlab',
          name: '算法页',
          component: Matlab,
          meta:{
            keepAlive: true
          }
        },
      ]
    },
  ]
})
