<template>
  <Modal ref="modalRef">
    <h2 v-if="!isRegistering">Iniciar sesión</h2>
    <h2 v-else>Crear cuenta nueva</h2>

    <form @submit.prevent="submit">
      <div class="input-group" v-if="isRegistering">
        <label>Usuario:</label>
        <input v-model="username" required />
      </div>
      <div class="input-group">
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label>Contraseña:</label>
        <div class="password-wrapper">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="password" 
            required 
          />
          <span class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>

        </div>  
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
const showPassword = ref(false)

function toggleForm() {
  isRegistering.value = !isRegistering.value
}

async function submit() {
  let success = false

  try {
    if (isRegistering.value) {
      success = await userStore.register(email.value, password.value, username.value)
    } else {
      success = await userStore.login(email.value, password.value)
      if (!success) {
        alert('Usuario o contraseña incorrectos')
        return
      }
    }

    if (!success) return

    // 🔥 Ejecutar acción pendiente si existe
    if (userStore.pendingAction) {
      userStore.pendingAction()
      userStore.pendingAction = null
    }

    close()

    /*modalRef.value?.close()*/
    // limpiar campos
    username.value = ''
    email.value = ''
    password.value = ''

  } catch (error: any) {
    console.error(error)
    alert(error.message)
  }
}

function open() {
  modalRef.value?.open()
}

function close() {
  modalRef.value?.close()
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
  background: #ffae0091;
  color: #ffffff;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background: #544d3b;
}

.toggle {
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
  color: #ffffff;
}
.toggle:hover {
  color: rgb(255, 255, 255);
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 0.9rem;
  user-select: none;
  opacity: 0.7;
}

.toggle-password:hover {
  opacity: 1;
}
</style>


