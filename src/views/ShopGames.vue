<template>
  <div class="games-wrapper">
    <h1 class="games-title">Juegos</h1>

    <!-- FILTRO -->
    <div class="platform-filter">
      <button
        v-for="p in platforms"
        :key="p"
        :class="{ active: selectedPlatform === p }"
        @click="selectedPlatform = p"
      >
        {{ p }}
      </button>
    </div>

    <!-- GRID -->
    <transition-group name="fade" tag="div" class="games-grid">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        class="game-card"
      >
        <img :src="game.image" />
        <h3>{{ game.title }}</h3>
        <span class="price">${{ game.price }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import gamesData from '@/data/gamesCatalog.json'

interface Game {
  id: number
  title: string
  platform: string
  price: number
  image: string
}

const games = gamesData as Game[]

const platforms = ['Todos', 'PS5', 'Xbox', 'Nintendo', 'PC']
const selectedPlatform = ref('Todos')

const filteredGames = computed(() =>
  selectedPlatform.value === 'Todos'
    ? games
    : games.filter(g => g.platform === selectedPlatform.value)
)
</script>

<style scoped>
.games-wrapper {
  padding: 60px 20px;
  background: #0a0a1f;
  color: white;
}

.games-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 40px;
  text-shadow: 0 0 15px #7f5cff;
}

/* FILTRO */
.platform-filter {
  text-align: center;
  margin-bottom: 40px;
}

.platform-filter button {
  margin: 0 10px;
  padding: 10px 20px;
  border: 2px solid #7f5cff;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.platform-filter button.active,
.platform-filter button:hover {
  background: #7f5cff;
  box-shadow: 0 0 15px #7f5cff;
}

/* GRID */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.game-card {
  background: #111127;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: 0.3s;
  border: 1px solid rgba(127,92,255,0.3);
}

.game-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 20px #7f5cff;
}

.price {
  display: block;
  margin-top: 10px;
  color: #ff00ff;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>