import { defineStore } from 'pinia'
import { useCartStore } from './cart'



export interface User {
  username: string
  email?: string
  isVerified?: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
    isVerified: false,
    
    showLoginModal: false, // 👈 NUEVO
    pendingAction: null as null | (() => void), // 👈 opcional (pro)
    loginModalRef: null as any
  }),

   getters: {
    userisVerified: (state) => !!state.user?.isVerified,
  },

  actions: {
    setLoginModalRef(ref: any) {
      this.loginModalRef = ref
    },

    login(username: string, password: string) {
      // 🔐 demo simple (luego se puede conectar a backend)
      const saved = localStorage.getItem('vortex_user')

      if (!saved) return false

      const parsed = JSON.parse(saved)

      if (
        parsed.username === username &&
        parsed.password === password
      ) {
        this.user = {
          username: parsed.username,
          email: parsed.email,
          isVerified: true // 🔐 aún no verificado
        }
        this.isLoggedIn = true
        this.isVerified = true
        this.showLoginModal = false 

        // 🔥 ejecutar acción pendiente
        if (this.pendingAction) {
            this.pendingAction()
            this.pendingAction = null
        }

        alert(`¡Bienvenido de nuevo, ${username}!`)
        return true
      }

      return false
    },

    openLoginModal(action?: () => void) {
        if (action) {
            this.pendingAction = action
        }
        
        if (this.loginModalRef) {
            this.loginModalRef.open()
        }
        this.showLoginModal = true
    },

    closeLoginModal() {
        if (this.loginModalRef) {
            this.loginModalRef.close()
        }

        this.pendingAction = null
    },

    createAccount(username: string, email: string, password: string) {
      localStorage.setItem(
        'vortex_user',
         JSON.stringify({ username, email, password })
      
      )

      this.user = { username, email, isVerified: true }
      this.isLoggedIn = true
      this.isVerified = true
      this.showLoginModal = false

      alert(`¡Cuenta Creada! Bienvenido ${username}.`)
      //AQUI LUEDO PODRIAS ENVIAR UN CORREO REAL    
    },

    logout() {
      this.user = null
      this.isLoggedIn = false
      this.isVerified = false
      this.showLoginModal = false
      this.pendingAction = null

       // 🧹 limpiar carrito al cerrar sesión
      const cart = useCartStore()
      cart.clearCart()
    },

    markVerified() {
        this.isVerified = true
        if (this.user) {
            this.user.isVerified = true
      }
    },
    

    forgotUsername() {
      alert('Contacta soporte para recuperar tu usuario')
    },

    forgotPassword() {
      alert('Contacta soporte para recuperar tu contraseña')
    }
  },

  persist: true
})
