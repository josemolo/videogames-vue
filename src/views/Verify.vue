<template>
  <div class="verify">
    <h2>Verifica tu identidad</h2>

    <button @click="sendEmail">Enviar por correo</button>
    <button @click="sendWhatsApp">Enviar por WhatsApp</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const user = useUserStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  // 🔗 simulamos token válido
  if (route.query.token) {
    user.markVerified()
    router.push('/')
  }
})

function sendEmail() {
  alert('📧 Enlace enviado al correo (simulado)')
}

function sendWhatsApp() {
  alert('💬 Enlace enviado por WhatsApp (simulado)')
}
</script>

