import type { Router } from 'vue-router'

export function setupRouteMetrics(router: Router) {
  router.beforeEach((to) => {
    performance.mark(`route:start:${to.name}`)
  })
}
