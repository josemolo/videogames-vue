import { onMounted, onBeforeUnmount } from 'vue'

export function useParticles(canvasRef: HTMLCanvasElement | null): () => void {
  let animationId: number | null = null

  function startParticles() {
    if (!canvasRef) return
    const ctx = canvasRef.getContext('2d')
    if (!ctx) return

    function draw() {
      if (!ctx || !canvasRef) return

      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)
      // Aquí va tu lógica de partículas...
      animationId = requestAnimationFrame(draw)
    }

    draw()
  }

  onMounted(() => {
    startParticles()
  })

  onBeforeUnmount(() => {
    if (animationId !== null) cancelAnimationFrame(animationId)
  })

  // Retornamos función de cleanup por si alguien quiere detener manualmente
  return () => {
    if (animationId !== null) cancelAnimationFrame(animationId)
  }
}
