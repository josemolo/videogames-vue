<template>
  <header class="header">
    <!-- Logo y carrito -->
    <div class="top-row">
      <h1 class="logo">LUCYCELL</h1>

      <!-- Dropdown de usuario -->
      <div class="user-dropdown">
        <button @click="toggleUserMenu" class="user-button">
          <span class="user-icon" :class="{ logged: userStore.isLoggedIn }"></span>
          <span v-if="userStore.isLoggedIn" class="username">
            {{ userStore.user?.username }}
          </span>
        </button>

        <ul v-if="userMenuOpen" class="dropdown-menu">
          <li v-if="!userStore.isLoggedIn" @click="openLogin">Iniciar sesión</li>
          <li v-if="!userStore.isLoggedIn" @click="openLogin">Crear cuenta nueva</li>
          <li v-if="!userStore.isLoggedIn" @click="userStore.forgotUsername">Olvidé mi usuario</li>
          <li 
            v-if="!userStore.isLoggedIn"
            @click="handleForgotPassword"
          >
            Olvidé mi contraseña
          </li>
          <li v-if="userStore.isLoggedIn" @click="logout">Cerrar sesión</li>
        </ul>
      </div>
    </div>
    <!-- FILA 2: Menú izquierda / Carrito derecha -->
    <div class="bottom-row">
      <div class="menu-hamburger" ref="menuRef">
        <button class="hamburger" :class="{ active: isOpen }" @click="toggleMenu">
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
      <button class="cart-icon" @click.stop="openCartPopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7f5cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>

        <span v-if="cart.totalItems" class="cart-badge">
          {{ cart.totalItems }}
        </span>
      </button>

    </div>

      <!-- MODALES -->
    <LoginModal ref="loginModalRef" />

    <!-- Componente del carrito -->
    <CartPopup ref="cartPopupRef" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LoginModal from '@/components/LoginModal.vue'
import CartPopup from '@/components/CartPopup.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'


const cart = useCartStore()
const userStore = useUserStore()

const isOpen = ref(false)
const userMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

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
  if (!cartPopupRef.value) return
  
  cartPopupRef.value.open()
}

const openCreateAccount = () => { loginModalRef.value?.open(); userMenuOpen.value = false }

const logout = () => { 
  userStore.logout() 
  userMenuOpen.value = false 
}


/* 🔥 Cerrar menú al hacer click fuera */
const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const handleForgotPassword = async () => {
  const email = prompt('Ingresa tu correo para recuperar contraseña:')
  if (!email) return
  await userStore.forgotPassword(email)
}


onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  userStore.setLoginModalRef(loginModalRef)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped>
.user-dropdown {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 2px;

  padding: 8px 14px;
  border-radius: 30px;
  border: 1px solid rgba(127, 92, 255, 0.4);

  background: rgba(31, 31, 61, 0.6);
  backdrop-filter: blur(10px);

  cursor: pointer;
  transition: all 0.3s ease;
}

/* Icono circular */
.user-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;

  background: linear-gradient(135deg, #7f5cff, #00ffe0);
  box-shadow: 0 0 10px rgba(127,92,255,0.6);

  position: relative;
}

/* Cabeza */
.user-icon::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #511d71;
  border-radius: 50%;
}

/* Cuerpo */
.user-icon::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 8px;
  background: #511d71;
  border-radius: 10px 10px 0 0;
}

/* Estado logueado */
.user-icon.logged {
  background: linear-gradient(135deg, #00ff9d, #00ffe0);
  box-shadow:
    0 0 12px rgba(0,255,157,0.8),
    0 0 24px rgba(0,255,157,0.5);
  animation: pulseGreen 2s infinite ease-in-out;
}

/* Username */
.username {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  color: #cfd3ff;
  letter-spacing: 1px;
}

/* Hover futurista */
.user-button:hover {
  border-color: #00ffe0;
  box-shadow:
    0 0 10px rgba(0,255,224,0.6),
    0 0 20px rgba(0,255,224,0.3);
  transform: translateY(-2px);
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
  padding: 10px 30px;
  background: linear-gradient(90deg, #0a0a23, #1f1f3d);
  color: white;
  box-shadow: 0 0 15px #59111b;
}

/* FILA 1: logo izquierda, usuario derecha */
.top-row, .bottom-row {
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

.cart-icon {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;

  margin-right: 10px;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #ff0055;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
  box-shadow: 0 0 8px #ff0055;
}


/* Botón carrito */
.cart-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  margin-right: 6px; /* 👈 ajusta este valor */
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #7f5cff;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 999px;
  box-shadow: 0 0 8px rgba(127,92,255,0.8);
}

.hamburger {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
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

.hamburger.active span {
  background: #00ffe0;
  box-shadow:
    0 0 8px rgba(0,255,224,0.9),
    0 0 16px rgba(0,255,224,0.6);
  transform: scaleX(0.85);
}




.menu-hamburger {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 6px; /* 👈 baja ligeramente el botón */
}

/* Menú desplegable */
.nav {
  position: absolute;
  left: 45px;
  top: 50%;

  transform: translateY(-50%) scaleX(0);
  transform-origin: left;

  display: flex;
  flex-direction: row;
  gap: 30px;
 
  padding: 14px 28px;
  background: rgba(31, 31, 61, 0.95);
  border: 1px solid #4349a3;
  border-radius: 14px;
  backdrop-filter: blur(12px);
  
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.18, 1);
 
}

.nav.open {
   transform: translateY(-50%) scaleX(1); /* suficiente para mostrar todos los links */
}

/* Animación escalonada */
.nav-link {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: #7f5cff;
  font-family: 'Orbitron', sans-serif;
  text-decoration: none;
  letter-spacing: 1px;
}

.nav.open .nav-link {
  opacity: 1;
  transform: translateX(0);
}

.nav.open .nav-link:nth-child(1) { transition-delay: 0.05s; }
.nav.open .nav-link:nth-child(2) { transition-delay: 0.1s; }
.nav.open .nav-link:nth-child(3) { transition-delay: 0.15s; }
.nav.open .nav-link:nth-child(4) { transition-delay: 0.2s; }

.nav-link:hover {
  color: #00ffe0;
  text-shadow:
    0 0 8px rgba(0,255,224,0.8),
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

/* Animación suave */
@keyframes pulseGreen {
  0% {
    box-shadow:
      0 0 8px rgba(0,255,157,0.6),
      0 0 16px rgba(0,255,157,0.3);
  }
  50% {
    box-shadow:
      0 0 16px rgba(0,255,157,1),
      0 0 32px rgba(0,255,157,0.6);
  }
  100% {
    box-shadow:
      0 0 8px rgba(0,255,157,0.6),
      0 0 16px rgba(0,255,157,0.3);
  }
}
</style>


