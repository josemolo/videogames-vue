<template>
  <Modal ref="modalRef">
    <h2 v-if="!isRegistering">Iniciar sesión</h2>
    <h2 v-else>Crear cuenta nueva</h2>

    <form @submit.prevent="submit">
      <div class="input-group">
        <label>Usuario:</label>
        <input v-model="username" required />
      </div>
      <div class="input-group" v-if="isRegistering">
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label>Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">{{ isRegistering ? 'Registrar' : 'Iniciar sesión' }}</button>
    </form>

    <p class="toggle" @click="toggleForm">
      {{ isRegistering ? 'Ya tienes cuenta? Inicia sesión' : 'No tienes cuenta? Regístrate' }}
    </p>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useUserStore } from '@/stores/user'

const modalRef = ref<InstanceType<typeof Modal> | null>(null)
const userStore = useUserStore()

const isRegistering = ref(false)
const username = ref('')
const email = ref('')
const password = ref('')

function toggleForm() {
  isRegistering.value = !isRegistering.value
}

function submit() {
  let success = false

  if (isRegistering.value) {
    userStore.createAccount(username.value, email.value, password.value)
    success = true
  } else {
    success = userStore.login(username.value, password.value)
    if (!success) {
      alert('Usuario o contraseña incorrectos')
      return
    }
  }

   // 🔥 Ejecutar acción pendiente si existe
  if (userStore.pendingAction) {
    userStore.pendingAction()
    userStore.pendingAction = null
  }

  modalRef.value?.close()
  // limpiar campos
  username.value = ''
  email.value = ''
  password.value = ''
}

function open() {
  modalRef.value?.open()
}

/**
 * ✅ ESTO ES LO QUE FALTABA
 * expone open() al componente padre (Navbar)
 */
defineExpose({
  open,
  close
})
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

input {
  padding: 6px 8px;
  border-radius: 6px;
  border: none;
}

button {
  background: #511d71;
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background: #7f5cff;
}

.toggle {
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
  color: #cfcfcf;
}
.toggle:hover {
  color: white;
}
</style>


