<template>
  <div class="taller-page">
    <!-- CANVAS PARTICLES -->
    <canvas ref="canvasRef" class="bg-canvas"></canvas>
    <!-- HERO -->
    <section class="taller-hero reveal">
      <h1>TECH CENTER</h1>
      <p>Centro técnico especializado en reparación avanzada de dispositivos electrónicos</p>
    </section>
    <!-- MÉTRICAS -->
    <section class="metrics reveal">
      <div class="metric">
        <h3>{{ repairsCount }}</h3>
        <span>Reparaciones realizadas</span>
      </div>
      <div class="metric">
        <h3>{{ satisfaction }}%</h3>
        <span>Satisfacción de clientes</span>
      </div>
      <div class="metric">
        <h3>{{ hours }}</h3>
        <span>Tiempo promedio (hrs)</span>
      </div>
    </section>
    <!-- CERTIFICACIONES -->
    <section class="certifications reveal">
      <h2>Estándares & Garantía</h2>
      <div class="cert-grid">
        <div class="cert">Componentes certificados</div>
        <div class="cert">Técnicos especializados</div>
        <div class="cert">Garantía escrita</div>
        <div class="cert">Diagnóstico profesional</div>
      </div>
    </section>
    <!-- GRID PRINCIPAL -->
    <section class="taller-content">
      <div class="glass reveal">
        <h2>Servicios Especializados</h2><br>
        <ul>
          <li>Micro soldadura avanzada</li><br> 
          <li>Cambio de pantalla OLED / AMOLED</li><br>
          <li>Reemplazo de batería premium</li><br>
          <li>Reparación de consolas</li><br>
          <li>Recuperación de sistema</li>
        </ul>
      </div>
      <div class="glass reveal">
        <h2>Solicitar Evaluación Técnica</h2>
        <form @submit.prevent="sendToWhatsApp" class="taller-form">
          <input v-model="name" type="text" placeholder="Nombre completo" required />
          <input v-model="phone" type="text" placeholder="Teléfono" required />
          <input v-model="device" type="text" placeholder="Dispositivo" required />
          <textarea v-model="problem" placeholder="Describe el problema..." required></textarea>
          <button type="submit">Contactar por WhatsApp</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@vueuse/head'

const name = ref('')
const phone = ref('')
const device = ref('')
const problem = ref('')

/* ===== MÉTRICAS ANIMADAS ===== */
const repairsCount = ref(0)
const satisfaction = ref(0)
const hours = ref(0)

function animateCounter(target: number, refVar: any, duration = 2000) {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      refVar.value = target
      clearInterval(timer)
    } else {
      refVar.value = Math.floor(current)
    }
  }, 16)
}

/* ===== SCROLL REVEAL ===== */
function setupReveal() {
  const reveals = document.querySelectorAll('.reveal')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')

        if (entry.target.classList.contains('metrics')) {
          animateCounter(1200, repairsCount)
          animateCounter(98, satisfaction)
          animateCounter(36, hours)
        }
      }
    })
  }, { threshold: 0.2 })

  reveals.forEach(el => observer.observe(el))
}

/* ===== PARTICLES CANVAS ===== */
const canvasRef = ref<HTMLCanvasElement | null>(null)
const navbarHeight = 80  // Ajusta si cambia la altura del navbar

let animationId: number | null = null
const particles: any[] = []

function createParticles(canvasWidth: number, canvasHeight: number) {
  particles.length = 0 // limpiar array
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    })
  }
}

function setupCanvasSize() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight - navbarHeight
  canvas.style.top = `${navbarHeight}px`
}

function animate() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(p => {
    p.x += p.speedX
    p.y += p.speedY

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,215,0,0.7'
    ctx.shadowColor = '#FFD700'
    ctx.shadowBlur = 8

    ctx.fill()

    ctx.shadowBlur = 0
  })

  /* ===== LÍNEAS ENTRE PARTÍCULAS ===== */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {

        const opacity = 1 - distance / 120

        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)

        ctx.strokeStyle = `rgba(255,215,0,${opacity * 0.4})`
        ctx.lineWidth = 1

        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(animate)
}

function setupParticles() {
  setupCanvasSize()
  createParticles(window.innerWidth, window.innerHeight - navbarHeight)
  animate()
}

function onResize() {
  setupCanvasSize()
  createParticles(window.innerWidth, window.innerHeight - navbarHeight)
}

onMounted(() => {
  setupReveal()
  setupParticles()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
})

useHead({
  title: 'LucyCell Tech Center | Corporativo',
  meta: [
    { name: 'description', content: 'Centro técnico corporativo especializado en reparación avanzada.' }
  ]
})

function sendToWhatsApp() {
  const message = `
Hola, quiero solicitar una evaluación técnica:

Nombre: ${name.value}
Teléfono: ${phone.value}
Dispositivo: ${device.value}
Problema: ${problem.value}
`
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/50687469019?text=${encoded}`, '_blank')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800&display=swap');

section { position: relative; z-index: 2; margin-bottom: 100px; text-align: center; }

.taller-page { min-height: 100vh; padding: 120px 40px; background: #0a0903; font-family: 'Orbitron', sans-serif; color: rgb(255, 243, 182); position: relative; overflow-x: hidden; }

.bg-canvas { position: absolute; top: 0; left: 0; width: 100%; /* altura la controla el canvas con JS */ z-index: 0; }

.reveal { opacity: 0; transform: translateY(50px); transition: 1s ease; }

.reveal.active { opacity: 1; transform: translateY(0); }

/* ===== TITULO NEON FLOW ===== */
.taller-hero h1 { font-family: 'Orbitron', sans-serif; text-align: center; font-size: clamp(3rem,5vw,4.5rem); font-weight: 900; letter-spacing: 4px; text-transform: uppercase; background: linear-gradient(90deg, #FFD700, #fff0b3, #BFA06D); background-size: 500% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: neonFlow 60s ease infinite; text-shadow: 0 0 10px rgba(255,215,0,0.25), 0 0 20px rgba(255,248,220,0.3), 0 0 40px rgba(191,160,109,0.4); }

.metrics { display: flex; justify-content: center; gap: 60px; }

.metric h3 { font-size: 2.5rem; color: #ffd9009b; }

.certifications h2 { margin-bottom: 40px; }

.cert-grid { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }

.cert { padding: 20px 30px; background: rgba(255,215,0,0.05); border-radius: 12px; border: 1px solid rgba(255,215,0,0.15); transition: 0.3s; }

.cert:hover { box-shadow: 0 0 25px #ffd900b1; }

.taller-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: auto; }

.glass { backdrop-filter: blur(20px); background: rgba(255,215,0,0.05); padding: 40px; border-radius: 20px; }

.taller-form { display: flex; flex-direction: column; gap: 15px; }

.taller-form input,
.taller-form textarea { padding: 14px; border-radius: 10px; border: none; background: rgba(0,0,0,0.6); color: rgb(255, 242, 186); }

.taller-form button {padding: 16px; border-radius: 12px; border: none; font-weight: bold; background: linear-gradient(45deg,#ffd90096,#BFA06D); cursor: pointer; }

@media(max-width:900px){
  .metrics { flex-direction: column; gap: 30px; }
  .taller-content { grid-template-columns: 1fr; }
}

@keyframes neonFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>