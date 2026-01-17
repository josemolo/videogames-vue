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
  </div>
</template>

<script setup lang="ts">

import Navbar from './components/Navbar.vue'

import { useRoute } from 'vue-router'

import { useHead } from '@vueuse/head'

const route = useRoute()

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
/* Opcional: reset básico */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Animación fade + slide */
.fade-slide-enter-active {
  animation: pageIn 0.8s ease forwards;
}

.fade-slide-leave-active { animation: pageOut 0.5s ease forwards;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
</style>
