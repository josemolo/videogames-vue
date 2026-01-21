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
    //if (preloaded) return
    if (!('IntersectionObserver' in window)) {
      //preloadRoute('ConsoleDetail')
      //preloaded = true
      //return

      runWhenIdle(() => preloadRoute('ConsoleDetail'))
      preloaded = true
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !preloaded) {
          //preloadRoute('ConsoleDetail')
          //preloaded = true
          //observer?.disconnect()

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

