import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/lib/supabase'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/consoles', name: 'Consoles', component: () => import('../views/Shop.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/console/:slug', name: 'ConsoleDetail', component: () => import('../views/ConsoleDetail.vue') },

  // AUTH
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/verify', component: () => import('@/views/Verify.vue') },
  { path: '/verify-required', component: () => import('@/views/VerifyRequired.vue') },

  { path: '/checkout', component: () => import('@/views/Checkout.vue'), meta: { requiresVerified: true } },

  { path: '/tienda', component: () => import('@/views/Shop.vue') },
  { path: '/tienda/consolas', component: () => import('@/views/ShopConsoles.vue') },
  { path: '/tienda/juegos', component: () => import('@/views/ShopGames.vue') },
  { path: '/tienda/articulos', component: () => import('@/views/ShopArticles.vue') },

  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAuth: true, adminOnly: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {

  const { data: { session } } = await supabase.auth.getSession()

  const userStore = useUserStore()
  const user = session?.user

  // 🔐 Rutas que requieren login
  if (to.meta.requiresAuth) {

    if (!user) {
      return next('/login')
    }

    // 🔐 Solo admin
    if (to.meta.adminOnly) {

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || profile?.role !== 'admin') {
        return next('/')
      }

    }

  }

  // 📧 Verificación de correo
  if (to.meta.requiresVerified) {

    const isVerified =
      userStore.isVerified ??
      !!user?.email_confirmed_at

    if (!isVerified) {
      return next('/verify-required')
    }

  }

  next()

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

  if (typeof component === 'function') {
    component()
  }

}