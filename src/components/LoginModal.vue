<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2>Login</h2>
      <input placeholder="Email" />
      <input type="password" placeholder="Contraseña" />
      <button>Entrar</button>
    </div>
  </div>
</template>

<style scoped>
.overlay{position:fixed;inset:0;background:#000a;display:flex;align-items:center;justify-content:center}
.modal{background:#141414;padding:2rem;border-radius:16px;width:300px}
input,button{width:100%;margin-top:10px;padding:10px}
</style>

