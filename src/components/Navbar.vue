<template>
  <header class="header">
    <!-- Logo y carrito -->
    <div class="top-row">
      <h1 class="logo">LUCYCELL</h1>

      <!-- Dropdown de usuario -->
      <div class="user-dropdown">
        <button @click="toggleUserMenu" class="user-button">
          👤 {{ userStore.isLoggedIn ? userStore.user?.username : '' }}
        </button>

        <ul v-if="userMenuOpen" class="dropdown-menu">
          <li v-if="!userStore.isLoggedIn" @click="openLogin">Iniciar sesión</li>
          <li v-if="!userStore.isLoggedIn" @click="openLogin">Crear cuenta nueva</li>
          <li v-if="!userStore.isLoggedIn" @click="userStore.forgotUsername">Olvidé mi usuario</li>
          <li v-if="!userStore.isLoggedIn" @click="userStore.forgotPassword">Olvidé mi contraseña</li>
          <li v-if="userStore.isLoggedIn" @click="logout">Cerrar sesión</li>
        </ul>
      </div>
    </div>
    <!-- FILA 2: Menú izquierda / Carrito derecha -->
    <div class="bottom-row">
      <div class="menu-hamburger">
        <button class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav :class="['nav', { open: isOpen }]">
          <router-link to="/" class="nav-link" @click="closeMenu">HOME</router-link>
          <router-link to="/news" class="nav-link" @click="closeMenu">NEWS</router-link>
          <router-link to="/consoles" class="nav-link" @click="closeMenu">STORE</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMenu">CONTACTS</router-link>
        </nav>
      </div>
      <button class="cart-button" @click="openCartPopup">
        🛒 <span v-if="cart.totalItems > 0">{{ cart.totalItems }}</span>
      </button>
    </div>

      <!-- MODALES -->
    <LoginModal ref="loginModalRef" />

    <!-- Componente del carrito -->
    <CartPopup ref="cartPopupRef" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from '@/components/LoginModal.vue'
import CartPopup from '@/components/CartPopup.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const cart = useCartStore()
const userStore = useUserStore()

const isOpen = ref(false)
const userMenuOpen = ref(false)

const loginModalRef = ref<InstanceType<typeof LoginModal> | null>(null)
const cartPopupRef = ref<InstanceType<typeof CartPopup> | null>(null)

const toggleMenu = () => isOpen.value = !isOpen.value 
const closeMenu = () => isOpen.value = false 
const toggleUserMenu = () => userMenuOpen.value = !userMenuOpen.value 

// 🔐 Abrir login global
const openLogin = () => { 
  userStore.openLoginModal() 
  userMenuOpen.value = false 
}

//{ loginModalRef.value?.open(); userMenuOpen.value = false }

// Mostrar carrito (único nombre de función)
const openCartPopup = () => {
  if (!userStore.isLoggedIn) {
    userStore.openLoginModal()
    return
  }
  cartPopupRef.value?.openCart()
}

const openCreateAccount = () => { loginModalRef.value?.open(); userMenuOpen.value = false }

const logout = () => { 
  userStore.logout() 
  userMenuOpen.value = false 
}

onMounted(() => {
  userStore.setLoginModalRef(loginModalRef)
})
</script>


<style scoped>
.user-dropdown {
  position: relative;
  margin-right: 10px;
}

.user-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #1f1f3d;
  border: 1px solid #4349a3;
  list-style: none;
  padding: 5px 0;
  margin: 0;
  width: 200px;
  z-index: 50;
}

.dropdown-menu li {
  padding: 8px 12px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  color: #cfcfcf;
}

.dropdown-menu li:hover {
  background: #511d71;
  color: white;
}



.header {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px;
  background: linear-gradient(90deg, #0a0a23, #1f1f3d);
  color: white;
  box-shadow: 0 0 15px #59111b;
}

/* FILA 1: logo izquierda, usuario derecha */
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* FILA 2: menú izquierda, carrito derecha */
.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 1.8rem;
  background: linear-gradient(
    90deg,
    #7f5cff,
    #00ffe0,
    #7f5cff
  );
  background-size: 200%;
  background-clip: text;              /* 👈 estándar */
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: glow 4s linear infinite;
  cursor: pointer;
}

/* Botón carrito */
.cart-button {
  position: relative;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
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

.hamburger {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Botón hamburguesa */
.hamburger-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 3px;
  margin: 5px 0;
  background: #7f5cff; /* color base */
  border-radius: 5px;
  transition: 
    background 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 0 6px rgba(127, 92, 255, 0.6);
}
.hamburger:hover span {
  background: #00ffe0;
  box-shadow: 
    0 0 8px rgba(0,255,224,0.8),
    0 0 16px rgba(0,255,224,0.6);
}

/* Menú desplegable */
.nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.nav.open {
  max-height: 500px; /* suficiente para mostrar todos los links */
}

.nav-link {
  color: #7f5cff;
  font-weight: 600;
  font-family: 'Orbitron', sans-serif;
  text-decoration: none;
  transition:
    color 0.3s ease,
    text-shadow 0.3s ease;
  position: relative;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
}

.nav-link:hover {
  color: #00ffe0;
  text-shadow:
    0 0 8px rgba(0,255,224,0.8),
    0 0 16px rgba(0,255,224,0.6);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: #511d71;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

@keyframes glow {
  0% { background-position: 0% }
  100% { background-position: 200% }
}
</style>


