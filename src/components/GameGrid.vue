<template>
  <ScrollReveal>
    <section class="gaming-section">
      <h2>🔥 Juegos Populares</h2>

      <div class="grid">
        <div v-for="g in games" :key="g.id" class="card">
          <img :src="g.image" />
          <h3>{{ g.title }}</h3>
          <span>{{ g.platform }}</span>
          <p>${{ g.price }}</p>

          <button @click="cart.add(g)">Agregar</button>
          <button class="fav" @click="fav.toggle(g)">❤️</button>
        </div>
      </div>
    </section>
  </ScrollReveal>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import ScrollReveal from './ScrollReveal.vue'

const cart = useCartStore()
const fav = useFavoritesStore()

const games = [
  { id:1, title:'Cyber Quest', platform:'PS5', price:59.99, image:'https://via.placeholder.com/300x400' },
  { id:2, title:'Neon Racer', platform:'PC', price:39.99, image:'https://via.placeholder.com/300x400' },
  { id:3, title:'Shadow Arena', platform:'Xbox', price:49.99, image:'https://via.placeholder.com/300x400' }
]
</script>

<style scoped>
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem}
.card{background:#111;padding:1rem;border-radius:16px;transition:.3s}
.card:hover{transform:translateY(-8px)}
img{width:100%;border-radius:12px}
button{margin-top:.5rem;width:100%}
.fav{background:none}
</style>
