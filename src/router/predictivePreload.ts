import type { Router } from 'vue-router'
import { preloadRoute } from './index'
import { preloadMap } from './preloadMap'
import { runWhenIdle } from '@/utils/idlePreload'

const preloaded = new Set<string>()

export function setupPredictivePreload(router: Router) {
  router.afterEach((to) => {
    const routeName = to.name as string
    const nextRoutes = preloadMap[routeName]

    if (!nextRoutes) return

    nextRoutes.forEach((name, index) => {
      if (preloaded.has(name)) return

      preloaded.add(name)

      // Pequeño delay escalonado (suave para la red)
      setTimeout(() => {
        preloadRoute(name)
      }, index * 300)

       runWhenIdle(() => {
        preloadRoute(name)
      }, 1000 + index * 500)
    })
  })
}