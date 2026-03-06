import { onMounted, onBeforeUnmount } from 'vue'
import { preloadRoute } from '@/router'
import { runWhenIdle } from '@/utils/idlePreload'

export function useConsoleDetailPreload() {
  let observer: IntersectionObserver | null = null
  let preloaded = false

  function observe(el: Element) {
    if (!observer || preloaded) return 
      observer.observe(el)
    }

  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      
      runWhenIdle(() => preloadRoute('ConsoleDetail'))
      preloaded = true
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !preloaded) {

          runWhenIdle(() => preloadRoute('ConsoleDetail'))
          preloaded = true
          observer?.disconnect()
        }   
      })
    }, {
      rootMargin: '150px',
      threshold: 0.2,
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { observe }
}

