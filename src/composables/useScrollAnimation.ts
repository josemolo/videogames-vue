import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(selector = '.card') {
  let observer : IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll(selector)

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach(el => observer!.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}


//declare module '@/composables/useScrollAnimation' {
//  export function useScrollAnimation(): void
//}