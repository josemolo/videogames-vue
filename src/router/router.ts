import { createRouter as _createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./pages/index.vue')
  }
]

export function createRouter() {
  return _createRouter({
    history: createWebHistory(),
    routes
  })
}