<template>
  <div class="full-window">
    <div class="window consoles">
      <h1>Consolas / Juegos / Artículos</h1>

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
            @click="abrirConsola(console.id)"
          >
            <img :src="console.image" :alt="console.name" class="console-img" loading="lazy"  @load="onImageLoad"/>
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
            @click="abrirConsola(console.id)"
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
            @click="abrirConsola(console.id)"
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
  id: string
  name: string
  description: string
  image: string
}

const consoles = ref<ConsoleItem[]>([
  { id: 'nintendo', name: 'Nintendo Switch', description: 'Híbrida portátil', image: '/images/switch.png' },
  { id: 'play5', name: 'PlayStation 5', description: 'Alta potencia realista', image: '/images/ps5.png' },
  { id: 'xboxx', name: 'Xbox X', description: 'Experiencia gráfica', image: '/images/xboxx.png' },
  { id: 'xboxs', name: 'Xbox S', description: 'Versión económica compacta', image: '/images/xboxs.png' },
  { id: 'play4', name: 'PlayStation 4', description: 'Gran catálogo digital', image: '/images/ps4.png' },
  { id: 'ds', name: 'Nintendo 3DS', description: 'Clásico pantallas 3D', image: '/images/ds.png' },
  /*{ id: 7, name: 'Steam Deck', description: 'PC portátil para juegos de Steam.', image: '/images/steamdeck.png' },
  { id: 8, name: 'Oculus Quest 2', description: 'Realidad virtual todo en uno.', image: '/images/oculus.png' },
  { id: 9, name: 'Atari VCS', description: 'Consola retro con juegos clásicos.', image: '/images/atari.png' },*/
])

function abrirConsola(id: string) {
  router.push(`/console/${id}`)
  /*
  if (id === "Nintendo Switch") {
    // Aquí puedes abrir una URL externa
    router.push(`/console/${id}`);
  } else if (id === "PlayStation 5") {
    window.open("/ps5", "_blank", "width=800,height=600");
  } else if (id) {
    window.open("/xbox", "_blank", "width=800,height=600");
  } else {
    // Por defecto, solo mostrar mensaje
    alert(`Seleccionaste ${name}`);
  }*/
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
  background: #d4af3715;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.window {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #ffffff23;
  border: 3px solid #897637a0;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 30px;
  box-shadow: 0 0 20px #7a7a7a, 0 0 40px #a9a0457d;
  font-family: 'Orbitron', sans-serif;
  color: #f5faaa6b;
  overflow-y: auto;
}

.window h1 {
  text-align: center;
  color: #efefefc0;
  text-shadow: 0 0 12px #ffd500b5, 0 0 25px #ffd5004a;
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
  background: #77734f00;
  border: 2px solid #cfc18188;
  border-radius: 15px;
  padding: 20px;

  flex: 1 1 280px;
  max-width: 350px;
  width: 100%;

  min-height: 250px;
  text-align: center;

  box-shadow: 0 0 15px #d7c677a5, 0 0 30px #757575;
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
  box-shadow: 0 0 25px #5d5d5dd0, 0 0 45px #bcb756ad;
}

.console-img:hover {
  transform: scale(1.15); /* agranda la imagen */
  box-shadow: 0 0 20px #5d5d5dd0, 0 0 40px #bcb756ad;
}

.console-img {
  width: 140px;
  height: 140px;
  object-fit: contain; /* mantiene proporción */
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px #d7c677a5, 0 0 20px #757575;
  transition: transform 0.3s, box-shadow 0.3s;
}

.console-card h3 {
  color: #dcd5ba;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.console-card p {
  font-size: 1rem;
  color: #d1c890ef;
}

.console-content {
  background: #f0ebaf7c;
  border-radius: 10px;
  width: 100%;
  height: 100%; /* ocupa toda la altura del console-card */
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around; /* distribuye uniformemente imagen, título y descripción */
  box-sizing: border-box;
  box-shadow: inset 0 0 10px #f3f99c74, inset 0 0 20px #f9ff9066;
  transition: transform 0.3s, box-shadow 0.3s;
}

/* Stagger automático */
.console-card:nth-child(1) { animation-delay: 0.05s; }
.console-card:nth-child(2) { animation-delay: 0.12s; }
.console-card:nth-child(3) { animation-delay: 0.18s; }

button.buy, button.back {
  padding: 10px 20px;
  border: 2px solid #e6f19150;
  border-radius: 12px;
  background: transparent;
  color: #fdff9b8c;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #e7eb9973, 0 0 20px #deda7385;
}

button.buy:hover {
  box-shadow: 0 0 20px #eff48399, 0 0 40px #dde66599;
  transform: translateY(-3px);
}

button.back:hover {
  box-shadow: 0 0 15px #e2f16a8d, 0 0 30px #f4f47969;
  transform: translateY(-2px);
}

/* Glow en títulos */
h1, h2, h3 {
  text-shadow: 0 0 8px #d4c9a58c, 0 0 15px #cec2847e;
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
  background: #eef1827b;
  margin-bottom: 15px;
}

.skeleton-title {
  width: 70%;
  height: 18px;
  border-radius: 6px;
  background: #fcf68565;
  margin-bottom: 10px;
}

.skeleton-text {
  width: 90%;
  height: 14px;
  border-radius: 6px;
  background: #faff9377;
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
    rgba(255, 253, 135, 0.514),
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

@media (max-width: 600px) {
  .full-window {
    padding: 10px;
  }  

  .window {
    padding: 15px 10px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

   .console-card {
    width: 100%;
    max-width: 100%;
    flex: unset;
    padding: 12px;
    min-height: 190px;
    
    /*aspect-ratio: 1 / 1.2;
    justify-content: center;*/
  }

  .console-img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    /*margin-bottom: 8px;*/
  }

  .console-card h3 {
    font-size: 0.95rem;
    /*margin-bottom: 6px;*/
  }

  .console-card p {
    font-size: 0.8rem;
    /*line-height: 1.2;*/
  }
}

</style>

