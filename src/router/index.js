import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import calc from '@/pages/calc'
import index from '@/pages'
import msgLottery from '@/pages/msgLottery'
import stWelfare from '@/pages/stWelfare'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      // component: () => import('@/pages')
      component: index
    },
    {
      path: '/calc',
      name: 'calc',
      // component: () => import('@/pages/calc')
      component: calc
    },
    {
      path: '/msgLottery',
      name: 'msgLottery',
      // component: () => import('@/pages/msgLottery')
      component: msgLottery
    },
    {
      path: '/stWelfare',
      name: 'stWelfare',
      // component: () => import('@/pages/stWelfare')
      component: stWelfare
    }
  ]
})
