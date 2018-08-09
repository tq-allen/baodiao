import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import calc from '@/pages/calc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calc',
      component: calc
    }
  ]
})
