import { createRouter, createWebHashHistory } from 'vue-router'
import Catalog from '../components/Catalog.vue'


const routes = [
  {
    name: 'Catalog',
    path: '/',
    component: Catalog
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router