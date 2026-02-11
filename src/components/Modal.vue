<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <p v-if="message">{{ message }}</p>  
      <slot></slot>
      <button class="close-button" @click="close">✖</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref<string>('') // mensaje opcional para mostrar en modal

function open(msg?: string) {
  message.value = msg || ''
  visible.value = true
}

function close() {
  visible.value = false
}

defineExpose({ open, close, message  })
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #1f1f3d;
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
  max-width: 500px;
  position: relative;
  color: white;
  font-family: 'Orbitron', sans-serif;
  box-shadow: 0 0 20px #511d71;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #cfcfcf;
  font-size: 1.2rem;
  cursor: pointer;
}
.close-button:hover {
  color: white;
}
</style>
