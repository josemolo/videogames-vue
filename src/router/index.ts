import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/consoles', name: 'Consoles', component: () => import('../views/Shop.vue') },
  { path: '/contact', name: 'Contact', component:  () => import('../views/Contact.vue') },
  /*{ path: '/nintendo', name: 'Nintendo', component: () => import('../views/Nintendo.vue') },*/
  { path: '/console/:id', name: 'ConsoleDetail', component: () => import('../views/ConsoleDetail.vue') },

// 🔐 AUTH
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/verify', component: () => import('@/views/Verify.vue') },
  { path: '/verify-required', component: () => import('@/views/VerifyRequired.vue') },

  { path: '/checkout', component: () => import('@/views/Checkout.vue'), meta: { requiresVerified: true } },

  { path: '/tienda', component: () => import('@/views/Shop.vue') },
  { path: '/tienda/consolas', component: () => import('@/views/ShopConsoles.vue') },
  { path: '/tienda/juegos', component: () => import('@/views/ShopGames.vue') },
  { path: '/tienda/articulos', component: () => import('@/views/ShopArticles.vue') }
]

const router = createRouter ({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const user = useUserStore()

  if (to.meta.requiresVerified && !user.isVerified) {
    return '/verify-required'
  }
})

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