<template>
  <section class="hero" v-reveal>

    <!-- Video de fondo -->
    <video autoplay muted loop playsinline class="hero-video"> <!--crossorigin="anonymous"-->
      <source :src="video" type="video/mp4" />
    </video>

    <div class="hero-overlay"></div>

    <!-- Contenido -->
    <div class="hero-content">
      <span class="badge">🎮 TIENDA GAMER</span>
      <h1 class="neon-text">LucyCell</h1>
      <p class="neon-text">Tecnología y estilo a tu alcance</p>
      <div class="hero-actions">
        <router-link to="/consoles" class="primary glow">Comprar ahora</router-link>
        <router-link to="/news" class="secondary glow">Ver novedades</router-link>
      </div>
    </div>

    <!-- Partículas -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

  </section>
</template>


<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'

//import { useRouter } from 'vue-router'


defineProps({
  video: {
    type: String,
    required: true
  }
})



// URL pública del video, evita problemas con Git LFS
/*const gamingBg = "https://https://drive.google.com/drive/folders/1oF-Yx7FGFQPmhbHHXrvZdq_uw4Aay6Ab?usp=drive_link -videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"*/

//const router = useRouter()
//const goToShop = () => router.push('/consoles')
//const goToNews = () => router.push('/news')

// Video público
//const gamingBgUrl = "https://res.cloudinary.com/dakkfinnu/video/upload/v1767195871/gaming_g0o04l.mp4"

const particleCanvas = ref(null)
let animationId = null
let resizeHandler = null
let visibilityHandler = null  

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

onMounted(async() => {
  if (prefersReducedMotion) return

  await nextTick() //CLAVE PARA VERSEL 

  const canvas = particleCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  resizeHandler = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resizeHandler()
  window.addEventListener('resize', resizeHandler)

  const isMobile = window.innerWidth < 768
  const particleCount = isMobile ? 18 : 40

  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: Math.random() * 2 + 1.5
  }))

  const maxDist = 120 * 120

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

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distSq = dx * dx + dy * dy

        if (distSq < maxDist) {
          const opacity = 1 - distSq / maxDist
          ctx.beginPath()
          ctx.strokeStyle = `rgba(127,92,255,${1 - distSq / 120})`
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(animate)
  }


  animate()

  visibilityHandler = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId)
    } else {
      animate()
    }
  }

  document.addEventListener('visibilitychange', visibilityHandler)
})

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler)
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
  /*color: #9f0e0e9c;*/
  z-index: 1;
} 

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.2) contrast(1.1);
  z-index: -2;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: -2;
  pointer-events: none;
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
    0 0 40px #503ec2;
    /*0 0 60px #7f5cff,
    0 0 80px #503ec2;*/
  animation: flicker 2s infinite alternate;
}

/* TÍTULO PRINCIPAL */
.hero-content h1.neon-text {
  font-size: clamp(3.8rem, 8vw, 5.5rem);
  font-weight: 900;
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
}

/* SUBTÍTULO */
.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/*@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.7; }
}*/

.hero-actions {
  margin-top: 2.2rem;
  display: flex;
  gap: 1.4rem;
  justify-content: center;
  flex-wrap: wrap;
}


.hero-actions a {
  padding: 0.9rem 2.4rem;
  font-size: 1.05rem;
  border-radius: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
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
  /*position: relative;
  padding: 0.9rem 2.4rem;
  font-size: 1.05rem;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 600;*/
  color: white;

  background: linear-gradient(45deg, #7f5cff, #503ec2);
  box-shadow: 0 0 20px rgba(127,92,255,0.45);

  transition:
  transform 0.25s ease,
  box-shadow 0.25s ease,
  filter 0.25s ease
}

.primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 0 35px rgba(127,92,255,0.7), 0 0 70px rgba(80,62,194,0.4);
}

/*.primary:active {
  transform: translateY(1px) scale(0.98);
  box-shadow:
    0 0 15px rgba(127,92,255,0.6);
}

.primary::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(127,92,255,0.6),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.primary:hover::after {
  opacity: 1;
}*/



.secondary {
  /*background: transparent;
  border: 2px solid #b8a7e6;*/
  color: white;
  background: linear-gradient(45deg, #ff4fd8, #ff2f92);
  box-shadow: 0 0 20px rgba(255,79,216,0.45);
}

.secondary:hover {
  /*background: rgba(184, 167, 230, 0.15);*/
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 0 35px rgba(255,79,216,0.7),
    0 0 70px rgba(255,47,146,0.4);
}

.glow {
  /*box-shadow: 0 0 15px rgba(127,92,255,0.8), 0 0 30px rgba(127,92,255,0.6);*/
  transition: all 0.3s ease;
}
.glow:hover {
  transform: translateY(-4px);
  /*box-shadow: 0 0 35px rgba(127,92,255,1), 0 0 60px rgba(127,92,255,0.8);*/
}

.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes flicker {
  0%, 100% { opacity: 1; } /*transform: translateY(30px);*/
  50% { opacity: 0.85; } /*transform: translateY(0);*/
}

@media (max-width: 600px) {
  .hero-actions { flex-direction: column; }
  /*.hero-content h1 { font-size: 3rem; }*/
}
</style>
