<template>
  <div class="articles-wrapper">
    <h1 class="articles-title">Artículos</h1>

    <div class="articles-grid">
      <div v-for="item in articles" :key="item.id" class="glass-card">
        <img :src="item.image" />
        <h3>{{ item.title }}</h3>
        <span>${{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import articlesData from '@/data/articles.json'

interface Article {
  id: number
  title: string
  price: number
  image: string
}

const articles = articlesData as Article[]
</script>

<style scoped>
.articles-wrapper {
  padding: 60px 20px;
  background: linear-gradient(135deg, #0a0a1f, #14143a);
  color: white;
}

.articles-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 50px;
  letter-spacing: 3px;
}

/* GLASS */
.glass-card {
  backdrop-filter: blur(15px);
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.1);
  transition: 0.3s;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 20px rgba(127,92,255,0.6);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}
</style>