import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteMetrics() {
  const route = useRoute()

  onMounted(() => {
    performance.mark(`route:end:${route.name}`)

    performance.measure(
      `route:${route.name}`,
      `route:start:${route.name}`,
      `route:end:${route.name}`
    )

    const entries = performance.getEntriesByName(`route:${route.name}`)
    const last = entries[entries.length - 1]

    if (last) {
      console.info(
        `%c⏱ Ruta ${route.name}: ${last.duration.toFixed(1)} ms`,
        'color:#7f5cff;font-weight:bold'
      )
    }
  })
}
