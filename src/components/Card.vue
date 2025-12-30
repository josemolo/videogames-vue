<template>
  <article ref="cardRef" class="card">
    <img
      class="card-image"
      :src="image"
      :alt="title"
      loading="lazy"
    />

    <h3 class="card-title">{{ title }}</h3>
    <p class="card-text">{{ description }}</p>
  </article>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const cardRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.15 }
  )

  observer.observe(cardRef.value)
})   

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
  desc: String,
  img: String,
  button: String
})
</script>

<style scoped>
.card {
  background: #111;
  border-radius: 12px;
  padding: 1rem;
  color: white;
  text-align: center;
  transition: 
    transform 0.6s ease,
    box-shadow 0.35s ease,
    opacity 0.6s ease;
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  animation: fadeInUp 0.6s ease forwards;
}

.card.show {
  opacity: 1;
  transform: translateY(0) scale(1);
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

.card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 0 25px rgba(127,92,255,0.6), 0 0 60px rgba(127,92,255,0.25);
  filter: drop-shadow(0 0 12px rgba(127,92,255,0.6));
}


.card-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 0.8rem;

  filter: blur(6px);
  transition: filter 0.4s ease;
}

.card-image[src] {
  filter: blur(0);
}

.card-title {
  margin: 0.5rem 0;
}

.card-text {
  font-size: 0.9rem;
  opacity: 0.85;
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


</style>
