import { createRouter, createWebHistory, type Router } from 'vue-router'

import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Consoles from '../views/Consoles.vue'
import Contact from '../views/Contact.vue'
import Nintendo from '../views/Nintendo.vue'
import ConsoleDetail from '@/views/ConsoleDetail.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
    // si quieres que apunte a Home como en el ejemplo:
    // component: Home
  },
  { path: '/consoles', name: 'Consoles', component: Consoles },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  { path: '/nintendo', name: 'Nintendo', component: Nintendo },
  {
    path: '/console/:id',
    name: 'ConsoleDetail',
    component: () => import('../views/ConsoleDetail.vue')
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router





/*
import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Library from '../views/Library.vue'
import News from '../views/News.vue'
import Consoles from '../views/Consoles.vue'

const routes = [
  { path: '/', component: Register },
  { path: '/library', component: Library },
  { path: '/news', component: News },
  { path: '/consoles', component: Consoles },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
*/