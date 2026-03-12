<template>
  <div class="login-page">

    <form class="login-card" @submit.prevent="handleLogin">

      <h1>Panel LucyCell</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Correo"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />

      <button type="submit" :disabled="loading">

        <span v-if="!loading">
          Iniciar sesión
        </span>

        <span v-else class="spinner"></span>

      </button>

    </form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const email = ref('')
const password = ref('')
const loading = ref(false)

const router = useRouter()
const userStore = useUserStore()

async function handleLogin() {

  loading.value = true

  try {

    const success = await userStore.login(
      email.value,
      password.value
    )

    if (!success) {
      return /*{
      router.push('/admin')
    }*/
    }

   const user = userStore.user

   if (!user) {
    router.push('/')
    return
   }

   const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

   /*if (error) {
    console.error(error)
    router.push('/')
    return
   }  */
  
   if (profile?.role === 'admin') {
    router.push('/admin')
   } else {
    router.push('/')
   }
  
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.login-page{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
}

.login-card{

  background:#111;
  padding:2.5rem;
  border-radius:14px;

  display:flex;
  flex-direction:column;
  gap:1rem;

  width:90%;
  max-width:400px;

  box-shadow:0 0 25px rgba(255,217,0,0.15);

}

.login-card h1{
  text-align:center;
  color:#ffd900;
}

input{

  padding:0.9rem;
  border-radius:8px;
  border:none;

}

button{

  padding:0.9rem;
  border:none;
  border-radius:10px;

  background:linear-gradient(45deg,#ffd900,#BFA06D);
  font-weight:bold;

  cursor:pointer;
}

.spinner{
  width:18px;
  height:18px;
  border:3px solid rgba(255,255,255,0.3);
  border-top:3px solid white;
  border-radius:50%;
  display:inline-block;
  animation:spin 0.8s linear infinite;
}

@keyframes spin{
  to{transform:rotate(360deg);}
}

</style>  