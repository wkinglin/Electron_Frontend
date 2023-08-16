import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import Dashboard from '@/views/dashboard/dashboard-index.vue'
import Alo from '@/views/alo/alo-page.vue'
import MatlabPage from '@/views/alo/matlab-page.vue'
import PythonPage from '@/views/alo/python-page.vue'
import Hypo from '@/views/alo/hypothesis-testing.vue'
import combatSystem from '@/views/alo/combat-system.vue'
import atlas from '@/views/alo/Atlas-completion.vue'

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
          name: '知识图谱构建',
          component: Alo,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'matlab',
          name: '多作战因素模型',
          component: MatlabPage,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'python',
          name: '信息域',
          component: PythonPage,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'hypo',
          name: '假设检验',
          component: Hypo,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'combatSystem',
          name: '作战体系验证与评估',
          component: combatSystem,
          meta:{
            keepAlive: true
          }
        },
        {
          path: 'atlas',
          name: '图谱补全 ',
          component: atlas,
          meta:{
            keepAlive: true
          }
        },
      ]
    },
  ]
})
