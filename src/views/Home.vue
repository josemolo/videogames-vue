  <template>  
    <div class="home-wrapper">
      <!--<canvas ref="canvasRef" class="particle-canvas"></canvas>-->
      <div class="home">

      <Hero 
      :video="gamingBg" 
      @shop="goToShop"
      @news="goToNews"
      />

      <HomeCarousel />
        <!--
          :video="gamingBg"
          @shop="goToShop"
          @news="goToNews"
          :refCanvas="canvasRef" 
        -->

        <!-- SECCIONES SIMPLES -->
        <section class="featured-games"> <!--v-if="games && games.length"--> <!--v-reveal-->
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
              v-for="p in featuredProducts"
              :key="p.id"
              :id="p.id"
              :image="p.image"
              :title="p.name"
              :price="Number(p.price)"
              variant="product"
              :added="addedProductId === p.id"
              @buy="handleAddToCart(p)"
            ><!--:description="p.price"-->
              <!--<router-link :to="`/console/${p.id}`" class="product-button primary">Ver producto</router-link>-->
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
        <section class="newsletter" v-reveal>
          <h2>Suscríbete y recibe ofertas</h2>
          <form class="newsletter-form" @submit.prevent="handleSubscribe">
            <input 
              type="email" 
              placeholder="Tu correo" 
              v-model="email" 
              required 
            />
            <button class="newsletter-btn" type="submit" :disabled="loading" >
              <span v-if="!loading">Suscribirme</span>
              <span v-else class="spinner"></span>
            </button>
          </form>
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
  //import { inject } from 'vue'
  import HomeCarousel from '@/components/HomeCarousel.vue'

  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  import { useHead } from '@vueuse/head'

  //import gamingBg from '@/assets/videos/gaming.mp4'
  import Hero from '@/components/Hero.vue'
  import SectionGrid from '@/components/SectionGrid.vue'
  import Card from '@/components/Card.vue'

  /*import { useParticles } from '@/composables/useParticles'*/

  import gamesData from '@/data/games.json'
  import featuredProductsData from '@/data/featuredProducts.json'
  import newsListData from '@/data/news.json'

  import { useScrollAnimation } from '@/composables/useScrollAnimation'

  import { useRouteMetrics } from '@/composables/useRouteMetrics'

  import { useUserStore } from '@/stores/user'
  import { useCartStore } from '@/stores/cart'

  import { supabase } from '@/lib/supabase'


  import rawNewsData from '@/data/news.json'

  import type { NewsItem } from '@/types/news'

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

  //useHead({ title:'VortexGames | Consolas, Juegos y Accesorios Gamer', meta:[{ name:'description', content:'Compra consolas, juegos y accesorios gamer con envíos rápidos y precios competitivos.' }] })
    
  const userStore = useUserStore()
  const cartStore = useCartStore()

  const router = useRouter()

  const goToShop = () => router.push('/consoles')
  const goToNews = () => router.push('/news')

  const addedGameId = ref<string | number | null>(null)
  const addedProductId = ref<string | null>(null)

  const email = ref('')
  const loading = ref(false)


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

  /* HERO */
  .carousel-row {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;  /* 🔥 iPhone smooth */
    padding-bottom: 10px;
    padding: 70px 5px 50px;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    /*justify-content: center; CENTRAR EN DESKTOP*/
  }

  .carousel-row::-webkit-scrollbar {
    height: 8px;
  }

  .carousel-row::-webkit-scrollbar-thumb {
    background: #e0d798;
    border-radius: 10px;
  }

  .carousel-row :deep(.card) {
    flex: 0 0 200px; /* antes seguro estaba 280 o más */
    max-width: 200px;
    /*transform: scale(0.95);*/
  }

  .carousel-row :deep(img) {
    width: 100%;
    height: 190px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.4s ease;
  }

  .carousel-row :deep(.card:hover img) {
    transform: scale(1.05);
  }

  .carousel-row > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
    min-width: 280px;
  }

 

  .hero{position:relative;height:100vh;display:flex;justify-content:center;align-items:center;text-align:center;color:#efe5b3;overflow:hidden;}
  .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.2) contrast(1.1);z-index:-3}
  .hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.7);z-index:-2}
  .hero-content{position:relative;max-width:900px;padding:20px;z-index:2;animation:fadeUp 1s ease-out forwards;}
  .badge{display:inline-block;padding:6px 14px;margin-bottom:1rem;border-radius:20px;font-size:0.8rem;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.6);backdrop-filter:blur(6px)}
  
  .hero-title{
    font-size:clamp(3rem,8vw,6rem);font-weight:900;font-family:'Orbitron',sans-serif;color:#93894f;text-shadow:0 0 20px rgba(221, 204, 118, 0.84),0 0 40px rgba(171, 180, 70, 0.6);}
  
    .hero-text{margin-top:1rem;font-size:clamp(1.1rem,2.5vw,1.4rem);opacity:0.95;}
  .hero-actions{margin-top:2.5rem;display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}
  .hero-actions button{
    padding:0.9rem 2.4rem;
    font-size:1.1rem;
    border-radius:12px;
    cursor:pointer;
    transition:all 0.3s ease;
    font-weight:600;

    width: auto;       /* Evita que ocupen todo el ancho */
    min-width: 140px;  /* Tamaño mínimo legible */
    max-width: 250px;  /* Tamaño máximo razonable */
  }
  .primary{border:none;background:linear-gradient(45deg,#ffd900cd,#BFA06D);color:#fff;box-shadow:0 0 30px rgba(255,215,0,0.6)}
  .primary:hover{transform:translateY(-4px);box-shadow:0 0 50px rgba(255, 217, 0, 0.612)}
  .secondary{background:transparent;color:#e6e3a7;border:2px solid #e6e6a7}
  .secondary:hover{background:rgba(68, 0, 255, 0.15)}
  .particle-canvas{position:fixed;inset:0;z-index:-3;pointer-events:none}

  /* SECCIONES */
  section {
    padding:4rem 2rem;
    text-align:center;
    color:#fff0bc;
    max-width: 1400px;  /* 🔥 centra contenido */
    margin: 0 auto;
  }
  section h2{font-size:clamp(2rem,5vw,2.5rem);margin-bottom:2rem;color:#f9eead;text-shadow:0 0 10px #fff4b8;}

  /* GRIDS */
  .category-grid, .product-grid, .offer-grid, .upcoming-grid, .news-grid, .testimonial-grid{
    display:grid;
    gap:2rem;
  }
  .category-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
  .product-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
  .offer-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
  .upcoming-grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
  .news-grid{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
  .testimonial-grid{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}

  /* TARJETAS */
  .category-card, .product-card, .offer-card, .upcoming-card, .news-card, .testimonial-card{
    background:#111111;border-radius:12px;overflow:hidden;padding:1rem;transition:0.3s;box-shadow:0 0 15px rgba(255, 252, 92, 0.2);
  }
  .category-card:hover, .product-card:hover, .offer-card:hover, .upcoming-card:hover, .news-card:hover, .testimonial-card:hover{
    transform:translateY(-5px);box-shadow:0 0 25px rgba(255, 228, 92, 0.6);filter:drop-shadow(0 0 10px #ffd900a3);
  }

  /* NEWSLETTER */
  .newsletter-form{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;margin-top:1rem}
  .newsletter input{padding:0.8rem 1.2rem;border-radius:8px;border:none;min-width:220px}
  .newsletter-btn {
    padding: 0.9rem 2.2rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
    background: linear-gradient(45deg, #ffd900b2, #BFA06D);
    box-shadow: 0 0 20px rgba(255, 222, 92, 0.5);
    transition: all 0.3s ease;
    position: relative;
    min-width: 160px;
  }

  .newsletter-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(255, 217, 0, 0.699);
  }

  .newsletter-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    display: inline-block;
    animation: spin 0.8s linear infinite;
  }

  /* FOOTER */
  .footer{padding:2rem;text-align:center;background:#000;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
  .footer .social a {
    margin:0 1rem;
    color:#ffd900a0;
    text-decoration:none;
    transition: all 0.3s ease;
  }

  .footer .social a:hover {
    color: #fff;
    transform: translateY(-3px);
    text-shadow:0 0 12px #ffd900a8
  }

  .home {
    overflow-x: hidden;
  }

  /* ANIMACIONES */
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

  

  @keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

  /* RESPONSIVE */
  @media(max-width:500px){

    .hero-actions button {
      width: 90%;      /* Que no toque los bordes en pantallas muy pequeñas */
      max-width: none;
    }
    .hero-actions{
      flex-direction:column
    }
    .content {
      gap: 30px;
    }

    .carousel-row > * {
      min-width: 220px;
    }

  }

  /* Solo permitir scroll cuando sea necesario */
  @media (min-width: 1024px) {
    .carousel-row {
      overflow-x: visible;
      justify-content: center;
    }
  }
  </style>
