import type { Router } from 'vue-router'

export function setupRouteMetrics(router: Router) {
  router.beforeEach((to) => {
    const routeName = String(to.name ?? 'unknown')

    performance.clearMarks(`route:start:${routeName}`)
    performance.mark(`route:start:${routeName}`)
  })
}
