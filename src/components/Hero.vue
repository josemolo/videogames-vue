<template>
  <section class="hero">

    <!-- Video de fondo -->
    <video autoplay muted loop playsinline class="hero-video">
      <source :src="gamingBgUrl" type="video/mp4" />
    </video>

    <div class="hero-overlay"></div>

    <!-- Contenido -->
    <div class="hero-content">
      <span class="badge">🎮 TIENDA GAMER</span>
      <h1 class="neon-text">VortexGames</h1>
      <p class="neon-text">Compra videojuegos y consolas al mejor precio</p>
      <div class="hero-actions">
        <button class="primary" @click="goToShop">Comprar ahora</button>
        <button class="secondary" @click="goToNews">Ver novedades</button>
      </div>
    </div>

    <!-- Partículas -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// URL pública del video, evita problemas con Git LFS
//const gamingBg = "https://https://drive.google.com/drive/folders/1oF-Yx7FGFQPmhbHHXrvZdq_uw4Aay6Ab?usp=drive_link -videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"

const router = useRouter()
const goToShop = () => router.push('/consoles')
const goToNews = () => router.push('/news')

// Video público
const gamingBgUrl = "https://drive.google.com/file/d/1v55Ln8l_qEfxMiFhb1eRhT013OtlxGG_/view?usp=drive_link"

const particleCanvas = ref(null)
let animationId = null  

onMounted(() => {
  const canvas = particleCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resize()

  const particles = []
  const particleCount = 40

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 3 + 2,
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(127,92,255,0.8)'
      ctx.fill()
    })

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
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


  animate()

  window.addEventListener('resize', resize)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #9f0e0e9c;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.2) contrast(1.1);
  z-index: -3;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: -2;
}

.hero-content {
  position: relative;
  max-width: 900px;
  padding: 20px;
  z-index: 2;
  animation: fadeUp 1s ease-out forwards;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  margin-bottom: 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background: rgba(127,92,255,0.2);
  border: 1px solid rgba(127,92,255,0.6);
  text-shadow: 0 0 5px rgba(127,92,255,0.8);
}

.neon-text {
  color: #7f5cff;
  text-shadow:
    0 0 5px #7f5cff,
    0 0 10px #7f5cff,
    0 0 20px #503ec2,
    0 0 40px #503ec2,
    0 0 60px #7f5cff,
    0 0 80px #503ec2;
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.7; }
}

.hero-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-actions button {
  padding: 0.9rem 2.4rem;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.primary {
  border: none;
  background: linear-gradient(45deg, #7f5cff, #503ec2);
  color: #fff;
  box-shadow: 0 0 20px #7f5cff, 0 0 40px #503ec2;
}

.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px #7f5cff, 0 0 60px #503ec2;
}

.secondary {
  background: transparent;
  color: #b8a7e6;
  border: 2px solid #b8a7e6;
  text-shadow: 0 0 5px #b8a7e6;
}

.secondary:hover {
  background: rgba(184, 167, 230, 0.15);
}

.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .hero-actions { flex-direction: column; }
  .hero-content h1 { font-size: 3rem; }
}
</style>
