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

import { useCartStore } from '@/stores/cart'

interface Article {
  id: number
  title: string
  price: number
  image: string
}

const cartStore = useCartStore()

const articles = articlesData as Article[]

function addToCart(article: any) {
  cartStore.addItem({
    id: article.id.toString(),
    name: article.title,
    title: article.title,
    price: Number(article.price),
    image: article.image,
    stock: 10,
    type: 'article',
  
  })
}
</script>

<style scoped>
.articles-wrapper { padding: 60px 20px; background: linear-gradient(135deg, #7873644d, #b4a35f25); color: rgb(255, 251, 212); }

.articles-title { text-align: center; font-size: 3rem; margin-bottom: 50px; letter-spacing: 3px; }

/* GLASS */
.glass-card { backdrop-filter: blur(15px); background: rgb(173, 122, 12, 0.308); border-radius: 20px; padding: 25px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.511); transition: 0.3s; }

.glass-card:hover { transform: translateY(-8px); box-shadow: 0 0 20px rgb(255, 252, 203); }

.articles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
</style>