<template>
  <div class="full-window">
    <div class="window console-detail">

      <h1>{{ selectedConsole?.name }}</h1>

      <div class="content" v-if="selectedConsole">
        <div class="image-section">
          <img :src="selectedConsole.image" :alt="selectedConsole.name" class="console-img"/>
          <p>{{ selectedConsole.description }}</p>

          <section v-if="compatibleAccessories.length" class="accessories">
            <h2>Accesorios compatibles</h2>

            <div class="accessories-grid">
                <Card
                    v-for="a in compatibleAccessories"
                    :key="a.id"
                    :title="a.name"
                    :description="a.price"
                    :image="a.image"
                    class="glow"
                >
                    <button class="primary glow">
                        Agregar
                    </button>
                 </Card>
            </div>
          </section>


           <!-- PRECIO / STOCK -->
          <div class="price-stock">
  
          </div>    
        </div>

        <div class="info-section">
          <h2>{{ selectedConsole.subtitle }}</h2>
          <p>{{ selectedConsole.description }}</p>

           <!-- BLOQUE DE PRECIO Y STOCK -->
          <div class="price-stock">
            <p class="price">$ {{ selectedConsole.price.toLocaleString() }}</p>
            <p class="stock" :class="{ low: selectedConsole.stock <= 3 }">
                Stock: {{ selectedConsole.stock }}
            </p>
          </div>

          <ul class="features-list">
            <li v-for="(item, i) in selectedConsole.features" :key="i">
                <span class="feature-icon">✔️</span>
                <span class="feature-text">{{ item }}</span>
            </li>
          </ul>

          <div class="buttons">
            <button class="buy whatsapp" @click="comprarWhatsApp">Consultar disponibilidad</button>
            <button class="back" @click="volver">Volver</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import Card from '@/components/Card.vue'
import consolesList from '../data/consoles.json'
import accessories from '../data/accessories.json'
import { useHead } from '@vueuse/head'
import { useRouteMetrics } from '@/composables/useRouteMetrics'

interface ConsoleItem {
  id: string
  name: string
  subtitle: string
  image: string
  description: string
  features: string[]
  price: number
  stock: number
}

const route = useRoute()
const id = route.params.id
const router = useRouter()
const consoleId = route.params.id as string

const selectedConsole = computed<ConsoleItem | undefined>(() =>
  consolesList.find(c => c.id === consoleId)
)

const compatibleAccessories = computed(() =>
  accessories.filter(a => a.consoleId === consoleId)
)

function volver() {
  router.push('/consoles')
}

function comprarWhatsApp() {
  if (!selectedConsole.value) return

  const phone = '50660909704'
  const message = `Hola 👋, estoy interesado en la ${selectedConsole.value.name} 💰 Precio: $${selectedConsole.value.price.toLocaleString()}`
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

useHead({
  title: `Consola ${consoleId} | VortexGames`,
  meta: [
    {
      name: 'description',
      content: `Información y detalles de la consola ${consoleId}.`
    },
    {
      property: 'og:title',
      content: `Consola ${consoleId} | VortexGames`
    },
    {
      property: 'og:description',
      content: `Descubre características y datos de la consola ${consoleId}.`
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: '/og/consoles.png' },
    {
      property: 'og:image',
      content: `/og/consoles/${id}.png`
    }
  ]
})

useRouteMetrics()
</script>

<style scoped>
.console-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background: linear-gradient(135deg, #1c1c2f 0%, #0a0a1f 100%);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 30px #bf97ea, 0 0 60px #6d307a;
}

.console-detail h1 {
  color: #00ffff;
  font-size: 2.5rem;
  text-shadow: 0 0 10px #00ffff, 0 0 20px #6d307a;
}

.content {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
}

.image-section {
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.console-img {
  width: 300px;
  border-radius: 20px;
  box-shadow: 0 0 20px #00ffff, 0 0 40px #6d307a;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.console-img:hover {
  transform: scale(1.15);
  box-shadow: 0 0 30px #00ffff, 0 0 60px #6d307a;
}

.info-section {
  flex: 1 1 350px;
  background: rgba(28, 28, 47, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.price-stock {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
}

.price {
  font-size: 2rem;
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff;
}

.stock {
  font-size: 1.2rem;
  color: #7cff7c;
}

.stock.low {
  color: #ff6b6b;
  text-shadow: 0 0 8px #ff6b6b;
}

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #ccc;
}

.feature-icon {
  font-size: 1.3rem;
  color: #00ffff;
}

.buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.buttons button {
  flex: 1;
  padding: 12px 25px;
  font-size: 1rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #6d307a;
}

.buttons .buy {
  background: #00ffff;
  color: #1c1c2f;
}

.buttons .buy:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px #00ffff, 0 0 40px #6d307a;
}

.buttons .back {
  background: #6d307a;
  color: #fff;
}

.buttons .back:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px #6d307a, 0 0 40px #bf97ea;
}

.whatsapp {
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #fff;
  font-weight: bold;
  position: relative;
  overflow: hidden;
}

.whatsapp::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
  opacity: 0;
  transition: opacity 0.3s;
}

.whatsapp:hover::after {
  opacity: 1;
}

.whatsapp:hover {
  box-shadow: 0 0 20px #25D366, 0 0 40px #128C7E;
  transform: translateY(-3px);
}

.accessories {
  padding: 4rem 2rem;
  text-align: center;
}

.accessories h2 {
  color: var(--neon-primary);
  text-shadow: 0 0 15px var(--neon-primary);
}

.accessories-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

</style>