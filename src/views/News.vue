<template>
  <div class="window news">
    <h1>Noticias de Videojuegos</h1>
    <ul>
      <li v-for="newsItem in news" :key="newsItem.id" class="news-item">
        <h3>{{ newsItem.title }}</h3>
        <p>{{ newsItem.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const news = ref([
  { id: 1, title: 'Nuevo DLC de Zelda', content: 'Explora nuevas tierras y aventuras épicas en Hyrule.' },
  { id: 2, title: 'Mario Kart 9 anunciado', content: 'Prepárate para nuevas pistas, personajes y modos online.' },
  { id: 3, title: 'Minecraft actualiza mobs', content: 'Nuevos mobs y biomas para explorar y construir.' },
])
</script>

<style scoped>
.window {
  background: #1c1c2f;
  border: 3px solid #bf97ea;
  border-radius: 15px;
  padding: 30px;
  width: 500px;
  margin: 20px auto;
  box-shadow: 0 0 20px #bf97ea, 0 0 40px #6d307a;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
}

.window h1 {
  text-align: center;
  color: #bf97ea;
  text-shadow: 0 0 10px #bf97ea, 0 0 20px #6d307a;
  margin-bottom: 20px;
}

.news-item {
  border-bottom: 1px solid #6d307a;
  padding: 10px 0;
}

.news-item h3 {
  color: #00ffff;
  margin-bottom: 5px;
}

.news-item p {
  font-size: 0.9rem;
  color: #ccc;
}
</style>
