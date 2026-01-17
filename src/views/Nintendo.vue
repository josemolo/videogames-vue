<template>
  <div class="full-window">
    <div class="window nintendo">

      <h1>Nintendo Switch</h1>

      <div class="content">
        <!-- Imagen -->
        <div class="image-section">
          <img src="/images/switch.png" alt="Nintendo Switch" />
        </div>

        <!-- Información -->
        <div class="info-section">
          <h2>Consola híbrida</h2>
          <p>
            Nintendo Switch te permite jugar donde quieras, cuando quieras.
            Disfruta de juegos exclusivos como Zelda, Mario y Pokémon,
            tanto en modo portátil como en tu TV.
          </p>

          <ul>
            <li>🎮 Modo portátil y de sobremesa</li>
            <li>🧩 Joy-Con desmontables</li>
            <li>🕹️ Multijugador local y online</li>
            <li>📦 Gran catálogo de juegos exclusivos</li>
          </ul>

          <div class="buttons">
            <button class="buy">Consultar disponibilidad</button>
            <button class="back" @click="volver">Volver a consolas</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()

function volver() {
  router.push('/consoles')
}

useHead({
  title: 'Nintendo | VortexGames',
  meta: [
    {
      name: 'description',
      content: 'Todo sobre Nintendo: juegos, consolas, lanzamientos y noticias.'
    },
    { property: 'og:title', content: 'Nintendo | VortexGames' },
    {
      property: 'og:description',
      content: 'Explora el universo Nintendo en VortexGames.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og/nintendo.png' }
  ]
})
</script>

<style scoped>
.full-window {
  width: 100vw;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #0a0a1f;
  padding: 20px;
  box-sizing: border-box;
}

.window {
  background: #1c1c2f;
  border: 3px solid #bf97ea;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  box-shadow: 0 0 20px #bf97ea, 0 0 40px #6d307a;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
}

.window h1 {
  text-align: center;
  color: #00ffff;
  text-shadow: 0 0 12px #00ffff, 0 0 25px #6d307a;
  margin-bottom: 40px;
}

.content {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

/* Imagen */
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-section img {
  width: 280px;
  border-radius: 15px;
  box-shadow: 0 0 20px #00ffff, 0 0 40px #6d307a;
  transition: transform 0.3s;
}

.image-section img:hover {
  transform: scale(1.1);
}

/* Info */
.info-section {
  flex: 2;
  background: #111127;
  border-radius: 15px;
  padding: 25px;
  box-shadow: inset 0 0 10px #6d307a, inset 0 0 20px #bf97ea;
}

.info-section h2 {
  color: #bf97ea;
  margin-bottom: 15px;
}

.info-section p {
  color: #ccc;
  margin-bottom: 20px;
  line-height: 1.6;
}

.info-section ul {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
}

.info-section li {
  margin-bottom: 10px;
  color: #00ffff;
}

/* Botones */
.buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

button {
  padding: 12px 20px;
  border-radius: 25px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.3s;
  border: none;
}

.buy {
  background: #00ffff;
  color: #000;
  box-shadow: 0 0 15px #00ffff;
}

.buy:hover {
  box-shadow: 0 0 25px #00ffff, 0 0 45px #6d307a;
}

.back {
  background: transparent;
  color: #bf97ea;
  border: 2px solid #bf97ea;
}

.back:hover {
  background: #bf97ea;
  color: #000;
}
</style>
