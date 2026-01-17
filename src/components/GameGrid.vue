<template>
  <ScrollReveal>
    <section class="gaming-section">
      <h2>🔥 Juegos Populares</h2>

      <div class="grid">
        <Card 
          v-for="(g, index) in games" 
          :key="g.id" 
          :title="g.title" 
          :description="g.platform" 
          :image="g.image"
          :price="g.price"  
          :style="getCardAnimationStyle(index)"
          @buy="() => { cart.add(g); console.log(cart.items) }"
          class="card"
        />
      </div>
    </section>
  </ScrollReveal>
</template> 

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import ScrollReveal from './ScrollReveal.vue'
import Card from './Card.vue'

const cart = useCartStore()
const fav = useFavoritesStore()
const hoverIndex = ref(null)


const games = [
  { id:1, title:'Cyber Quest', platform:'PS5', price:59.99, image:'https://via.placeholder.com/300x400' },
  { id:2, title:'Neon Racer', platform:'PC', price:39.99, image:'https://via.placeholder.com/300x400' },
  { id:3, title:'Shadow Arena', platform:'Xbox', price:49.99, image:'https://via.placeholder.com/300x400' }
]


function getCardAnimationStyle(index) {
  return {
    animation: `fadeInUp 0.5s ease forwards`,
    animationDelay: `${index * 0.15}s`
  }
}
</script>

<style scoped>
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:2rem
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card{
  background:#111;
  padding:1rem;
  border-radius:16px;
  opacity: 0; /* Start hidden, appear with animation */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover{
  transform:translateY(-8px) scale(1.05);
  box-shadow: 0 0 20px rgba(127,92,255,0.6);
}

img{width:100%;border-radius:12px}

button{margin-top:.5rem;width:100%}

.fav{background:none}
</style>
