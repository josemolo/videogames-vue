/* src/composables/useParticles.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useParticles(canvasRef) {
  const mouse = { x: null, y: null }

  let canvas, ctx, animationId
  let particles = []

  onMounted(() => {
    canvas = canvasRef.value
    if (!canvas) return

    ctx = canvas.getContext('2d')
    resize()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)

    initParticles()
    animate()

    useParticles(canvasRef)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(animationId)
  })

  function onMouseMove(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function initParticles() {
    particles = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 2
      })
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      if (mouse.x && mouse.y) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 100) {
          p.x -= dx * 0.005
          p.y -= dy * 0.005
        }
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(127,92,255,0.8)'
      ctx.fill()
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(127,92,255,${1 - dist / 120})`
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(animate)
  }
}
*/

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

// src/composables/useParticles.ts
//export function useParticles(canvasRef: any) {
  // setup particles
  // ejemplo:
//  const animationId = requestAnimationFrame(() => {
    // animación 
//  })
//
//  return () => {
//    cancelAnimationFrame(animationId)
    // limpiar listeners si los hay
//  }
//}