<template>
  <div class="articles-wrapper">
    <h1 class="articles-title gold-title">Artículos</h1>
    <div class="platform-filter">
      <button
        v-for="c in categories"
        :key="c"
        :class="{ active: selectedCategory === c }"
        @click="selectedCategory = c"
      >
        {{ c }}
      </button>
    </div>
    <div class="articles-grid">
      <div v-for="item in filteredArticles" :key="item.id" class="glass-card">
        <div class="badges">
          <span v-if="item.stock === 0" class="badge sold">
            Agotado
          </span>

          <span v-else-if="item.stock && item.stock <= 3" class="badge last">
            Últimas unidades
          </span>

          <span v-else class="badge ok">
            Disponible
          </span>
          <span v-if="item.is_new" class="badge new">Nuevo</span>
          <span v-if="item.on_sale" class="badge sale">Oferta</span>
        </div>
        <img :src="item.image || '/no-image.png'" />
        <h3>{{ item.name }}</h3>
        <span class="price">₡{{ item.price }}</span>
       <button
          class="add-cart"
          :class="{ added: addedArticleId === item.id }"
          :disabled="item.stock === 0"
          @click="addArticleToCart(item)"
        >
          <span v-if="addedArticleId === item.id">Agregado ✓</span>
          <span v-else>Agregar al carrito</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { supabase } from '@/lib/supabase'

import articlesData from '@/data/articles.json'


interface Article {
  id: string
  name: string
  /*title: string*/
  price: number
  image: string
  stock?: number
  platform?: string
  is_new?: boolean
  on_sale?: boolean
}

const categories = [
'SWITCH',
'PS5',
'PS4',
'XBOXX',
'XBOXS',
'3DS',
'SAMSUNG',
'IPHONE',
'SONY',
'VARIOS'
] /*'TODOS', */

const selectedCategory = ref('Todos')

const cartStore = useCartStore()

const articles = ref<Article[]>([])

const addedArticleId = ref<string | null>(null)

const filteredArticles = computed(()=>{

if(selectedCategory.value === 'Todos'){
return articles.value
}

return articles.value.filter(
a => a.platform === selectedCategory.value
)

})

onMounted(async () => {

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category','articulos')

  if(error){
    console.error(error)
    return
  }

  const order = ['TODOS','SWITCH','PS5','PS4','XBOXX','XBOXS','3DS','SAMSUNG','IPHONE','SONY','VARIOS']

  articles.value = (data || []).sort((a: Article, b: Article) => {
    return order.indexOf(a.platform ?? '') - order.indexOf(b.platform ?? '')
  })
})

function addArticleToCart(article: Article) {

  cartStore.addItem({
    id: article.id,
    name: article.name,
    title: article.name,
    price: article.price,
    image: article.image,
    stock: article.stock ?? 10,
    type: 'accessory'
  })

  addedArticleId.value = article.id
  setTimeout(() => (addedArticleId.value = null), 1200)
}

function addToCart(article: any) {
  cartStore.addItem({
    id: article.id,
    name: article.name,
    title: article.name,
    price: Number(article.price),
    image: article.image,
    stock: article.stock ?? 10,
    type: 'article',
  
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800&display=swap');

.articles-wrapper { padding: 60px 20px; background: linear-gradient(135deg, #7873644d, #b4a35f25); color: rgb(255, 251, 212); }

.articles-title { text-align: center; font-size: 3rem; margin-bottom: 50px; letter-spacing: 3px; }

/* GLASS */
.glass-card { backdrop-filter: blur(15px); background: rgb(173, 122, 12, 0.308); border-radius: 20px; padding: 25px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.511); transition: 0.3s; position: relative; }

.glass-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
}

.glass-card:hover { transform: translateY(-8px); box-shadow: 0 0 20px rgb(255, 252, 203); }

.articles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }

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
  background:#ff4d4d;
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
.add-cart {
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, #a4a4a454, #d0d0d045);
  color: #fff7dd;
  font-weight: bold;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(255,255,255,0.2);
  transition: transform .2s ease, box-shadow .2s ease;
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

/* FILTRO */
.platform-filter {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
  padding: 0 230px;
}

.platform-filter button {
  padding: 10px 12px  ;
  border: 2px solid #e1e09d8a;
  background: transparent;
  color: rgb(255, 252, 219);
  cursor: pointer;
  transition: 0.3s;
  border-radius: 8px;
  font-size: 0.9rem;
  backdrop-filter: blur(6px);
  background: rgba(255, 215, 0, 0.05);
}

.platform-filter button.active,
.platform-filter button:hover {
  background: #fffd9558;
  box-shadow: 0 0 15px #7e803ab9;
  background: linear-gradient(135deg,#ffd90055,#bfa06d55);
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

@media (max-width: 600px) {
  .platform-filter {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .platform-filter button {
    font-size: 0.8rem;
    padding: 8px;
  }
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