import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import { setupPredictivePreload } from '@/router/predictivePreload'
import { setupRouteMetrics } from '@/router/metrics'
import reveal from './directives/reveal'

import { useUserStore } from '@/stores/user'  
import { useCartStore } from '@/stores/cart'

import { useAuth } from './composables/useAuth'

/* =====================
   SETUP ROUTER HELPERS
===================== */
setupRouteMetrics(router)
setupPredictivePreload(router)

/* =====================
   CREATE APP & PINIA
===================== */
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()



/* =====================
   USE PLUGINS (ORDEN IMPORTANTE)
===================== */
app
  .use(pinia)        // 👈 1️⃣ PRIMERO PINIA
  .use(router)       // 👈 2️⃣ ROUTER
  .use(head)         // 👈 3️⃣ HEAD
  .directive('reveal', reveal)
  .mount('#app')

/* =====================
   CART LOCALSTORAGE
   (AHORA SÍ ES SEGURO)
===================== */
const cart = useCartStore()

const userStore = useUserStore()
await userStore.checkUser()
const cartStore = useCartStore()

const { getUser } = useAuth()
getUser()

userStore.checkUser

// 🔐 Controlar carrito según sesión
if (userStore.isLoggedIn) {
  cartStore.loadFromStorage()
} else {
  cartStore.clearCart()
}

cartStore.$subscribe((_mutation, state) => {
  if (userStore.isLoggedIn) {
    localStorage.setItem('vortex_cart', JSON.stringify(state.items))
  }
})

cart.loadFromStorage()

cart.$subscribe((_mutation, state) => {
  localStorage.setItem('vortex_cart', JSON.stringify(state.items))
})


