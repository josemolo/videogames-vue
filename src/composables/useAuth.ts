// src/composables/useAuth.ts
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const user = ref<any>(null)   // Estado global del usuario logueado

export function useAuth() {

  // 🔹 Registrar usuario
  async function register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error

    user.value = data.user
    return data
  }

  // 🔹 Login
  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    user.value = data.user
    return data
  }

  // 🔹 Logout
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  // 🔹 Guardar lead
  async function guardarLead(nombre: string, email: string, telefono: string, acepto_marketing: boolean) {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ nombre, email, telefono, acepto_marketing }])

    if (error) throw error
    return data
  }

  // 🔹 Obtener usuario actual (persistente)
  async function getUser() {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
    return currentUser
  }

  return { register, login, logout, guardarLead, getUser, user }
}
