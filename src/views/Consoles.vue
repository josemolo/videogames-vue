<template>
  <div class="full-window">
    <div class="window consoles">
      <h1>Consolas y Artículos</h1>

      <!-- Fila superior -->
      <div class="row">
        <div v-for="console in consoles.slice(0,3)" :key="console.id" class="console-card">
          <img :src="console.image" :alt="console.name" class="console-img"/>
          <h3>{{ console.name }}</h3>
          <p>{{ console.description }}</p>
        </div>
      </div>

      <!-- Fila central -->
      <div class="row">
        <div v-for="console in consoles.slice(3,6)" :key="console.id" class="console-card">
          <img :src="console.image" :alt="console.name" class="console-img"/>
          <h3>{{ console.name }}</h3>
          <p>{{ console.description }}</p>
        </div>
      </div>

      <!-- Fila inferior -->
      <div class="row">
        <div v-for="console in consoles.slice(6,9)" :key="console.id" class="console-card">
          <img :src="console.image" :alt="console.name" class="console-img"/>
          <h3>{{ console.name }}</h3>
          <p>{{ console.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ConsoleItem {
  id: number
  name: string
  description: string
  image: string
}

const consoles = ref<ConsoleItem[]>([
  { id: 1, name: 'Nintendo Switch', description: 'Consola híbrida portátil y de hogar.', image: '/images/switch.png' },
  { id: 2, name: 'PlayStation 5', description: 'Alta potencia y gráficos de última generación.', image: '/images/ps5.png' },
  { id: 3, name: 'Xbox Series X', description: 'Gran rendimiento y catálogo de juegos.', image: '/images/xboxx.png' },
  { id: 4, name: 'Xbox Series S', description: 'Versión más económica y compacta.', image: '/images/xboxs.png' },
  { id: 5, name: 'PlayStation 4', description: 'Gran catálogo de juegos y accesorios.', image: '/images/ps4.png' },
  { id: 6, name: 'Nintendo 3DS', description: 'Portátil clásico con pantallas 3D.', image: '/images/3ds.png' },
  { id: 7, name: 'Steam Deck', description: 'PC portátil para juegos de Steam.', image: '/images/steamdeck.png' },
  { id: 8, name: 'Oculus Quest 2', description: 'Realidad virtual todo en uno.', image: '/images/oculus.png' },
  { id: 9, name: 'Atari VCS', description: 'Consola retro con juegos clásicos.', image: '/images/atari.png' },
])
</script>

<style scoped>
.full-window {
  width: 100vw;
  min-height: calc(100vh - 60px); /* ajustado para navbar */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #0a0a1f;
  padding: 20px;
  box-sizing: border-box;
}

.window {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #1c1c2f;
  border: 3px solid #bf97ea;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  box-shadow: 0 0 20px #bf97ea, 0 0 40px #6d307a;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  overflow-y: auto;
}

.window h1 {
  text-align: center;
  color: #bf97ea;
  text-shadow: 0 0 12px #bf97ea, 0 0 25px #6d307a;
  margin-bottom: 30px;
}

.row {
  display: flex;
  justify-content: space-around;
  gap: 30px;
  margin-bottom: 30px;
}

.console-card {
  background: #111127;
  border: 2px solid #6d307a;
  border-radius: 15px;
  padding: 20px;
  flex: 1;
  max-width: 30%;
  min-height: 250px;
  text-align: center;
  box-shadow: 0 0 15px #bf97ea, 0 0 30px #6d307a;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.console-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px #bf97ea, 0 0 45px #6d307a;
}

.console-img:hover {
  transform: scale(1.15); /* agranda la imagen */
  box-shadow: 0 0 20px #00ffff, 0 0 40px #6d307a;
}

.console-img {
  width: 120px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #6d307a;
  transition: transform 0.3s, box-shadow 0.3s;
}

.console-card h3 {
  color: #00ffff;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.console-card p {
  font-size: 1rem;
  color: #ccc;
}

.console-content {
  background: #1a1a2f;
  border-radius: 10px;
  width: 100%;
  height: 100%; /* ocupa toda la altura del console-card */
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around; /* distribuye uniformemente imagen, título y descripción */
  box-sizing: border-box;
  box-shadow: inset 0 0 10px #6d307a, inset 0 0 20px #bf97ea;
  transition: transform 0.3s, box-shadow 0.3s;
}

</style>

