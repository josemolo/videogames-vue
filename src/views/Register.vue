<template>
  <div class="register-page">
    <!-- Fondo animado -->
    <div class="background-lights"></div>

    <!-- Partículas fuera del cuadro -->
    <div class="particles-global">
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
    </div>

    <!-- Contenedor de formulario -->
    <div class="register-container">
      <h1>REGISTER</h1>

      <!-- Partículas dentro del contenedor -->
      <div class="particles-container">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <form class="register-form" @submit="handleRegister">
        <input v-model="username" type="text" placeholder="User name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>

      <!-- Barras de energía animadas -->
      <div class="energy-bars bottom">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
      </div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const particlesGlobal = ref<HTMLElement[]>([])
const particlesContainer = ref<HTMLElement[]>([])

onMounted(() => {
  particlesGlobal.value = Array.from(
    document.querySelectorAll('.particles-global span')
  ) as HTMLElement[]

  particlesContainer.value = Array.from(
    document.querySelectorAll('.particles-container span')
  ) as HTMLElement[]

  // Movimiento de partículas global
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

  // Partículas internas al escribir
  const inputs = document.querySelectorAll('.register-form input')
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      particlesContainer.value.forEach((p) => {
        const offsetX = (Math.random() - 0.5) * 20
        const offsetY = (Math.random() - 0.5) * 20
        const scale = 0.5 + Math.random() * 1
        p.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
        setTimeout(() => { p.style.transform = '' }, 300)
      })
    })
  })
})

const handleRegister = (e: Event) => {
  e.preventDefault()

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Por favor completa todos los campos')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  alert('Usuario creado exitosamente!')
  router.push('/library')
}
</script>

<style>
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

/* ... todo tu CSS de partículas y barras ... */
</style>
