import { onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { preloadRoute } from '@/router'
import { preloadMap } from '@/router/preloadMap'
import { runWhenIdle } from '@/utils/idlePreload'

export function useNavbarPreload() {
  const route = useRoute()
  let observer: IntersectionObserver | null = null

  const preloaded = new Set<string>()

  // Mapa único y claro
  const pathToRoute: Record<string, string> = {
    '/': 'Home',
    '/news': 'News',
    '/consoles': 'Consoles',
    '/contact': 'Contact',
  }

  function preloadByPath(path: string) {
    const routeName = pathToRoute[path]
    if (!routeName) return
    if (preloaded.has(path)) return

    switch (path) {
      case '/':
        preloadRoute('Home')
        break
      case '/news':
        preloadRoute('News')
        break
      case '/consoles':
        preloadRoute('Consoles')
        break
      case '/contact':
        preloadRoute('Contact')
        break
    }

    const map: Record<string, string> = {
      '/': 'Home',
      '/news': 'News',
      '/consoles': 'Consoles',
      '/contact': 'Contact',
    }

    const name = map[path]
    if (name) preloadRoute(name)

    preloaded.add(path)

    preloaded.add(routeName)

    runWhenIdle(() => {
      preloadRoute(routeName)
    })
  }


  function observeLinks() {
    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return 

        const el = entry.target as HTMLAnchorElement
        const href = el.getAttribute('href')

        if (href) preloadByPath(href)
        observer?.unobserve(entry.target)
      })
    }, { 
      rootMargin: '100px',
      threshold: 0.1,
    })
      

      document
      .querySelectorAll('.nav a')
      .forEach(el => observer!.observe(el))
  }


  function preloadOnOpen() {
    // Menú móvil abierto → preload inmediato
    document
      .querySelectorAll('.nav a')
      .forEach(el => {
        const href = el.getAttribute('href')
        if (href) preloadByPath(href)
      })
  }

  onMounted(() => {
    // 1️⃣ Predictivo (una sola vez)
    const predicted = preloadMap[route.name as string]
    predicted?.forEach((name, index) => {
      if (preloaded.has(name)) return
      preloaded.add(name)

      runWhenIdle(() => {
        preloadRoute(name) 
      },1000 + index * 400)

      setTimeout(() => {
        preloadRoute(name)
      },index * 300)
    })    

    // 2️⃣ IntersectionObserver automático
    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement
          const href = link.getAttribute('href')
          if (href) preloadByPath(href)
          observer?.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: '100px',
      threshold: 0.1,
    })

    document
      .querySelectorAll('.nav a')
      .forEach(el => observer!.observe(el))

    // 2️⃣ Preload por visibilidad (desktop)
    observeLinks()  
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

   return {
    preloadOnOpen,
  }
}
