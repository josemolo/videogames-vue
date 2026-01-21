import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'
import { preloadRoute } from '@/router'
import { preloadMap } from '@/router/preloadMap'

interface Options extends IntersectionObserverInit {
  predictiveDelay?: number // ms de escalonamiento
}

/**
 * Composable que:
 * 1️⃣ Precarga predictivamente según la ruta actual
 * 2️⃣ Precarga al aparecer en pantalla (IntersectionObserver)
 */
export function useSmartPreload(
  routeName: string,
  options: Options = {}
) {
  const { rootMargin = '100px', threshold = 0.1, predictiveDelay = 300 } = options

  const target: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null
  const preloaded = new Set<string>()

  // ---------------------------------------
  // 1️⃣ IntersectionObserver: precarga al entrar en viewport
  // ---------------------------------------
  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      preloadRoute(routeName)
      preloaded.add(routeName)
      return
    }

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !preloaded.has(routeName)) {
        preloadRoute(routeName)
        preloaded.add(routeName)
        observer?.disconnect()
      }
    }, { rootMargin, threshold })

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  // ---------------------------------------
  // 2️⃣ Predictivo: precarga rutas asociadas a la actual
  // ---------------------------------------
  function preloadPredictive(currentRouteName: string) {
    const nextRoutes = preloadMap[currentRouteName]
    if (!nextRoutes) return

    nextRoutes.forEach((name, index) => {
      if (preloaded.has(name)) return
      preloaded.add(name)

      setTimeout(() => {
        preloadRoute(name)
      }, index * predictiveDelay)
    })
  }

  return {
    target,
    preloadPredictive,
  }
}
