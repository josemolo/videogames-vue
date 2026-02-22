<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)

const router = useRouter()
const userStore = useUserStore()

async function handleLogin() {
  try {
    loading.value = true

    const success = await userStore.login(
      email.value,
      password.value
    )

    if (success) {
      router.push('/')
    }

  } finally {
    loading.value = false
  }
}
</script>


<template>
  <form @submit.prevent="handleLogin"></form>
    <input v-model="email" placeholder="Correo" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button type="submit" :disabled="loading">
      <span v-if="!loading">Iniciar sesión</span>
      <span v-else class="spinner"></span>
    </button>
</template>
