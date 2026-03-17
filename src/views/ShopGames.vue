<template>
  <div class="games-wrapper">
    <h1 class="games-title gold-title">Juegos</h1>
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
         <!-- BADGES -->
        <div class="badges">
          <span v-if="game.stock === 0" class="badge sold">
          Agotado
          </span>

          <span v-else-if="game.stock && game.stock <= 3" class="badge last">
          Últimas unidades
          </span>

          <span v-else class="badge ok">
          Disponible
          </span>
          <span v-if="game.is_new" class="badge new">Nuevo</span>
          <span v-if="game.on_sale" class="badge sale">Oferta</span>
        </div>
        <img :src="game.image || '/no-image.png'" />
        <h3>{{ game.name }}</h3>
        <span class="price">₡ {{ game.price }}</span>
        <button
          class="add-cart"
          :class="{ added: addedGameId === game.id }"
          :disabled="game.stock === 0"
          @click="addGameToCart(game)"
        >
          <span v-if="addedGameId === game.id">Agregado ✓</span>
          <span v-else>Agregar al carrito</span>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { supabase } from '@/lib/supabase'
import gamesData from '@/data/gamesCatalog.json'


interface Game {
  id: string
  name: string
  /*title: string*/
  platform?: string
  price: number
  image: string
  stock?: number
  is_new?: boolean
  on_sale?: boolean
}

const cartStore = useCartStore()

const games = ref<Game[]>([])

const platforms = ['Todos', 'Switch', 'PS5', 'Xbox', 'PS4', 'Xboxs', '3DS']
const selectedPlatform = ref('Todos')

const addedGameId = ref<string | null>(null)

onMounted(async () => {

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category','juegos')

  if(error){
    console.error(error)
    return
  }
    
  const order = ['SWITCH','PS5','PS4','XBOXX','XBOXS','3DS']

  games.value = (data || []).sort((a: Game, b: Game) => {
    return order.indexOf(a.platform ?? '') - order.indexOf(b.platform ?? '')
  })

  games.value = data || []

})

const filteredGames = computed(() => {
  let list = games.value

  if(selectedPlatform.value !== 'Todos'){
    list = list.filter(
      g => g.platform === selectedPlatform.value
    )
  }
  return list
})


function addGameToCart(game: Game) {

  cartStore.addItem({
    id: game.id,
    name: game.name,
    title: game.name,
    price: game.price,
    image: game.image,
    stock: game.stock ?? 10,
    type: 'game'
  })

  addedGameId.value = game.id
  setTimeout(() => (addedGameId.value = null), 1200)
}

function addToCart(game: any) {
  cartStore.addItem({
    id: game.id,
    name: game.name,
    title: game.name,
    price: Number(game.price),
    image: game.image,
    stock: game.stock ?? 10,
    type: 'game'
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800&display=swap');

.games-wrapper { padding: 60px 20px; background: #7873644d; color: rgb(255, 233, 198); }

.games-title { text-align: center; font-size: 3rem; margin-bottom: 40px; text-shadow: 0 0 15px #f3ecafe2; }

/* FILTRO */
.platform-filter { text-align: center; margin-bottom: 40px; }

.platform-filter button { margin: 0 10px; padding: 10px 20px; border: 2px solid #e1e09d8a; background: transparent; color: rgb(255, 252, 219); cursor: pointer; transition: 0.3s; }

.platform-filter button.active,
.platform-filter button:hover { background: #fffd9558; box-shadow: 0 0 15px #7e803ab9; }

/* GRID */
.games-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; }

.game-card { background: #d4af3715; border-radius: 15px; padding: 20px; text-align: center; transition: 0.3s; border: 1px solid rgba(235, 232, 179, 0.571); position: relative; }

.game-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.game-card:hover { transform: translateY(-6px); box-shadow: 0 0 20px #d2d08877; }

.price { display: block; margin-top: 10px; color: #eae6bb; font-weight: bold; }

.fade-enter-active,
.fade-leave-active { transition: all 0.4s ease; }

.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(20px); }

/* BADGES */
.badges{
  position:absolute;
  display:flex;
  gap:6px;
  top:10px;
  left:10px;
}

.badge{
  padding:4px 8px;
  font-size:12px;
  font-weight:bold;
  border-radius:6px;
}

.badge.new{
  background:#00d084;
  color:white;
}

.badge.sale{
  background:#4d56ff;
  color:white;
}

.badge.sold{
background:#555;
color:white;
}

.badge.last{
background:#ff9800;
color:white;
}

.badge.ok{
background:#00c853;
color:white;
}

/* ADD TO CART */
.add-cart{
  margin-top:12px;
  width:100%;
  padding:8px;
  border:none;
  background:#fff1a29d;
  color:black;
  font-weight:bold;
  border-radius:8px;
  cursor:pointer;
  transition:0.2s;
}

.add-cart:hover{
  transform:scale(1.05);
  background:#ffe84d;
}

.add-cart:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0 20px white;
}

.add-cart:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.add-cart.added {
  background: linear-gradient(135deg,#7cff7c,#00ffcc);
  color: black;
  box-shadow:
    0 0 15px rgba(124,255,124,0.9),
    0 0 30px rgba(0,255,204,0.9);
  animation: pulseAdd .6s ease;
}

.gold-title{
font-family:'Orbitron',sans-serif;
font-weight:800;
letter-spacing:3px;
text-transform:uppercase;

background:linear-gradient(90deg,#FFD700,#fff0b3,#BFA06D);
background-size:400% auto;

-webkit-background-clip:text;
background-clip:text;
-webkit-text-fill-color:transparent;

animation:goldFlow 18s ease infinite;

text-shadow:
0 0 10px rgba(255,215,0,0.3),
0 0 25px rgba(255,248,220,0.3),
0 0 40px rgba(191,160,109,0.4);
}

@keyframes goldFlow{
0%{background-position:0% 50%;}
50%{background-position:100% 50%;}
100%{background-position:0% 50%;}
}

@keyframes pulseAdd {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

.game-card,
.glass-card{

background:rgba(255,215,0,0.05);
border:1px solid rgba(255,215,0,0.18);

box-shadow:
0 0 15px rgba(255,215,0,0.05);

backdrop-filter:blur(15px);
}

.game-card:hover,
.glass-card:hover{

box-shadow:
0 0 25px rgba(255,215,0,0.35);

transform:translateY(-6px);
}
</style>