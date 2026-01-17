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
    <p class="card-price" v-if="price !== undefined">{{ price }}</p>
    <p class="card-price" v-else>Precio no disponible</p>

    <!--
    <button @click="$emit('buy')">Agregar</button>
    -->

    <!--
    <button @click="handleBuy">
      {{ added ? '✔ Agregado' : 'Agregar' }}
    </button>
    -->

    <button v-if="button" @click="$emit('buy')">{{ button }}</button>
    <slot></slot>
  
  </article>
</template>

<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'

//let observer: IntersectionObserver | null = null

const cardRef = ref(null)


const added = ref(false)

const handleBuy = () => {
  added.value = true
  emit('buy')

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

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0 
  },
  /*
  desc: String,
  img: String,
  button: String
  */
  button: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'buy'): void
}>()
</script>

<style scoped>
.card {
  background: #111;
  border-radius: 14px;
  padding: 1rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: 
    all 0.6s ease,
    transform 0.6s ease,
    box-shadow 0.5s ease,
    opacity 0.6s ease;
  opacity: 0;
  transform: translateY(20px) scale(0.97);
  will-change: transform, opacity;
}

.card.reveal-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/*animation: fadeInUp 0.6s ease forwards;*/

/*
.card.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
*/

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
  transition: background-color 0.3s ease, transform 0.2s ease;
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
