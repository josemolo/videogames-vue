import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'
import { preloadRoute } from '@/router'

export function useRoutePreload(
  routeName: string,
  options: IntersectionObserverInit = {
    rootMargin: '100px',
    threshold: 0.1,
  }
) {
  const target: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback seguro
      preloadRoute(routeName)
      return
    }

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        preloadRoute(routeName)
        observer?.disconnect()
      }
    }, options)

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return {
    target,
  }
}
