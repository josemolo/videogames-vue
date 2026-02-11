<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()
const user = useUserStore()

const username = ref('')
const password = ref('')

function submit() {
  const success = user.login(username.value, password.value)

  if (success) {
    router.push('/verify')
  } else {
    alert('Credenciales incorrectas')
  }
}
</script>

<template>
  <div class="auth">
    <h2>Iniciar sesión</h2>
    <input v-model="email" placeholder="Correo" />
    <button @click="submit">Continuar</button>
  </div>
</template>
