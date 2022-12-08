import { createRouter, createWebHashHistory } from 'vue-router'

import Catalog from '../components/views/Catalog.vue'
import Basket from '../components/views/basket/Basket.vue'
import OrdersList from '../components/views/ordersList/OrdersList.vue'
import authGuard from './guards/authGuard.js'


const routes = [
  {
    name: 'Catalog',
    path: '/',
    component: Catalog,
  },
  {
    name: 'Basket',
    path: '/basket',
    component: Basket,
  },
  {
    name: 'OrdersList',
    path: '/orders',
    component: OrdersList,
    beforeEnter: [authGuard],
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router