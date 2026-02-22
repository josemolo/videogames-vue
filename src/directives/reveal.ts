import type { Directive } from 'vue'

const reveal: Directive = {
  mounted(el) {
    el.classList.add('reveal-hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return  // previene warning de TS
        if (entry.isIntersecting) {
          el.classList.remove('reveal-hidden')
          el.classList.add('reveal-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)

    // 🔐 guardamos referencia
    ;(el as any).__revealObserver = observer
  },

  unmounted(el) {
    const observer = (el as any).__revealObserver
    if (observer) observer.disconnect()
  }
}

export default reveal
