<template>
  <div class="full-window">
    <div class="window consoles">
      <h1>Consolas / Artículos / Juegos</h1>

      <!-- ================= Fila superior ================= -->
      <div class="row">
        <!-- Skeleton -->
        <template v-if="loading">
          <div
            v-for="n in 3"
            :key="'skeleton-top-' + n"
            class="console-card skeleton"
          >
            <div class="skeleton-img shimmer"></div>
            <div class="skeleton-title shimmer"></div>
            <div class="skeleton-text shimmer"></div>
          </div>
        </template>

        <!-- Contenido real -->
        <template v-else>
          <div
            v-for="console in consoles.slice(0, 3)"
            :key="console.id"
            class="console-card"
            ref="cards"
            @click="abrirConsola(console.name)"
          >
            <img :src="console.image" :alt="console.name" class="console-img blur-up" loading="lazy"  @load="onImageLoad"/>
            <h3>{{ console.name }}</h3>
            <p>{{ console.description }}</p>
          </div>
        </template>
      </div>

      <!-- ================= Fila central ================= -->
      <div class="row">
        <template v-if="loading">
          <div
            v-for="n in 3"
            :key="'skeleton-mid-' + n"
            class="console-card skeleton"
          >
            <div class="skeleton-img shimmer"></div>
            <div class="skeleton-title shimmer"></div>
            <div class="skeleton-text shimmer"></div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="console in consoles.slice(3, 6)"
            :key="console.id"
            class="console-card"
            ref="cards"
            @click="abrirConsola(console.name)"
          >
            <img :src="console.image" :alt="console.name" class="console-img" />
            <h3>{{ console.name }}</h3>
            <p>{{ console.description }}</p>
          </div>
        </template>
      </div>

      <!-- ================= Fila inferior ================= -->
      <div class="row">
        <template v-if="loading">
          <div
            v-for="n in 3"
            :key="'skeleton-bottom-' + n"
            class="console-card skeleton"
          >
            <div class="skeleton-img shimmer"></div>
            <div class="skeleton-title shimmer"></div>
            <div class="skeleton-text shimmer"></div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="console in consoles.slice(6, 9)"
            :key="console.id"
            class="console-card"
            ref="cards"
            @click="abrirConsola(console.name)"
          >
            <img :src="console.image" :alt="console.name" class="console-img" />
            <h3>{{ console.name }}</h3>
            <p>{{ console.description }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConsoleDetailPreload } from '@/composables/useConsoleDetailPreload'
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { useRouteMetrics } from '@/composables/useRouteMetrics'

const loading = ref(true)

const router = useRouter()
const cards = ref<HTMLElement[]>([])
const { observe } = useConsoleDetailPreload()

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

function abrirConsola(name: string) {
  if (name === "Nintendo Switch") {
    // Aquí puedes abrir una URL externa
    router.push('/console/nintendo');
  } else if (name === "PlayStation 5") {
    window.open("/ps5", "_blank", "width=800,height=600");
  } else if (name === "Xbox Series X") {
    window.open("/xbox", "_blank", "width=800,height=600");
  } else {
    // Por defecto, solo mostrar mensaje
    alert(`Seleccionaste ${name}`);
  }
}

function onImageLoad(e: Event) {
  const img = e.target as HTMLImageElement
  img.classList.add('loaded')
}

useHead({
  title: 'Consolas | VortexGames',
  meta: [
    {
      name: 'description',
      content: 'Explora consolas clásicas y modernas: PlayStation, Xbox, Nintendo y más.'
    },
    { property: 'og:title', content: 'Consolas | VortexGames' },
    {
      property: 'og:description',
      content: 'Información, detalles y catálogo de consolas de videojuegos.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og/consoles.png' }
  ]
})

onMounted(() => {
  cards.value.forEach(card => observe(card))

  // Simula carga real (API / lazy)
  setTimeout(() => {
    loading.value = false
  }, 600)
})

useRouteMetrics()
</script>

<style scoped>
.full-window {
  width: 100%;
  min-height: calc(100vh - 60px); /* ajustado para navbar */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #0a0a1f;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
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
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.console-card {
  background: #111127;
  border: 2px solid #6d307a;
  border-radius: 15px;
  padding: 20px;

  flex: 1 1 280px;
  max-width: 350px;
  width: 100%;

  min-height: 250px;
  text-align: center;

  box-shadow: 0 0 15px #bf97ea, 0 0 30px #6d307a;
  transition: 0.3s;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
  transform: translateY(20px) scale(0.96);
  animation: cardFadeIn 0.6s ease-out forwards;
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

/* Stagger automático */
.console-card:nth-child(1) { animation-delay: 0.05s; }
.console-card:nth-child(2) { animation-delay: 0.12s; }
.console-card:nth-child(3) { animation-delay: 0.18s; }

button.buy, button.back {
  padding: 10px 20px;
  border: 2px solid #00ffff;
  border-radius: 12px;
  background: transparent;
  color: #00ffff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #6d307a;
}

button.buy:hover {
  box-shadow: 0 0 20px #00ffff, 0 0 40px #6d307a;
  transform: translateY(-3px);
}

button.back:hover {
  box-shadow: 0 0 15px #bf97ea, 0 0 30px #6d307a;
  transform: translateY(-2px);
}

/* Glow en títulos */
h1, h2, h3 {
  text-shadow: 0 0 8px #00ffff, 0 0 15px #6d307a;
}

.skeleton {
  pointer-events: none;
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
}

.skeleton-img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background: #1f1f3d;
  margin-bottom: 15px;
}

.skeleton-title {
  width: 70%;
  height: 18px;
  border-radius: 6px;
  background: #1f1f3d;
  margin-bottom: 10px;
}

.skeleton-text {
  width: 90%;
  height: 14px;
  border-radius: 6px;
  background: #1f1f3d;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(191, 151, 234, 0.35),
    transparent
  );
  animation: shimmer 1.2s infinite;
}

.blur-up {
  filter: blur(12px);
  transform: scale(1.05);
  transition:
    filter 0.6s ease,
    transform 0.6s ease;
}

.blur-up.loaded {
  filter: blur(0);
  transform: scale(1);
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes cardFadeIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 900px) {
  .window {
    padding: 20px 15px;
  }

  .row {
    gap: 20px;
  }
}

</style>


