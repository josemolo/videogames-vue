<template>
  <div id="app">
    <Navbar />

    <router-view v-slot="{ Component }">

      <!-- Animación de transición -->
      <!--<transition name="fade-slide" mode="out-in">-->
         <component :is="Component" />
      <!--<router-view />--> 
      <!--</transition>-->
    </router-view>    
    <LoginModal ref="loginModalRef" />
     <!-- 🔐 LOGIN MODAL GLOBAL -->
    <!--
    <div
      v-if="user.showLoginModal"
      class="modal-overlay"
      @click.self="user.closeLoginModal()"
    >
      <div class="modal-box">
        <Login />
      </div>
      
    </div>
    -->
  </div>
</template>

<script setup lang="ts">
import { provide, ref, onMounted } from 'vue'
import LoginModal from './components/LoginModal.vue'
import { useUserStore } from '@/stores/user'
import Login from '@/views/Login.vue'

import Navbar from './components/Navbar.vue'

//import { useRoute } from 'vue-router'

import { useHead } from '@vueuse/head'

import { useAuth } from './composables/useAuth'

//const route = useRoute()

const loginModalRef = ref()
const user = useUserStore()

const { getUser } = useAuth()

getUser()

provide('openLoginModal', () => {
  loginModalRef.value?.open()
})

onMounted(() => {
  user.setLoginModalRef(loginModalRef.value)
})

useHead({
  meta: [
    {
      name: 'google-site-verification',
      content: 'ABC123...'
    }
  ]
})

</script>

<style>
#app {
  background-color: #0b0b0f;
  min-height: 100vh;
}

/*
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  animation: fadeIn 0.25s ease;
}

.modal-box {
  background: #1c1c2f;
  padding: 35px;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  box-shadow:
    0 0 25px rgba(0,255,255,0.5),
    0 0 50px rgba(127,92,255,0.6);
  animation: modalPop 0.25s ease;
}
*/

/* Opcional: reset básico */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  max-width: 100%;
  font-family: Arial, sans-serif;
}

/* Animación fade + slide */
.fade-slide-enter-active {
  animation: pageIn 0.8s ease forwards;
}

.fade-slide-leave-active { 
  animation: pageOut 0.5s ease forwards;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1);
}

.console-img:hover {
  transform: scale(1.15);
  box-shadow: 0 0 25px #00ffff, 0 0 50px #6d307a;
  transition: 0.4s;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes pageOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* Animaciones suaves */
@keyframes modalPop {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}


@media (max-width: 900px) {
  .content {
    flex-direction: column;
    gap: 20px;
    padding: 0 10px; /* algo de padding para no pegarse a los bordes */
  }
}

* {
  box-sizing: border-box;
}
</style>
