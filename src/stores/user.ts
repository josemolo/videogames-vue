import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import { useCartStore } from './cart'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,
    isLoggedIn: false,
    isVerified: false,
    showLoginModal: false,
    pendingAction: null as (() => void) | null,
    loginModalRef: null as any
  }),

  actions: {
    setLoginModalRef(ref: any) {
      this.loginModalRef = ref
    },

    
    markVerified() {
      this.isVerified = true
    },

    async register(email: string, password: string, username: string) {
      try {      
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) throw error
        if (!data.user) throw new Error('No se pudo crear el usuario') 
            
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: data.user.id,
                username: username
            })
        
        if (profileError) {
            console.error('Error creando profile:', profileError.message)
        }

        this.user = data.user
        this.isLoggedIn = true
        this.isVerified = !!data.user.email_confirmed_at
        /*this.showLoginModal = false*/

        alert('Cuenta creada. Revisa tu correo para confirmar tu email.')
        return true

      } catch (error: any) {
        alert(error.message)
        return false
      }
    },  

    async login(email: string, password: string) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error 

        if (!data.user) return false
        
        this.user = data.user
        this.isLoggedIn = true
        this.isVerified = !!data.user.email_confirmed_at    
        this.showLoginModal = false

        if (this.pendingAction) {
            this.pendingAction()
            this.pendingAction = null
        }

        return true
        
      } catch (error: any) {
        alert(error.message)
        return false
      }
    },  

    async checkUser() {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        this.user = data.user
        this.isLoggedIn = true
        this.isVerified = !!data.user.email_confirmed_at
      }
    },

    async logout() {
      await supabase.auth.signOut()

      this.user = null
      this.isLoggedIn = false
      this.isVerified = false
      this.pendingAction = null

      const cart = useCartStore()
      cart.clearCart()
    },



    openLoginModal(action?: () => void) {
      if (action) this.pendingAction = action
      if (this.loginModalRef) this.loginModalRef.open()
      this.showLoginModal = true
    },

    async forgotPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email)

        if (error) {
            alert(error.message)
        } else {
            alert('Correo de recuperación enviado.')
        }
    },

    forgotUsername() {
        alert('Por favor contacta soporte para recuperar tu')
    }
  }
})

