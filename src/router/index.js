import { createRouter, createWebHashHistory } from 'vue-router'
import Catalog from '../components/views/Catalog.vue'
import Basket from '../components/views/Basket.vue'


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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router