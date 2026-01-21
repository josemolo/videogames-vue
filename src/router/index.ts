import { createRouter as _createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Consoles from '../views/Consoles.vue'
import Contact from '../views/Contact.vue'
import Nintendo from '../views/Nintendo.vue'
import ConsoleDetail from '@/views/ConsoleDetail.vue'



const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/consoles', name: 'Consoles', component: () => import('../views/Consoles.vue') },
  { path: '/contact', name: 'Contact', component:  () => import('../views/Contact.vue') },
  { path: '/nintendo', name: 'Nintendo', component: () => import('../views/Nintendo.vue') },
  { path: '/console/:id', name: 'ConsoleDetail', component: () => import('../views/ConsoleDetail.vue'),   
  },
]

export function createRouter() {
  return _createRouter({
    history: createWebHistory (),
    routes,
  })
}

const router: Router = createRouter()
export default router



function canPreload(): boolean {
  const connection = (navigator as any)?.connection

  if (!connection) return true
  if (connection.saveData) return false
  if (['slow-2g', '2g'].includes(connection.effectiveType)) return false

  return true
}

export function preloadRoute(name: string) {
  if (!canPreload()) return

  const route = routes.find(r => r.name === name)
  if (!route) return

  const component = route.component

  // Solo ejecutamos si es lazy
  if (typeof component === 'function') {
    component()
  }
}




//  Helper para preload inteligente
//export function preloadRoute(name: string) {
//  const route = routes.find(r => r.name === name)
//
//  if (!route) return
//
//  const component = route.component
//
  // Si el componente es lazy (import dinámico), lo ejecutamos
//  if (typeof component === 'function') {
//    component()
//  }
//}







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