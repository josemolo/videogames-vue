<template>
  <div class="register-page">
    <!-- Fondo animado -->
    <div class="background-lights"></div>

    <!-- Partículas fuera del cuadro -->
    <div class="particles-global">
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
    </div>

    <!-- Contenedor de formulario estilo interfaz -->
    <div class="register-container">
      <h1>LOGIN</h1>

      <!-- Partículas dentro del contenedor -->
      <div class="particles-container">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <!-- Formulario con redirección -->
      <form class="register-form" @submit.prevent="redirectToLibrary">
        <input type="text" placeholder="User name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>

      <!-- Barras de energía animadas inferiores -->
      <div class="energy-bars bottom">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
      </div>

      <!-- Barras de energía animadas laterales -->
      <div class="energy-bars left">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
      </div>
      <div class="energy-bars right">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'

const particlesGlobal = ref<HTMLElement[]>([])
const particlesContainer = ref<HTMLElement[]>([])

onMounted(() => {
  particlesGlobal.value = Array.from(
    document.querySelectorAll('.particles-global span')
  ) as HTMLElement[]

  particlesContainer.value = Array.from(
    document.querySelectorAll('.particles-container span')
  ) as HTMLElement[]

  // Movimiento de partículas global según el mouse
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    particlesGlobal.value.forEach((p, index) => {
      const speed = 0.04 + index * 0.01
      const rect = p.getBoundingClientRect()
      const dx = mouseX - (rect.left + rect.width / 2)
      const dy = mouseY - (rect.top + rect.height / 2)
      p.style.transform = `translate(${-dx * speed}px, ${-dy * speed}px)`
    })
  })

  // Efecto "consola viva" para partículas internas
  const inputs = document.querySelectorAll('.register-form input')
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      particlesContainer.value.forEach((p) => {
        const offsetX = (Math.random() - 0.5) * 20
        const offsetY = (Math.random() - 0.5) * 20
        const scale = 0.5 + Math.random() * 1
        p.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`

        // Volver a animación original después de 300ms
        setTimeout(() => {
          p.style.transform = ''
        }, 300)
      })
    })
  })
})

useHead({
  title: 'Contacto | VortexGames',
  meta: [
    {
      name: 'description',
      content: 'Contáctanos para dudas, sugerencias o colaboraciones en VortexGames.'
    },
    { property: 'og:title', content: 'Contacto | VortexGames' },
    {
      property: 'og:description',
      content: 'Ponte en contacto con el equipo de VortexGames.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og/contact.png' }
  ]
})

// Función de redirección
const redirectToLibrary = () => {
  // Aquí puedes agregar validaciones si quieres
  window.location.href = "library.html"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

.register-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a1f;
  font-family: 'Orbitron', sans-serif;
  overflow: hidden;
  position: relative;
}

/* Fondo animado */
.background-lights {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 20% 20%, #00ffff55, transparent 30%),
              radial-gradient(circle at 80% 80%, #ff00ff55, transparent 30%);
  animation: float 10s infinite alternate;
  z-index: 0;
}

@keyframes float {
  0% { transform: translate(0, 0); }
  50% { transform: translate(-60px, 60px); }
  100% { transform: translate(0, 0); }
}

/* Partículas fuera del cuadro */
.particles-global span {
  position: absolute;
  display: block;
  border-radius: 50%;
  opacity: 0.7;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  width: 4px;
  height: 4px;
  filter: drop-shadow(0 0 8px #00ffff) drop-shadow(0 0 8px #ff00ff);
  will-change: transform;
  animation: floatGlobal 4s ease-in-out infinite alternate;
}

.particles-global span:nth-child(1){ top:10%; left:15%; animation-duration:8s;}
.particles-global span:nth-child(2){ top:25%; left:5%; animation-duration:9s;}
.particles-global span:nth-child(3){ top:15%; left:80%; animation-duration:7s;}
.particles-global span:nth-child(4){ top:40%; left:40%; animation-duration:10s;}
.particles-global span:nth-child(5){ top:55%; left:70%; animation-duration:8.5s;}
.particles-global span:nth-child(6){ top:60%; left:30%; animation-duration:9.2s;}
.particles-global span:nth-child(7){ top:75%; left:55%; animation-duration:9.8s;}
.particles-global span:nth-child(8){ top:85%; left:20%; animation-duration:10s;}
.particles-global span:nth-child(9){ top:90%; left:90%; animation-duration:8.3s;}
.particles-global span:nth-child(10){ top:5%; left:50%; animation-duration:9.6s;}

@keyframes floatGlobal {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

/* Contenedor tipo panel */
.register-container {
  position: relative;
  z-index: 1;
  background: #1c1c2f;
  border: 3px solid #bf97ea;
  border-radius: 15px;
  padding: 40px 30px;
  width: 350px;
  box-shadow: 0 0 20px #bf97ea, 0 0 40px #6d307a;
  overflow: hidden;
}

/* Partículas dentro del contenedor */
.particles-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.particles-container span {
  position: absolute;
  display: block;
  border-radius: 50%;
  opacity: 0.8;
  background: linear-gradient(45deg, #bf97ea, #6d307a);
  filter: drop-shadow(0 0 8px #bf97ea) drop-shadow(0 0 8px #6d307a);
  width: 3px;
  height: 3px;
  animation: moveParticle 5s linear infinite;
}

.particles-container span:nth-child(1){ top:10%; left:5%; animation-duration:6s;}
.particles-container span:nth-child(2){ top:20%; left:20%; animation-duration:8s;}
.particles-container span:nth-child(3){ top:30%; left:50%; animation-duration:10s;}
.particles-container span:nth-child(4){ top:15%; left:70%; animation-duration:7s;}
.particles-container span:nth-child(5){ top:40%; left:80%; animation-duration:9s;}
.particles-container span:nth-child(6){ top:50%; left:30%; animation-duration:6.5s;}
.particles-container span:nth-child(7){ top:60%; left:60%; animation-duration:8.5s;}
.particles-container span:nth-child(8){ top:70%; left:10%; animation-duration:7.5s;}
.particles-container span:nth-child(9){ top:80%; left:40%; animation-duration:9.5s;}
.particles-container span:nth-child(10){ top:90%; left:90%; animation-duration:10s;}

@keyframes moveParticle {
  0%{ transform: translate(0,0) scale(0.5); }
  25%{ transform: translate(10px,-10px) scale(1); }
  50%{ transform: translate(-10px,10px) scale(0.7); }
  75%{ transform: translate(15px,-5px) scale(1); }
  100%{ transform: translate(0,0) scale(0.5); }
}

/* Título estilo HUD gamer */
.register-container h1 {
  font-size: 2.5rem;
  color: #bf97ea;
  text-shadow: 0 0 10px #bf97ea, 0 0 20px #6d307a;
  margin-bottom: 0.5rem;
  text-align: center;
}

/* Formulario */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.register-form input {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #111127;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  box-shadow: 0 0 5px #bf97ea;
  transition: 0.3s;
}

.register-form input::placeholder {
  color: #888;
}

.register-form input:focus {
  box-shadow: 0 0 15px #bf97ea, 0 0 25px #6d307a;
  background-color: #22223b;
}

.register-form button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #bf97ea, #6d307a);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px #bf97ea, 0 0 20px #6d307a;
}

.register-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px #bf97ea, 0 0 40px #6d307a;
}

/* Barras HUD superior e inferior */
.register-container::before,
.register-container::after {
  content: "";
  position: absolute;
  height: 3px;
  width: 80%;
  background: linear-gradient(90deg, #bf97ea, #6d307a);
  top: 0;
  left: 10%;
  box-shadow: 0 0 10px #bf97ea, 0 0 20px #6d307a;
  border-radius: 2px;
}

.register-container::after {
  bottom: 0;
  top: auto;
}

/* Barras de energía animadas inferiores */
.energy-bars.bottom {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 5px;
  display: flex;
  gap: 5px;
}

/* Barras laterales verticales */
.energy-bars.left,
.energy-bars.right {
  position: absolute;
  top: 10%;
  height: 80%;
  width: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.energy-bars.left { left: -2px; }
.energy-bars.right { right: -2px; }

.energy-bars .bar {
  border-radius: 2px;
  animation: energy 1.5s infinite alternate, colorShift 4s infinite alternate;
}

.energy-bars.bottom .bar {
  flex: 1;
  width: 100%;
}

.energy-bars.left .bar,
.energy-bars.right .bar {
  flex: 1;
  width: 100%;
}

.energy-bars .bar1 { animation-delay: 0s, 0s; }
.energy-bars .bar2 { animation-delay: 0.3s, 1s; }
.energy-bars .bar3 { animation-delay: 0.6s, 2s; }

@keyframes energy {
  0% { transform: scaleY(0.4); opacity: 0.6; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0.4); opacity: 0.6; }
}

@keyframes colorShift {
  0%, 25%, 50%, 75%, 100% { background: linear-gradient(90deg, #bf97ea, #6d307a); }
}
</style>
