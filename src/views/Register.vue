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

      <form class="register-form" @submit.prevent="handleRegister">
        <input v-model="username" type="text" placeholder="User name" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button>
          <span v-if="!loading">Registrar</span>
          <span v-else class="spinner"></span>
        </button>
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

<<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

async function handleRegister(e: Event) {
  e.preventDefault()

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Por favor completa todos los campos')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    loading.value = true

    const success = await userStore.register(
      email.value,
      password.value,
      username.value
    )

    if (success) {
      router.push('/')
    }

  } finally {
    loading.value = false
  }
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
