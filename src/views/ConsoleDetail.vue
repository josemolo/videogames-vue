  <template>
    <div class="full-window">
      <div class="console-detail">
        
        <!-- TÍTULO -->
        <!---<h1>{{ selectedConsole?.name }}</h1>-->

              <!-- HERO HEADER -->
        <div class="hero-header">
          <h1 class="hero-title">
            {{ selectedConsole?.name }}
          </h1>
        </div>

        <!-- CONTENIDO PRINCIPAL (VERTICAL) -->
        <div class="content" v-if="selectedConsole">

          <!-- IMAGEN + DESCRIPCIÓN -->
          <div class="image-section">
            <img
              :src="selectedConsole.image"
              :alt="selectedConsole.name"
              class="console-img"
            />
            <p class="console-description">
              {{ selectedConsole.description }}
            </p>
          </div>

          <!-- INFO -->
          <div class="info-section">
            <!-- BADGE ESTADO CONSOLA -->
            <div
              class="badge"
              :class="{
                low: selectedConsole.stock <= 3 && selectedConsole.stock > 0,
                out: selectedConsole.stock === 0
              }"
            >
              <span v-if="selectedConsole.stock === 0">Agotado</span>
              <span v-else-if="selectedConsole.stock <= 3">Últimas unidades</span>
              <span v-else>Disponible</span>
            </div>

            
            <h2 class="console-subtitle">
              {{ selectedConsole.subtitle }}
            </h2>

            <!-- DESCRIPCIÓN -->
            <p class="console-description">
              {{ selectedConsole.description }}
            </p>

            <div class="price-stock">
              <div class="price-main">
                <span class="currency">₡</span>
                <span class="amount">
                  {{ selectedConsole.price.toLocaleString() }}
                </span>
                <!--<p class="price">$ {{ selectedConsole.price.toLocaleString() }}</p>-->
                <!--<p class="stock" :class="{ low: selectedConsole.stock <= 3 }">
                  Stock: {{ selectedConsole.stock }}
                </p>-->
              </div>
            <div
                class="stock-badge"
                :class="{
                  low: selectedConsole.stock <= 3 && selectedConsole.stock > 0,
                  out: selectedConsole.stock === 0
                }"
              ><!--
                <span v-if="selectedConsole.stock === 0">Agotado</span>
                <span v-else-if="selectedConsole.stock <= 3">Últimas unidades</span>
                <span v-else> {{ selectedConsole.stock }}</span>
                -->
              </div>
            </div>

            <ul class="features-list">
              <li v-for="(item, i) in selectedConsole.features" :key="i">
                <span class="feature-icon">⚛</span>
                <span class="feature-text">{{ item }}</span>
              </li>
            </ul>

            <div class="buttons">
              <!--
              <button class="buy whatsapp" @click="comprarWhatsApp">
                Consultar disponibilidad
              </button>
              -->

              <!-- 🟢 BOTÓN AGREGAR CONSOLA -->
              <button
                class="add-cart"
                :class="{ added: addedConsole }"
                :disabled="selectedConsole.stock === 0"
                @click="addConsoleToCart"
              >
                <span v-if="addedConsole">Agregado ✓</span>
                <span v-else>Agregar al carrito</span>
              </button>


              <button class="back" @click="volver">
                Volver
              </button>
            </div>
          </div>

        </div>

        <!-- ACCESORIOS (ABAJO, GRID LIMPIO) -->
        <section v-if="compatibleAccessories.length" class="accessories">
          <h2>Accesorios Compatibles</h2>

          <div class="games-row">
            <div
              v-for="a in compatibleAccessories"
              :key="a.id"
              
              class="game-card"
            >
              
              <!--
              <img :src="a.image" :alt="a.name" />
              <p>{{ a.name }}</p>
              -->
            <!-- BADGE STOCK DENTRO DE LA CARD -->
            
              <div
                class="badge small"
                :class="{
                  low: a.stock <= 3 && a.stock > 0,
                  out: a.stock === 0
                }"
              >
                <span v-if="a.stock === 0">Agotado</span>
                <span v-else-if="a.stock <= 3">DISPONIBLE</span>
                <span v-else>Disponible</span>
              </div>         
              
              <img :src="a.image" :alt="a.name" />

              <h3>{{ a.name }}</h3>

              <div class="price-card">
                <span class="currency">₡</span>
                <span class="amount">
                  {{ a.price.toLocaleString() }}
                </span>
                <!--
                <span 
                  class="game-stock"
                  :class="{ out: a.stock === 0 }"
                >
                  {{ a.stock === 0 ? 'Agotado' : `${a.stock}` }}
                </span>
                -->
              </div>
              <!-- 🟢 BOTÓN AGREGAR ACCESORIO -->
              <button
                class="add-cart"
                :class="{ added: addedAccessoryId === a.id }"
                :disabled="a.stock === 0"
                @click="addAccessoryToCart(a)"
              >
                <span v-if="addedAccessoryId === a.id">Agregado ✓</span>
                <span v-else>Agregar al carrito</span>
              </button>
            </div>  
          </div>
        </section>

        <!-- JUEGOS -->
        <section v-if="availableGames.length" class="games">
          <h2>Juegos Disponibles</h2>
          

          <div class="games-row">
            
            <div
              v-for="game in availableGames"
              :key="game.id"
              
              class="game-card"           
            >

              <!-- BADGE JUEGO (MISMA LÓGICA QUE ANTES) -->
              <!--<template #badge>-->
                <!-- BADGE JUEGO -->
                <div
                  class="badge small"
                  :class="{
                    low: game.stock <= 3 && game.stock > 0,
                    out: game.stock === 0
                  }"
                >
                  <span v-if="game.stock === 0">Agotado</span>
                  <span v-else-if="game.stock <= 3">Últimas</span>
                  <span v-else>Disponible</span>
                </div>
              <!--</template> -->

                <img :src="game.image" :alt="game.name" />

                <h3>{{ game.name }}</h3>
                <p class="game-desc">
                  {{ game.description }}
                </p>

                <div class="price-card">
                  <span class="currency">₡</span>
                  <span class="amount">
                    {{ game.price.toLocaleString() }}
                  </span>
                  <!--
                  <span 
                    class="game-stock"
                    :class="{ out: game.stock === 0 }"
                  >
                    {{ game.stock === 0 ? 'Agotado' : `${game.stock}` }}
                  </span>
                  -->
                </div>
                <!-- BOTÓN CARRITO (AQUÍ VA EXACTAMENTE) -->
                <button
                  class="add-cart"
                  :class="{ added: addedGameId === game.id }"
                  :disabled="game.stock === 0"
                  @click="addGameToCart(game)"
                >
                  <span v-if="addedGameId === game.id">Agregado ✓</span>
                  <span v-else>Agregar al carrito</span>
                </button>            
            <!--</Card>  --> 
            </div>
          </div>
        </section>
        

      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { computed, ref } from 'vue'
  import Card from '@/components/Card.vue'
  import consolesList from '../data/consoles.json'
  import accessories from '../data/accessories.json'
  import games from '../data/games.json'
  import { useHead } from '@vueuse/head'
  import { useRouteMetrics } from '@/composables/useRouteMetrics'
  import { useCartStore } from '@/stores/cart'
  import { useUserStore } from '@/stores/user'

  interface AccessoryItem {
    id: number
    consoleId: string
    name: string
    price: number
    stock: number
    image: string
  }

  interface ConsoleItem {
    id: string
    name: string
    subtitle: string
    image: string
    description: string
    features: string[]
    //accessories?: Accessory[]
    price: number
    stock: number
  }

  interface GameItem {
    id: number
    consoleId: string
    name: string
    description: string
    price: number
    stock: number
    image: string
  }

  const route = useRoute()
  const router = useRouter()
  const id = route.params.id

  const consoleId = route.params.id as string



  const cart = useCartStore()
  const user = useUserStore()

  const addedConsole = ref(false)

  const addedGameId = ref<number | null>(null)
  const addedAccessoryId = ref<number | null>(null)

  const selectedConsole = computed<ConsoleItem | undefined>(() =>
    consolesList.find(c => c.id === consoleId)
  )

  const compatibleAccessories = computed<AccessoryItem[]>(() =>
    accessories.filter(a => a.consoleId === consoleId)
  )

  const availableGames = computed<GameItem[]>(() =>
    games.filter(g => g.consoleId === consoleId)
  )

  /*FUNCIONES CARRITO*/

  function requireLogin(action?: () => void) {
    if (!user.isLoggedIn) {
      user.openLoginModal(action)
      return false
    }

    return true
  }

  function addConsoleToCart() {
    if (!selectedConsole.value) return

    const action = () => {
      cart.addItem({
        id: selectedConsole.value!.id,
        name: selectedConsole.value!.name,
        title: selectedConsole.value!.name,
        price: selectedConsole.value!.price ?? 0,
        image: selectedConsole.value!.image,
        stock: selectedConsole.value!.stock ?? 0,
        type: 'console',
      })

      addedConsole.value = true
      setTimeout(() => (addedConsole.value = false), 1200)
    }

    if (!requireLogin(action)) return

    action()
  }  

  function addGameToCart(game: GameItem) {
    //if (!requireLogin()) return

    const action = () => {
      cart.addItem({
        id: game.id.toString(),
        name: game.name,
        title: game.name,
        price: game.price ?? 0,
        image: game.image,
        stock: game.stock ?? 0,
        type: 'game',
      })
    

      addedGameId.value = game.id
      setTimeout(() => (addedGameId.value = null), 1200)
    }

    if (!requireLogin(action)) return

    action()
  }

  function addAccessoryToCart(accessory: AccessoryItem) {
    //if (!requireLogin()) return

    const action = () => {
      cart.addItem({
        id: accessory.id.toString(),
        name: accessory.name,
        title: accessory.name,
        price: accessory.price ?? 0,
        image: accessory.image,
        stock: accessory.stock ?? 0,
        type: 'accessory',
      })

      addedAccessoryId.value = accessory.id
      setTimeout(() => (addedAccessoryId.value = null), 1200)
    }

    if (!requireLogin(action)) return

    action()
  }  

  function volver() {
    router.push('/consoles')
  }

  function comprarWhatsApp() {
    if (!selectedConsole.value) return

    const phone = '50660909704'
    const message = `Hola 👋, estoy interesado en la ${selectedConsole.value.name} 💰 Precio: $${selectedConsole.value.price.toLocaleString()}`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
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
  .full-window {
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  .add-cart {
    width: 100%;
    margin-top: 0px;
    padding: 10px;
    border-radius: 12px;
    background: linear-gradient(135deg, #a4a4a454, #d0d0d045);
    color: #fff7dd;
    font-weight: bold;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.219);
    transition: transform .2s ease, box-shadow .2s ease;
  }

  .add-cart:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgb(255, 255, 255);
  }

  .add-cart:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .add-cart.added {
    background: linear-gradient(135deg, #7cff7c, #00ffcc);
    color: #000;
    box-shadow:
      0 0 15px rgba(124,255,124,0.9),
      0 0 30px rgba(0,255,204,0.9);
    animation: pulseAdd 0.6s ease;
  }

  /* =========================
    HERO HEADER DIAMANTE
  ========================= */

  .hero-header {
    position: relative;
    width: 100%;
    padding: 50px 20px 40px;
    margin-bottom: 30px;
    text-align: center;

    background:
      radial-gradient(circle at top, rgba(206, 164, 12, 0.233), transparent 1000%),
      linear-gradient(135deg, #00000023, #0000001c);

    border-radius: 24px;
    overflow: hidden;
    box-shadow:
      0 0 40px rgba(142, 142, 142, 0.484),
      inset 0 0 40px rgb(118, 104, 35);
  }

  /* Scanlines sutiles (Nintendo vibes) */
  .hero-header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgb(40, 40, 40),
      rgb(25, 25, 25) 1px,
      transparent 1px,
      transparent 4px
    );
    pointer-events: none;
  }

  /* TÍTULO PRINCIPAL */
  .hero-title {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 900;
    letter-spacing: 3px;
    margin-bottom: 16px;

    font-family: 'Orbitron', sans-serif;
    color: #33ff00;

    text-shadow:
      0 0 15px #1eff00,
      0 0 35px rgb(51, 255, 0),
      0 0 60px rgb(30, 255, 0);

    animation: heroGlow 3s ease-in-out infinite;
  }

  /* SUBTÍTULO */
  .hero-subtitle {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;

    color: #33ff00;
    opacity: 0;

    animation: fadeUp 1s ease forwards;
    animation-delay: 0.3s;
  }

  .console-detail {
    background: linear-gradient(135deg, #d4af3713 0%, #d4b5391d 100%);
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 30px #efefef3d, 0 0 60px #ffffff3e;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .console-subtitle {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff7dd;
    margin-bottom: 15px;

    font-family: 'Orbitron', sans-serif;
    text-shadow:
      0 0 10px rgba(214, 181, 18, 0.459),
      0 0 25px rgba(204, 163, 26, 0.543);
  }

  .console-detail h1 {
    text-align: center;
    font-size: 3.6rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 50px;

    color: #362a1265;
    font-family: 'Orbitron', sans-serif;

    text-shadow:
      0 0 10px #071bf1,
      0 0 25px rgba(0, 38, 255, 0.989),
      0 0 45px rgba(5, 81, 194, 0.904);
  }

  .console-description {
    text-align: center;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #2bff00;
    margin-bottom: 25px;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    flex: 1 1 350px;
    max-width: 500px;
    
    background: rgba(152, 125, 29, 0);
    border-radius: 20px;
    padding: 30px;
    /*
    display: flex;
    justify-content: center;*/
  }

  .console-img {
    width: 100%;
    max-width: 320px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 0 25px #605f5fb7, 0 0 40px #6e6e6eb9;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    margin-bottom: 20px;
  }

  .description {
    max-width: 600px;
    color: #03f407;
  }

  .console-img:hover {
    transform: scale(1.15);
    box-shadow: 0 0 30px #dbdbdb, 0 0 60px #e4a106;
  }

  .info-section {
    flex: 1 1 350px;
    max-width: 600px;
    width: 100%;
    
    /*
    margin: 0 auto;
    flex: 1;
    */
    background: rgba(173, 122, 12, 0.308);
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgb(255, 255, 255);
    /*
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 20px;*/
  }

  .price-stock {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
    margin: 25px 0;
  }

  .price-box {
    font-size: 2.2rem;
    color: #ffffff;
  }

  .price-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-size: 1.4rem;
  font-weight: 800;

  color: #fff7dd;

  text-shadow:
    0 0 8px rgba(210, 191, 148, 0.758),
    0 0 20px rgba(214, 196, 78, 0.717);

  margin: 10px 0 6px;
  animation: heroGlow 3s ease-in-out infinite;
}

.price-card .currency {
  font-size: 1rem;
  opacity: 0.8;
}

.price-card .amount {
  font-size: 1.6rem;
}

  .price {
    font-size: 2rem;
    color: #ffd00098;
    text-shadow: 0 0 10px #928311a2;
  }

  .price-main {
    font-size: 2.6rem;
    font-weight: bold;
    color: #fff7dd;
    text-shadow: 0 0 14px rgb(255, 231, 123);
  }

  .currency {
    margin-right: 4px;
  }

  /* ================= BADGES ================= */
  .badge {
    align-self: center;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: #25d366;
    color: #ffffff;
    box-shadow: 0 0 12px #efefef9b;
    margin-bottom: 14px;
  }

  .badge.low {
    background: #fffb00;
    box-shadow: 0 0 12px #ffffff;
  }

  .badge.out {
    background: #ff0000;
    box-shadow: 0 0 15px #ffffff;
    color: #ffffff;
  }

  .badge.small {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 0.65rem;
    padding: 5px 10px;
    z-index: 2;
  }

  /* ===== TODO TU CSS ORIGINAL CONTINÚA AQUÍ ===== */
  /* (no lo eliminé, solo omití repetirlo aquí para no duplicar) */

  .stock {
    font-size: 1.2rem;
    color: #0f00e4;
  }

  /*
  .stock-badge {
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #7cff7c;
    border: 1px solid #7cff7c;
    box-shadow: 0 0 10px rgba(124,255,124,0.4);
    transition: all 0.3s ease;
  }

  /* STOCK OK *
  .stock-badge:not(.low):not(.out) {
    /*color: #7cff7c;
    border-color: #7cff7c;*
    box-shadow: 0 0 10px rgba(124,255,124,0.4);
  }*/

  .stock.low {
    color: #0029f7;
    text-shadow: 0 0 8px #1308e7;
  }

  .stock-badge.low {
    border-color: #0220ff;
    color: #0501ff;
    box-shadow: 0 0 12px rgb(1, 18, 250);
  }


  .features-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 0;
    align-items: center; /* centra horizontalmente los li */
    text-align: center;  /* para texto dentro */
  }

  .features-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    color: #fff3cc;
    list-style: none;
    padding: 0;
    margin: 20px 0;
    margin-bottom: 10px;
    justify-content: center; /* centra los items dentro del li */
  }
  
  .feature-icon {
    font-size: 1.3rem;
    color: #ebdca18b;
  }

  /* Si quieres que sea dorado */
  .feature-icon.golden {
    color: #ffedb2; /* color dorado clásico */
  }

  .buttons {
    display: flex;
    gap: 15px;
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
    box-shadow: 0 0 10px #949494a3, 0 0 20px #fde89b;
  }

  .buy {
    background: #25d366;
    color: #0f0be8;
  }

  .back {
    background: #1006c4;
    color: #002fff;
  }

  .buttons .buy {
    background: #0d00ff;
    color: #0727f3;
  }

  .buttons .buy:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px #0055ff, 0 0 40px #071bf5;
  }

  .buttons .back {
    background: #41414200;
    color: #fff7dd;
  }

  .buttons .back:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px #f3f3f3, 0 0 40px #ffffff41;
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

  .accessories, 
  .games {
    width: 100%;
    max-width: 1000px;
    margin-top: 60px;
    text-align: center;
  }

  /*
  .games {
    margin-top: 5rem;
    padding: 2rem;
  }*/

  .games-row {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 15px 5px 25px;
    scroll-behavior: smooth;

    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    justify-content: center;
  }

  .games-row > * {
    scroll-snap-align: start;
  }

  .games-row::-webkit-scrollbar {
    height: 6px;
  }

  .games-row::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #0008ff, #0000ff);
    border-radius: 10px;
  }

  .game-card {
    min-width: 240px;
    max-width: 240px;
    flex-shrink: 0;

    scroll-snap-align: start;

    background: rgba(173, 122, 12, 0.308);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.534);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
  }

  .game-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgb(150, 150, 153);
  }

  .game-card img {
    width: 100%;
    height: 150px;
    object-fit: contain;  /* mantiene proporción */
    border-radius: 12px;
    margin-bottom: 10px;
  }

  .game-card h3 {
    font-size: 1rem;
    color: #fffbdf;
    margin-bottom: 6px;
  }

  .game-desc {
    font-size: 0.85rem;
    color: #f8df93;
    margin-bottom: 12px;
  }

  .game-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .game-price {
    color: #7cff7c;
    font-weight: bold;
  }

  .game-stock {
    font-size: 0.8rem;
    color: #7cff7c;
  }

  .game-stock.out {
    color: #ffed4d;
    /*font-weight: bold;*/
  }



  .accessories h2,
  .games h2 {
    font-size: 2rem;  
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    /*text-align: center;*/
    margin-bottom: 25px;

    color: #ffffcee7;
    /*letter-spacing: 1.5px;*/

    text-shadow:
      0 0 105px #ffffff00,
      0 0 25px rgba(198, 170, 28, 0.74),
      0 0 45px rgba(255, 255, 255, 0);
  }

  .accessories h2::after,
  .games h2::after {
    content: '';
    display: block;
    width: 120px;
    height: 4px;
    margin: 14px auto 0;

    background: linear-gradient(90deg, #7873649a, #b4a35fb1);
    border-radius: 10px;
    box-shadow: 0 0 15px #e5dca2bf;
  }

  .accessories-grid, 
  .games-grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
  }

  .accessory-card {
    background: #ffd10285;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 0 15px rgba(233, 210, 5, 0.635);
  }

  .accessory-card img {
    width: 100%;
    border-radius: 10px;
  }

  /*.accessories {
    margin-top: 5rem;
    padding: 2rem;
    text-align: center;
  }

  .accessories-row {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    padding: 1.5rem 0;
    scroll-behavior: smooth;
  }*/

  .accessories-row::-webkit-scrollbar {
    height: 8px;
  }

  .accessories-row::-webkit-scrollbar-thumb {
    background: rgba(255, 221, 0, 0.667);
    border-radius: 10px;
  }

  /*
  .accessories-row > * {
    min-width: 240px;
    flex-shrink: 0;
  }

  */


  /* ANIMACIONES */
  @keyframes heroGlow {
    0%, 100% {
      text-shadow:
        0 0 15px #ffffff90,
        0 0 35px rgb(255, 255, 255),
        0 0 60px rgba(255, 255, 255, 0.703);
    }
    50% {
      text-shadow:
        0 0 25px #ebebeb,
        0 0 55px rgba(255, 255, 255, 0.53),
        0 0 90px rgba(255, 255, 255, 0.708);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulseAdd {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.08);
    }
    100% {
      transform: scale(1);
    }
  }

  /* RESPONSIVE (móvil) */
  @media (max-width: 900px) {
    .content {
      flex-direction: column;
      gap: 25px; /* reducir bastante para móvil */
      padding: 0 10px; /* algo de padding para no pegarse a los bordes */
      /*align-items: center;*/
    }

    .console-detail {
      padding: 20px 15px;
    }

    .hero-header {
      padding: 35px 15px 25px;
    }

    /*
    .hero-subtitle {
      font-size: 1.1rem;
    }
    */
    .price-stock {
      flex-direction: column;
      gap: 15px;
    }

    .buttons {
      flex-direction: column;
    }

    .game-card {
      min-width: 200px;
      max-width: 200px;
    }
  }

  @media (min-width: 1024px) {
    .games-row {
      overflow-x: visible;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      justify-content: center;
      /*flex-wrap: wrap;*/
      gap: 30px;
      padding: 30px 0;
    }

    .game-card {
      min-width: unset;
      max-width: 100%;
    }

    .accessories,
    .games {
      max-width: 1200px;
    }
  }

  </style>







