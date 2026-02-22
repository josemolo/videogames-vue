<template>
  <article ref="cardRef" class="card" v-reveal>
    <img
      class="card-image"
      :src="image"
      :alt="title"
      loading="lazy"
    />

    <h3 class="card-title">{{ title }}</h3>
    <p class="card-text">{{ description }}</p>
    <!--
    <p class="card-price" v-if="price !== undefined">${{ price.toFixed(2) }}</p>
    <p class="card-price" v-else>Precio no disponible</p>
    -->
    <!--
    <p class="card-price">${{ price.toFixed(2) }}</p>
    -->
    <p class="card-price" v-if="price !== undefined">₡{{ price }}</p>
    <p class="card-price" v-else></p>

    <!--
    <button @click="$emit('buy')">Agregar</button>
    -->

    <!--
    <button @click="handleBuy">
      {{ added ? '✔ Agregado' : 'Ver' }}
    </button>
    -->

     <!-- PRODUCTO / JUEGO -->
   <button
      v-if="variant === 'product' || variant === 'game'"
      :disabled="stock === 0"
      @click="handleBuy"
    >
      {{ added ? '✔ Agregado' : 'Agregar al carrito' }}
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
    

    <!--<button v-if="button" @click="$emit('add-to-cart')">{{ button }}</button>-->
  
  </article>
</template>

<script setup lang="ts">

import { ref } from 'vue'  //onMounted, onBeforeUnmount
//import { useRouter } from 'vue-router'

//import { useUserStore } from '@/stores/user'
//import { useCartStore } from '@/stores/cart'

//const router = useRouter()
//const user = useUserStore()

/* =====================
   PROPS
===================== */
const props = defineProps<{
  id: number
  title: string
  description: string
  image: string
  price?: number
  variant: 'product' | 'game' | 'news'
  stock?: number
  /*button?: string*/
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
const added = ref(false)
//const cardRef = ref<HTMLElement | null>(null)

/* =====================
   ACTIONS
===================== */
const handleBuy = () => {
  emit('buy')

  added.value = true
  setTimeout(() => {
    added.value = false
  }, 800)
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
.card {
  background: #111;
  border-radius: 14px;
  padding: 1rem;
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.6s ease;
    /*transform 0.6s ease,
    box-shadow 0.5s ease,
    opacity 0.6s ease;
  opacity: 0;
  transform: translateY(20px) scale(0.97);
  will-change: transform, opacity;*/
}

.card.reveal-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Estado inicial */
.reveal-hidden {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
  /*pointer-events: none;    🔥 bloquea mientras está oculto */
}

/* Estado visible */
.reveal-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  /*pointer-events: auto;   /* 🔥 vuelve a permitir clicks */
}

/*animation: fadeInUp 0.6s ease forwards;*/

/*
.card.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
*/

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 0 25px rgba(127,92,255,0.6), 0 0 60px rgba(127,92,255,0.25);
  filter: drop-shadow(0 0 12px rgba(127,92,255,0.6));
}

.card::before {
  content: "";
  position: absolute;
  inset: -50%;
  background: radial-gradient(
    circle,
    rgba(127,92,255,0.25),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;   /* 🔥 ESTA ES LA CLAVE */
}

.card:hover::before {
  opacity: 1;
}

.card-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 0.8rem;

  transform: scale(1.15) translateY(-6px);
  opacity: 1;
  transition: 
    transform 0.8s ease,
    opacity 0.6s ease,
    filter 0.4s ease;
  
  box-shadow:
    0 10px 25px rgba(127,92,255,0.35),
    0 0 35px rgba(127,92,255,0.25);
}
/*
filter: blur(0px);
*/

/*
.card-image[src] {
  filter: blur(0);
}
*/

.card-title {
  margin: 0.5rem 0;
}

.card-text {
  font-size: 0.9rem;
  opacity: 0.85;
}


button {
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  border: none;
  background: linear-gradient(45deg,#7f5cff,#503ec2);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  /*transition: background-color 0.3s ease, transform 0.2s ease;*/
}

button:hover {
  background: linear-gradient(45deg,#5a3bcc,#381f9d);
  transform: translateY(-2px);
}


button:active {
  transform: scale(0.95);
}

.card button {
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  border: none;
  background: linear-gradient(45deg,#7f5cff,#503ec2);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  z-index: 2;
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

@keyframes cardEnter {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card:nth-child(1) { animation-delay: 0.1s }
.card:nth-child(2) { animation-delay: 0.2s }
.card:nth-child(3) { animation-delay: 0.3s }
.card:nth-child(4) { animation-delay: 0.4s }

.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.6s ease;
}

.card-price {
  font-weight: bold;
  margin-top: 0.5rem;
  color: #7f5cff;
}

.testimonial-card {
   will-change: transform, opacity;
}

.news-card {
   will-change: transform, opacity;
}

</style>
