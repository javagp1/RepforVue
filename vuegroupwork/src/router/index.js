import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import maingoodsinfodetails from '@/components/main_goodsinfo_details'
import register from '@/components/register.vue'
import login from '@/components/login.vue'
import cart from '@/components/cart.vue'
import orderinfo from '@/components/orderinfo.vue'
import orderinfo_records from '@/components/orderinfo_records.vue'
import usercollection from '@/components/usercollection.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/maingoodsinfodetails',
      name: 'maingoodsinfodetails',
      component: maingoodsinfodetails
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/orderinfo',
      name: 'orderinfo',
      component: orderinfo
    },
    {
      path: '/orderinfo_records',
      name: 'orderinfo_records',
      component: orderinfo_records
    },
    {
      path: '/usercollection',
      name: 'usercollection',
      component: usercollection
    },







  ]
})
