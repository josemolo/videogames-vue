<template>
  <article ref="cardRef" class="card" :class="variant" v-reveal>
    <img
      class="card-image"
      :src="image"
      :alt="title"
      loading="lazy"
    />
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-text">{{ description }}</p>
    <p class="card-price" v-if="price !== undefined">₡{{ price }}</p>
    <p class="card-price" v-else></p>

     <!-- PRODUCTO / JUEGO -->
   <button
      v-if="variant === 'product' || variant === 'game'"
      class="add-cart"
      :class="{ added }" 
      :disabled="stock === 0"
      @click="handleBuy"
    >
      <span v-if="added">✔ Agregado</span>
      <span v-else>Agregar al carrito</span>
    </button>

    <!-- BOTÓN: NOTICIAS -->
    <button
      v-else-if="variant === 'news'"
      @click="$emit('view')"
    >
      Leer noticia
    </button>

    <!-- fallback por si no se pasa nada -->
    <button
      v-else
      @click="$emit('view')"
    >
      Ver
    </button>  
  </article>
</template>

<script setup lang="ts">
//import { ref } from 'vue'  //onMounted, onBeforeUnmount
//import { useRouter } from 'vue-router'

//import { useUserStore } from '@/stores/user'
//import { useCartStore } from '@/stores/cart'

//const router = useRouter()
//const user = useUserStore()

/* =====================
   PROPS
===================== */
const props = defineProps<{
  id: string | number
  title: string
  description?: string
  image: string
  price?: number
  variant: 'product' | 'game' | 'news'
  stock?: number
  added?: boolean
  /*button?: string*/
  onView?: () => any
}>()

/* =====================
   EMITS
===================== */
const emit = defineEmits<{
  (e: 'buy'): void
  (e: 'view'): void
}>()

/* =====================
   STATE
===================== */
//const cart = useCartStore()
/*const added = ref(false)*/
//const cardRef = ref<HTMLElement | null>(null)


/* =====================
   ACTIONS
===================== */
const handleBuy = () => {
  emit('buy')

  /*added.value = true
  setTimeout(() => {
    added.value = false
  }, 800)*/
}

//
//onMounted(() => {
//  observer = new IntersectionObserver(
//    ([entry]) => {
//      if (!entry) return
//
//      if (entry.isIntersecting) {
//        entry.target.classList.add('visible')
//        observer.unobserve(entry.target)
//      }
//    },
//    { threshold: 0.15 }
//  )
  
//  if (cardRef.value) {
//    observer.observe(cardRef.value)
//  }
//})   


//onBeforeUnmount(() => {
//  if (observer && cardRef.value) {
//    observer.unobserve(cardRef.value)
//    observer.disconnect()
//  }
//})

//cart.addToCart({
 // id: 1,
 // name: 'PlayStation 5',
 // price: 499,
//})

</script>

<style scoped>
.card { display: flex; flex-direction: column; background: #93791421; border-radius: 14px; padding: 1rem; color: rgb(255, 251, 238); text-align: center; position: relative; z-index: 1; overflow: hidden; transition: all 0.6s ease; }

.card.reveal-visible { opacity: 1; transform: translateY(0) scale(1); }

/* Estado inicial */
.reveal-hidden { opacity: 0; transform: translateY(20px) scale(0.97); }

/* Estado visible */
.reveal-visible { opacity: 1; transform: translateY(0) scale(1); }

.card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 0 25px rgba(255, 200, 0, 0.484), 0 0 60px rgba(255, 255, 255, 0); filter: drop-shadow(0 0 12px rgb(159, 159, 159)); }

.card::before { content: ""; position: absolute; inset: -50%; background: radial-gradient( circle, rgba(170, 154, 84, 0.05), transparent 70% ); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }

.card:hover::before { opacity: 1; }

.card-image { width: 100%; border-radius: 10px; margin-bottom: 0.8rem; transform: scale(1.15) translateY(-6px); opacity: 1; transition: transform 0.8s ease, opacity 0.6s ease, filter 0.4s ease; box-shadow: 0 10px 25px rgb(120, 106, 64), 0 0 35px rgb(140, 140, 140); }

.card-title { margin: 0.5rem 0; }

.card-text { font-size: 0.9rem; opacity: 0.85; }

button { margin-top: 1rem; padding: 0.6rem 1.4rem; border: none; background: linear-gradient(45deg,#f4e290,#f6da76); color: #eae08b; border-radius: 10px; cursor: pointer; }

button:hover { background: linear-gradient(45deg,#bcb74e,#b8a657); transform: translateY(-2px); }

button:active { transform: scale(0.95); }

.card button { margin-top: auto; padding: 0.6rem 1.4rem; border: none; background: linear-gradient(45deg,#ddc070,#ffd00064); color: #fffbe1; border-radius: 10px; cursor: pointer; pointer-events: auto; position: relative; z-index: 2; }

.card .add-cart.added { background: linear-gradient(45deg,#7cff7c,#00ffcc); box-shadow: 0 0 15px rgba(124,255,124,0.9), 0 0 30px rgba(0,255,204,0.9); animation: pulseAdd 0.6s ease; }

.add-cart.added:hover { background: linear-gradient(45deg,#7cff7c,#00ffcc); }

.product .card-price { margin-top: 0rem; }

.card:nth-child(1) { animation-delay: 0.1s }
.card:nth-child(2) { animation-delay: 0.2s }
.card:nth-child(3) { animation-delay: 0.3s }
.card:nth-child(4) { animation-delay: 0.4s }

.visible { opacity: 1; transform: translateY(0) scale(1); transition: all 0.6s ease; }

.card-price { font-weight: bold; color:#faf5d7; }

.testimonial-card { will-change: transform, opacity; }

.news-card { will-change: transform, opacity; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }

  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardEnter {
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
