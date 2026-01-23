<template>
<header class="header">
  <div class="top-bar">
    <h1 class="logo">VORTEXGAMES</h1>

    <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
    </button>
  </div>
  <nav :class="['nav', { open: isOpen }]">
    <router-link to="/" class="nav-link cart-link" @click="closeMenu">HOME
       <span v-if="cart.totalItems > 0" class="cart-badge">
        {{ cart.totalItems }}
       </span>
    </router-link>
    <router-link to="/news" class="nav-link">NEWS</router-link>
    <router-link to="/consoles" class="nav-link">CONSOLES</router-link>
    <router-link to="/contact" class="nav-link">CONTACTS</router-link>
  </nav>
</header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { useNavbarPreload } from '@/composables/useNavbarPreload'

const { preloadOnOpen } = useNavbarPreload() //useNavbarPreload() // 👈 ÚNICA LÍNEA NUEVA

const cart = useCartStore()
const isOpen = ref(false)

watch(isOpen, (open) => {
  if (open) preloadOnOpen()
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>

.header {
  padding: 20px;
  background: linear-gradient(90deg, #0a0a23, #1f1f3d);
  color: white;
  box-shadow: 0 0 15px #59111b  ; /* sombra neón alrededor */
}

.nav {
  display: flex;
  gap: 25px;
  margin-top: 10px;
}

.nav a {
  color: #997ea6;
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  text-decoration: none; /* quitar subrayado */
  position: relative;
  transition: color 0.3s ease;
}

.logo {
  color: #866ca2;
  font-family: 'Orbitron', sans-serif; /* agrega esta fuente en tu index.html */
  font-weight: 900;
  font-size: 1.8rem;
  text-shadow:
    0 0 5px #866ca2,
    0 0 10px #866ca2,
    0 0 20px #866ca2;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: #511d71;
  text-shadow:
    0 0 5px #511d71,
    0 0 10px #511d71,
    0 0 20px #511d71;
}

.nav a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -5px;
  left: 0;
  background: #511d71;
  box-shadow:
    0 0 5px #511d71,
    0 0 10px #511d71,
    0 0 15px #511d71;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav a:hover::after {
  opacity: 1;
}

.navbar {
  display: flex;
  justify-content: space-between; /* Mantiene la separación con los links */
  align-items: center;
  padding: 0.8rem 2rem;
  background-color: #1e1e2f;
  color: white;
}

.navbar .logo {
  font-weight: bold;
  font-size: 2rem;
  margin-left: 0; /* Esto lo pega a la esquina izquierda */
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.navbar a:hover {
  color: #59111b;
}

.logo:hover {
  color: #59111b;
  text-shadow:
    0 0 10px #59111b,
    0 0 20px #59111b,
    0 0 30px #59111b;
}

h2 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: #c585f6;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
}

h2 {
  font-size: clamp(2rem, 6vw, 4rem);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px;
  background: #4349a3;
  border-radius: 2px;
  transition: background 0.3s ease;
}
.hamburger:hover span {
  background: #8475d8;
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0%;
  height: 2px;
  background: var(--neon-primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: #7f5cff;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 999px;
  box-shadow: 0 0 10px rgba(127,92,255,0.8);
}

</style>
