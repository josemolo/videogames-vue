<template>
  <div class="shop-wrapper">
    <section class="shop">
        <h1 class="section-title">Tienda</h1>

        <div class="shop-grid">

            <div class="shop-card" @click="goTo('/tienda/consolas')">
                <img src="/images/consolas.png" alt="Consolas">
                <div class="overlay">
                <h2>Consolas</h2>
                </div>
            </div>

            <div class="shop-card" @click="goTo('/tienda/juegos')">
                <img src="/images/gameses.png" alt="Juegos">
                <div class="overlay">
                <h2>Juegos</h2>
                </div>
            </div>

            <div class="shop-card" @click="goTo('/tienda/articulos')">
                <img src="/images/articles.png" alt="Artículos">
                <div class="overlay">
                <h2>Artículos</h2>
                </div>
            </div>

        </div>
        <router-view/>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import gamesData from '@/data/gamesCatalog.json'
import consolesData from '@/data/consoles.json'
import articlesData from '@/data/articles.json'


const router = useRouter()

const gamesCount = gamesData.length
const consolesCount = consolesData.length
const articlesCount = articlesData.length

function goTo(path: string) {
  router.push(path)
}
</script>

<style scoped>
.shop-wrapper {
  min-height: 100vh;
  background: #0a0a1f;
  padding: 60px 20px;
  text-align: center;
  color: white;
}
/*
.shop-title {
  font-size: 3rem;
  margin-bottom: 60px;
  letter-spacing: 3px;
  background: linear-gradient(90deg, #7f5cff, #ff00ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}*/

.section-title {
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  font-size: clamp(2.8rem, 6vw, 4rem);
  font-weight: 900;
  margin-bottom: 70px;
  letter-spacing: 4px;
  text-transform: uppercase;

  background: linear-gradient(90deg, #7f5cff, #00e0ff, #7a48b1);
  background-size: 500% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: neonFlow 60s ease infinite;
  position: relative;

  text-shadow:
    0 0 10px rgba(127, 92, 255, 0.224),
    0 0 20px rgba(255, 0, 255, 0.313),
    0 0 40px rgba(127, 92, 255, 0.4);
}



.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.shop-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s ease;
  border: 2px solid rgba(127,92,255,0.3);
}

.shop-card img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  filter: brightness(0.7);
  transition: 0.4s ease;
}

.shop-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 20px #7f5cff, 0 0 40px #8400ffb9;
}

.shop-card:hover img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
}

.overlay h2 {
  font-size: 2rem;
  text-shadow: 0 0 10px #7f5cff;
}

@keyframes neonFlow {
  500% { background-position: 500% }
  100% { background-position: 150% }
}
</style>