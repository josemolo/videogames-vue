<template>  
  <div class="home-wrapper">
    <div class="home">
    <Hero 
    :video="gamingBg" 
    @shop="goToShop"
    @news="goToNews"
    />
    <HomeCarousel />
      <!-- SECCIONES SIMPLES -->
      <section class="featured-games"> 
        <h2>Juegos Destacados</h2>
        <div class="carousel-row">
          <Card
            v-for="game in games"
            :key="game.id"
            :id="game.id"  
            :title="game.title"
            :description="game.description"
            :image="game.image"
            :price="game.price"
            variant="game"
            :added="addedGameId === game.id"
            @buy="handleAddToCart(game)"
          />
        </div>  
      </section>

      <!-- PRODUCTOS -->
      <section class="products" v-reveal>
        <h2>Productos Destacados</h2>
        <div class="carousel-row">
          <Card
            v-for="p in (featuredProductsDynamic.length ? featuredProductsDynamic : featuredProducts)"
            :key="p.id"
            :id="p.id"
            :image="p.image"
            :title="p.name"
            :price="Number(p.price)"
            variant="product"
            :added="addedProductId === p.id"
            @buy="handleAddToCart(p)"
          >
          </Card>
        </div>
      </section>
      <!-- NOTICIAS -->
      <section class="news" v-reveal>
        <h2>Últimas Noticias</h2>
        <div class="carousel-row">
          <Card
            v-for="n in newsList"
            :key="n.id"
            :id="n.id"
            :image= String(n.image)
            :title="n.title"
            :description="n.description"
            variant="news"
            @view="goToNews"
          />
        </div>
      </section>
      <!-- TESTIMONIOS -->
      <section class="testimonials" v-reveal>
        <h2>Lo que dicen nuestros clientes</h2>
        <div class="testimonial-grid">
          <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
            <p>"{{ t.text }}"</p>
            <span>- {{ t.name }}</span>
          </div>
        </div>
      </section>
      <!-- NEWSLETTER -->
      <!-- SECCION UBICACION -->
      <section class="location" v-reveal>
        <h2>Visítanos</h2>
        <div class="location-card">
          <div class="location-info">
            <h3></h3>
            <p>
              Costa Rica, Heredia, Santo Domingo<br>
              25 metros oeste de la escuela Ruben Darío, Santa Rosa
            </p>
            <a href="https://wa.me/50687469019" target="_blank" rel="noopener noreferrer" class="phone">
            8746-9019
            </a>
            <div class="location-actions">
              <a
                href="https://ul.waze.com/ul?ll=9.97422444%2C-84.09651876&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                target="_blank"
                rel="noopener noreferrer"
                class="location-btn waze"
              >
                Waze
              </a>
              <a
                href="https://maps.app.goo.gl/kFJNzoCcVhULiTSR8"
                target="_blank"
                rel="noopener noreferrer"
                class="location-btn maps"
              >
                Maps
              </a>
            </div>
          </div>
          <div class="location-map">
            <iframe
              src="https://maps.google.com/maps?q=San%20Rafael%20San%20Jose%20Costa%20Rica&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              class="styled-map"
            ></iframe>
          </div>
        </div>
      </section>
      <!-- FOOTER -->
      <footer class="footer">
        <div>© 2026 LucyCell</div>
        <div class="social">
          <a 
            v-for="s in socials" 
            :key="s.name" 
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackSocialClick(s.name)"
          >
            {{ s.name }}
          </a>
        </div>
      </footer>
    </div>
  </div>  
</template>


<script setup lang="ts">
import HomeCarousel from '@/components/HomeCarousel.vue'
import Hero from '@/components/Hero.vue'
import Card from '@/components/Card.vue'
import featuredProductsData from '@/data/featuredProducts.json'
import rawNewsData from '@/data/news.json'

/*import gamingBg from '@/assets/videos/gaming.mp4'*/
/*import SectionGrid from '@/components/SectionGrid.vue'*/
/*import gamesData from '@/data/games.json'*/
/*import newsListData from '@/data/news.json'*/

import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useRouteMetrics } from '@/composables/useRouteMetrics'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { supabase } from '@/lib/supabase'
import type { NewsItem } from '@/types/news'
import { useProducts } from '@/composables/useProducts'

/*import { useParticles } from '@/composables/useParticles'*/

useRouteMetrics()

useHead({
  title: 'LUCYCELL | Consolas, Juegos y Accesorios Gamer',
  meta: [
    { name: 'description', content: 'Bienvenido a Gaming Hub, tu portal de videojuegos.' },
    { property: 'og:title', content: 'LUCYCELL | Consolas y Juegos' },
    { property: 'og:description', name: 'description', content: 'Compra consolas, juegos y accesorios gamer con envíos rápidos y precios competitivos.' },
    { property: 'og:image', content: 'https://res.cloudinary.com/usuario/image/upload/banner.jpg'},
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og/home.png' }
  ]
})  

useScrollAnimation('.card')

const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()

const { products, getByCategory } = useProducts()

const goToShop = () => router.push('/consoles')
const goToNews = () => router.push('/news')

const addedGameId = ref<string | number | null>(null)
const addedProductId = ref<string | null>(null)

const email = ref('')
const loading = ref(false)

const featuredProductsDynamic = ref<any[]>([])

const games = ref([ 
  { 
    id: 1, 
    title: "Screamer",
    description: "Juego aparentemente inofensivo",
    image: "/images/games/screamergame.jpg",
    price: 30000
  },
  { 
    id: 2, 
    title: "Grand Theft Auto lV",
    description: "Vive desafios de una ciudad virtual",
    image: "/images/games/gtaciudad.jpg",
    price: 80000
  },
  { 
    id: 3, 
    title: "Crimson Desert",
    description: "Un mundo abierto lleno de exploración",
    image: "/images/games/crimsondesert.jpg",
    price: 38000
  }
]);

const newsData: NewsItem[] = rawNewsData as NewsItem[]

const featuredProducts = ref(featuredProductsData)
const newsList = ref<NewsItem[]>([])
onMounted(() => {
  newsList.value = newsData.filter(n => n.showInHome === true)

  // productos destacados desde Supabase
  featuredProductsDynamic.value = getByCategory('articulos').slice(0,4)
})

const gamingBg = "https://res.cloudinary.com/dakkfinnu/video/upload/v1767195871/gaming_g0o04l.mp4";

/*const canvasRef = ref<HTMLCanvasElement | null>(null)*/

  
//const simpleSections = [
//  { title: 'Categorías', items: ['PlayStation','Xbox','Nintendo','PC Gamer'] },
//  { title: 'Ofertas Especiales', items: ['20% en PS5','Bundle PC Gamer','Accesorios'] },
//  { title: 'Próximos Lanzamientos', items: ['Juego X - 2026','Juego Y - 2026','Juego Z - 2026'] }
//]

const testimonials = [
  { name:'Gamer123', text:'Excelente tienda y envío rápido!' },
  { name:'ProGamer', text:'Gran variedad y precios inmejorables.' }
]

const socials = [
  {
    name: 'Whatsapp',
    url: 'https://wa.me/50687469019'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lucycell_kd'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/lucycell.reparaciones'
  }
]

//const openLoginModal = inject('openLoginModal') as () => void

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

async function handleSubscribe() {
  try {
    loading.value = true

    const { error } = await supabase
      .from('leadslucycell')
      .upsert(
        [{ email: email.value }],
        { onConflict: 'email' }
      )


    if (error) throw error

    alert('¡Gracias por suscribirte!')
    email.value = ''

  } catch (error) {
    console.error('Error insertando lead:', error)
    alert('Ocurrió un error.')
  } finally {
    loading.value = false
  }
}

function trackSocialClick(platform: string) {
  if (window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'engagement',
      event_label: platform,
      page_location: window.location.href
    })
  }
}

function handleAddToCart(item: any) {
  const action = () => {
    const isGame = typeof item.id === 'number'
    /*const isProduct = !!item.title*/

    cartStore.addItem({
      id: item.id.toString(),
      name: item.title ?? item.name,
      title: item.title ?? item.name,
      price: Number(item.price) ?? 0,
      image: item.image ?? '',
      stock: item.stock ?? 10,
      type: isGame ? 'game' : 'product'
    })

    // 🔥 Activar animación correcta
  if (isGame) {
    addedGameId.value = item.id
    setTimeout(() => (addedGameId.value = null), 1200)
  } else {
    addedProductId.value = item.id
    setTimeout(() => (addedProductId.value = null), 1200)
  }
  }

  if (!userStore.isLoggedIn) {
    userStore.openLoginModal(action)
  } else {
    action()
  }
}

/*let stopParticles: (() => void) | null = null*/

/*onMounted(async () => {
  //await nextTick()
  
  //if (canvasRef.value) {
      stopParticles = useParticles(canvasRef.value) //stopParticles = 
    }
)

onBeforeUnmount(() => {
  if (stopParticles) stopParticles()
})*/

//useParticles(canvasRef)*/

console.log('games:', games)

defineProps({
  video: String
})

//export function useParticles(canvasRef) {
    //setup particles...
//
//  return () => {
    // limpiar listeners / animation frame
//  }
//}
</script>


<style scoped>
/* RESET */
*{margin:0;padding:0;box-sizing:border-box}

/* SECCIONES */
section { padding:4rem 1rem 0rem 0rem; text-align:center; color:#fff0bc; max-width: 1400px;  /*centra contenido */ margin: 0 auto; }

section h2{font-size:clamp(2rem,5vw,2.5rem);margin-bottom:2rem;color:#f9eead;text-shadow:0 0 10px #fff4b8;}

/* HERO */
.carousel-row { display: flex; gap: 16px; overflow-x: auto; -webkit-overflow-scrolling: touch; /*iPhone smooth*/ padding-bottom: 10px; width: 100vw; /*ancho total de la pantalla*/ max-width: 100vw; padding: 70px 0 50px; margin-left: calc(-50vw + 50%); /* Centrar el carrusel full width */ scroll-snap-type: x mandatory; scroll-behavior: smooth; }

/* Flechas del carrusel - ejemplo, ajusta según clase real */
.carousel-arrow,
.slick-arrow,
.carousel-button { color: #FFD700; /* dorado brillante */ filter: drop-shadow(0 0 5px #FFD700); transition: color 0.3s ease, filter 0.3s ease; }

.carousel-arrow:hover,
.slick-arrow:hover,
.carousel-button:hover { color: #FFF88F; filter: drop-shadow(0 0 10px #FFF88F); }

.carousel-row::-webkit-scrollbar { height: 8px; }

.carousel-row::-webkit-scrollbar-thumb { background: #e0d798; border-radius: 10px; }

.carousel-row :deep(.card) { flex: 0 0 200px; /* antes seguro estaba 280 o más */ max-width: 200px; }

.carousel-row :deep(img) { width: 100%; height: 190px; object-fit: cover; border-radius: 10px; transition: transform 0.4s ease; }

.carousel-row :deep(.card:hover img) { transform: scale(1.05); }

.carousel-row > * { flex: 0 0 auto; scroll-snap-align: start; min-width: 280px; }

.hero{position:relative;height:100vh;display:flex;justify-content:center;align-items:center;text-align:center;color:#efe5b3;overflow:hidden;}

.hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.2) contrast(1.1);z-index:-3}

.hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.7);z-index:-2}

.hero-content{position:relative; padding:20px;z-index:2;animation:fadeUp 1s ease-out forwards;}

.badge{display:inline-block;padding:6px 14px;margin-bottom:1rem;border-radius:20px;font-size:0.8rem;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.6);backdrop-filter:blur(6px)}

.hero-title{ font-size:clamp(3rem,8vw,6rem);font-weight:900;font-family:'Orbitron',sans-serif;color:#93894f;text-shadow:0 0 20px rgba(221, 204, 118, 0.84),0 0 40px rgba(171, 180, 70, 0.6);}

.hero-text{margin-top:1rem;font-size:clamp(1.1rem,2.5vw,1.4rem);opacity:0.95;}

.hero-actions{margin-top:2.5rem;display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}

.hero-actions button{ padding:0.9rem 2.4rem; font-size:1.1rem; border-radius:12px; cursor:pointer; transition:all 0.3s ease; font-weight:600; width: auto; /* Evita que ocupen todo el ancho */ min-width: 140px;  /* Tamaño mínimo legible */ max-width: 250px;  /* Tamaño máximo razonable */ }

.primary{border:none;background:linear-gradient(45deg,#ffd900cd,#BFA06D);color:#fff;box-shadow:0 0 30px rgba(255,215,0,0.6)}

.primary:hover{transform:translateY(-4px);box-shadow:0 0 50px rgba(255, 217, 0, 0.612)}

.secondary{background:transparent;color:#e6e3a7;border:2px solid #e6e6a7}

.secondary:hover{background:rgba(68, 0, 255, 0.15)}

.particle-canvas{position:fixed;inset:0;z-index:-3;pointer-events:none}

/* GRIDS */
.category-grid, .product-grid, .offer-grid, .upcoming-grid, .news-grid, .testimonial-grid{ display:grid; gap:2rem; }

.category-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}

.product-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}

.offer-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}

.upcoming-grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}

.news-grid{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}

.testimonial-grid{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}

/* TARJETAS */
.category-card, .product-card, .offer-card, .upcoming-card, .news-card, .testimonial-card{ background:#111111;border-radius:12px;overflow:hidden;padding:1rem;transition:0.3s;box-shadow:0 0 15px rgba(255, 252, 92, 0.2); }

.category-card:hover, .product-card:hover, .offer-card:hover, .upcoming-card:hover, .news-card:hover, .testimonial-card:hover{ transform:translateY(-5px);box-shadow:0 0 25px rgba(255, 228, 92, 0.6);filter:drop-shadow(0 0 10px #ffd900a3); }

/* NEWSLETTER */
.newsletter-form{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;margin-top:1rem}

.newsletter input{padding:0.8rem 1.2rem;border-radius:8px;border:none;min-width:220px}

.newsletter-btn { padding: 0.9rem 2.2rem; border-radius: 12px; border: none; cursor: pointer; font-weight: 600; font-size: 1rem; color: #fff; background: linear-gradient(45deg, #ffd900b2, #BFA06D); box-shadow: 0 0 20px rgba(255, 222, 92, 0.5); transition: all 0.3s ease; position: relative; min-width: 160px; }

.newsletter-btn:hover { transform: translateY(-3px); box-shadow: 0 0 35px rgba(255, 217, 0, 0.699); }

.newsletter-btn:disabled { opacity: 0.7; cursor: not-allowed; }

/* Spinner */
.spinner { width: 18px; height: 18px; border: 3px solid rgba(255, 255, 255, 0.3); border-top: 3px solid white; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite; }

/* FOOTER */
.footer{padding:2rem;text-align:center;background:#000;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}

.footer .social a { margin:0 1rem; color:#ffd900a0; text-decoration:none; transition: all 0.3s ease; }

.footer .social a:hover { color: #fff; transform: translateY(-3px); text-shadow:0 0 12px #ffd900a8 }

.home { overflow-x: visible; }

.home-wrapper { width: 100vw; overflow-x: visible; margin: 0 auto; }

/* Número de teléfono destacado */
.phone { display: inline-block; margin: 0rem 0; padding: 0.5rem 1rem; background: linear-gradient(135deg, #9cc379c9, #9dff00a4); color: #000; font-weight: 700; border-radius: 12px; box-shadow: 0 0 10px rgba(94, 255, 0, 0.6); text-decoration: none; transition: all 0.3s ease; }

.phone:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(85, 255, 0, 0.8); }

/* LOCATION SECTION */
.location{ padding:4rem 1rem; text-align:center; }

.location-card{ display:grid; grid-template-columns:1fr 1fr; gap:2rem; background:#111; border-radius:14px; padding:2rem; box-shadow:0 0 25px rgba(255,217,0,0.15); max-width:1100px; margin:auto; }

.location-info h3{ font-size:1.6rem; margin-bottom:10px; color:#ffe27a; }

.location-info p{ opacity:0.85; margin-bottom:1.5rem; line-height:1.6; }

/* Centrar los botones y la dirección */
.location-info { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; text-align: center; }

.location-actions{ display:flex; justify-content: center; gap:1rem; margin-top: 0.5rem; flex-wrap:wrap; }

.location-btn{ padding:0.8rem 1.6rem; border-radius:10px; font-weight:600; text-decoration:none; transition:all 0.3s ease; }

.location-btn.waze{ background:linear-gradient(45deg,#33ccffa5,#99eaf5d0); color:#000; }

.location-btn.waze:hover{ transform:translateY(-3px); box-shadow:0 0 20px #33ccff; }

.location-btn.maps{ background:linear-gradient(45deg,#ffffffb2,#bf6d6d); color:#000; }

.location-btn.maps:hover{ transform:translateY(-3px); box-shadow:0 0 20px #ff0000; }

.location-map iframe{ width:100%; height:260px; border:0; border-radius:10px; }

/* Estilo especial para el mapa */
.styled-map { width: 100%; height: 300px; border-radius: 16px; border: 2px solid #ffd700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; }

.styled-map:hover { transform: scale(1.02); box-shadow: 0 0 35px rgba(255, 215, 0, 0.5); }

/* RESPONSIVE */
@media(max-width:900px){
  .location-card{ grid-template-columns:1fr; }
  .location-map { margin-top: 1.5rem; }
}

/* RESPONSIVE */
@media(max-width:900px){
.location-card{ grid-template-columns:1fr; }
}

/* ANIMACIONES */
@keyframes fadeUp { 
  from{ opacity:0;transform:translateY(30px)}
  to{opacity:1;transform:translateY(0)}
}

@keyframes spin {
to { transform: rotate(360deg); }
}

/* RESPONSIVE */
@media(max-width:500px){

  .hero-actions button { width: 90%; /* Que no toque los bordes en pantallas muy pequeñas */ max-width: none; }

  .hero-actions{ flex-direction:column }
  
  .content { gap: 30px; }

  .carousel-row > * { min-width: 220px; }
}

/* Solo permitir scroll cuando sea necesario */
@media (min-width: 1024px) {
  .carousel-row { overflow-x: visible; justify-content: center; }
}
</style>
