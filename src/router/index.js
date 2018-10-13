import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import calc from '@/pages/calc'
import index from '@/pages/index'
import msgLottery from '@/pages/msgLottery'
import stWelfare from '@/pages/stWelfare'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/baodiao-dist',
      name: 'index',
      // component: () => import('@/pages')
      component: index
    },
    {
      path: '/baodiao-dist/calc',
      name: 'calc',
      // component: () => import('@/pages/calc')
      component: calc
    },
    {
      path: '/baodiao-dist/msgLottery',
      name: 'msgLottery',
      // component: () => import('@/pages/msgLottery')
      component: msgLottery
    },
    {
      path: '/baodiao-dist/stWelfare',
      name: 'stWelfare',
      // component: () => import('@/pages/stWelfare')
      component: stWelfare
    }
  ]
})
