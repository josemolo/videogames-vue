import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteMetrics() {
  const route = useRoute()

  onMounted(() => {
    const routeName = String(route.name ?? 'unknown')

    performance.mark(`route:end:${routeName}`)

    performance.measure(
      `route:${routeName}`,
      `route:start:${routeName}`,
      `route:end:${routeName}`
    )

    const entries = performance.getEntriesByName(`route:${routeName}`)
    const last = entries[entries.length - 1]

    if (last) {
      console.info(
        `%c⏱ Ruta ${routeName}: ${last.duration.toFixed(1)} ms`,
        'color:#7f5cff;font-weight:bold'
      )
    }
  })
}
