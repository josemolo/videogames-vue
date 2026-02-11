<template>
  <main class="nintendo-page">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content"></div>
        <h1>{{ console.name }}</h1>
        <img :src="console.image" :alt="console.name" class="hero-image" />
        <p class="subtitle">{{ console.subtitle }}</p>

        <button class="cta" @click="consultar">
          Consultar disponibilidad
        </button>
    </section>

    <!-- DESCRIPCIÓN -->
    <section class="about">
      <p>{{ console.description }}</p>
    </section>

    <!-- FEATURES -->
    <section class="features">
      <div v-for="(feature, index) in console.features" :key="index" class="feature">
        <span>{{ feature }}</span>
      </div>
    </section>

    <!-- ACCESORIOS -->
    <section class="accessories" v-if="console.accessories && console.accessories.length">
      <h2>Accesorios compatibles</h2>
      <div class="accessory-list">
        <div v-for="(acc, idx) in console.accessories" :key="idx" class="accessory-card">
          <img :src="acc.image" :alt="acc.name" />
          <span>{{ acc.name }}</span>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="final-cta">
      <h2>¿Quieres saber disponibilidad hoy?</h2>
      <div class="cta-buttons">
        <button class="cta" @click="consultar">Consultar por WhatsApp</button>
        <button class="secondary" @click="volver">Volver a consolas</button>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import consoles from '@/data/consoles.json'

const router = useRouter()

const console: Console = consoles.find((c: Console) => c.id === 'nintendo')!
//const console: Console = consoles.find(c => c.id === 'nintendo') as Console

function volver() {
  router.push('/consoles')
}

function consultar() {
  alert('Consulta de disponibilidad')
}

// Tomamos Nintendo desde el JSON
interface Console {
  id: string
  name: string
  subtitle: string
  image: string
  description: string
  features: string[]
  accessories?: { name: string; image: string }[]
  price?: number
  stock?: number
}

useHead({
  title: `${console.name} | VortexGames`,
  meta: [
    { name: 'description', content: console.description },
    { property: 'og:title', content: `${console.name} | VortexGames` },
    { property: 'og:description', content: console.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: console.image }
  ]
})
</script>

<style scoped>
.nintendo-page {
  background: #000;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  width: 100%;
  overflow-x: hidden;
}

/* HERO */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background: radial-gradient(circle at top, #1a1a3a, #000);
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #00ffff;
  text-shadow: 0 0 20px rgba(127,92,255,0.9);
}

.hero-image {
  width: 300px;
  margin: 2rem 0;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 30px rgba(127,92,255,0.8));
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.85;
}

.cta {
  background: linear-gradient(45deg, #7f5cff, #503ec2);
  color: #fff;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 0 25px rgba(127,92,255,0.7);
  transition: transform 0.2s, box-shadow 0.3s;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(127,92,255,1);
}

/* ABOUT */
.about {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
  text-align: center;
  color: #ccc;
  line-height: 1.6;
}

/* FEATURES */
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 3rem 2rem;
}

.feature {
  background: #111;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(127,92,255,0.4);
  min-width: 160px;
  text-align: center;
  font-size: 1rem;
  color: #00ffff;
}

/* ACCESORIOS */
.accessories {
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
}

.accessories h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #7f5cff;
}

.accessory-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.accessory-card {
  background: #111;
  border-radius: 12px;
  padding: 1rem;
  width: 180px;
  text-align: center;
  box-shadow: 0 0 15px rgba(127,92,255,0.4);
}

.accessory-card img {
  width: 100px;
  margin-bottom: 0.5rem;
}

.accessory-card span {
  color: #00ffff;
  font-size: 0.9rem;
  display: block;
}

/* FINAL CTA */
.final-cta {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #000, #0b0b22);
}

.final-cta h2 {
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.secondary {
  background: transparent;
  border: 2px solid #7f5cff;
  border-radius: 30px;
  padding: 0.9rem 2rem;
  color: #7f5cff;
  cursor: pointer;
}

.secondary:hover {
  background: #7f5cff;
  color: #000;
}
</style>

