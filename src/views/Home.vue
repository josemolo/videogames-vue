  <template>  
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
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
  <SectionGrid v-if="games && games.length" title="Juegos Destacados">
    <Card
      v-for="game in games"
      :key="game.id"
      :id="game.id"  
      :title="game.title"
      :description="game.description"
      :image="game.image"
      :price="game.price"
      variant="game"
      @view="$router.push(`/game/${game.id}`)"
    />
  </SectionGrid>

      <!-- PRODUCTOS -->
      <section class="products" v-reveal>
        <h2>Productos Destacados</h2>
        <div class="product-grid">
          <Card
            v-for="p in featuredProducts"
            :key="p.id"
            :id="p.id"
            :image="p.image"
            :title="p.name"
            :description="p.price"
            :price="Number(p.price)"
            variant="product"
          >
            <!--<router-link :to="`/console/${p.id}`" class="product-button primary">Ver producto</router-link>-->
          </Card>
          

        </div>
      </section>

      <!-- NOTICIAS -->
      <section class="news" v-reveal>
        <h2>Últimas Noticias</h2>
        <div class="news-grid">
          <Card
            v-for="n in newsList"
            :key="n.id"
            :id="n.id"
            :image="n.image"
            :title="n.title"
            :description="n.description"
            variant="news"
            @view="$router.push(`/news/${n.id}`)"
          />
        </div>
      </section>

      <!-- TESTIMONIOS -->
      <section class="testimonials" v-reveal>
        <h2>Lo que dicen nuestros gamers</h2>
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
        <div class="newsletter-form">
          <input type="email" placeholder="Tu correo" />
          <button class="primary">Suscribirse</button>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div>© 2025 LucyCell</div>
        <div class="social">
          <a v-for="s in socials" :key="s" href="#">{{ s }}</a>
        </div>
      </footer>

    </div>
  </template>


  <script setup lang="ts">
  import HomeCarousel from '@/components/HomeCarousel.vue'

  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  import { useHead } from '@vueuse/head'

  //import gamingBg from '@/assets/videos/gaming.mp4'
  import Hero from '@/components/Hero.vue'
  import SectionGrid from '@/components/SectionGrid.vue'
  import Card from '@/components/Card.vue'

  import { useParticles } from '@/composables/useParticles'

  import gamesData from '@/data/games.json'
  import featuredProductsData from '@/data/featuredProducts.json'
  import newsListData from '@/data/news.json'

  import { useScrollAnimation } from '@/composables/useScrollAnimation'

  import { useRouteMetrics } from '@/composables/useRouteMetrics'

  useRouteMetrics()

  useHead({
    title: 'VortexGames | Consolas, Juegos y Accesorios Gamer',
    meta: [
      { name: 'description', content: 'Bienvenido a Gaming Hub, tu portal de videojuegos.' },
      { property: 'og:title', content: 'VortexGames | Consolas y Juegos' },
      { property: 'og:description', name: 'description', content: 'Compra consolas, juegos y accesorios gamer con envíos rápidos y precios competitivos.' },
      { property: 'og:image', content: 'https://res.cloudinary.com/usuario/image/upload/banner.jpg'},
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/og/home.png' }
    ]
  })  

  useScrollAnimation('.card')

  //useHead({ title:'VortexGames | Consolas, Juegos y Accesorios Gamer', meta:[{ name:'description', content:'Compra consolas, juegos y accesorios gamer con envíos rápidos y precios competitivos.' }] })
    
  const router = useRouter()

  const goToShop = () => router.push('/consoles')
  const goToNews = () => router.push('/news')


  const games = ref([ 
    { 
      id: 1, 
      title: "Screamer",
      description: "Juego de broma aparentemente inofensivo.",
      image: "/images/games/screamergame.jpg",
      price: 59.99
    },
    { 
      id: 2, 
      title: "Grand Theft Auto lV",
      description: "Vive los desafios de una ciudad virtual.",
      image: "/images/games/gtaciudad.jpg",
      price: 89.99
    },
    { 
      id: 1, 
      title: "Crimson Desert",
      description: "Un mundo abierto lleno de exploración",
      image: "/images/games/crimsondesert.jpg",
      price: 69.99
    }
]);

  const featuredProducts = ref(featuredProductsData)
  const newsList = ref(newsListData)

  const gamingBg = "https://res.cloudinary.com/dakkfinnu/video/upload/v1767195871/gaming_g0o04l.mp4";

  const canvasRef = ref<HTMLCanvasElement | null>(null)

    
  //const simpleSections = [
  //  { title: 'Categorías', items: ['PlayStation','Xbox','Nintendo','PC Gamer'] },
  //  { title: 'Ofertas Especiales', items: ['20% en PS5','Bundle PC Gamer','Accesorios'] },
  //  { title: 'Próximos Lanzamientos', items: ['Juego X - 2026','Juego Y - 2026','Juego Z - 2026'] }
  //]

  const testimonials = [
    { name:'Gamer123', text:'Excelente tienda y envío rápido!' },
    { name:'ProGamer', text:'Gran variedad y precios inmejorables.' }
  ]

  const socials = ['Whatsapp','Instagram','Facebook']


  let stopParticles: (() => void) | null = null

  onMounted(async () => {
    //await nextTick()
    
     //if (canvasRef.value) {
        stopParticles = useParticles(canvasRef.value) //stopParticles = 
      }
  )

  onBeforeUnmount(() => {
    if (stopParticles) stopParticles()
  })

  //useParticles(canvasRef)

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
  .hero{position:relative;height:100vh;display:flex;justify-content:center;align-items:center;text-align:center;color:#fff;overflow:hidden;}
  .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.2) contrast(1.1);z-index:-3}
  .hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.7);z-index:-2}
  .hero-content{position:relative;max-width:900px;padding:20px;z-index:2;animation:fadeUp 1s ease-out forwards;}
  .badge{display:inline-block;padding:6px 14px;margin-bottom:1rem;border-radius:20px;font-size:0.8rem;background:rgba(137,117,183,0.2);border:1px solid rgba(137,117,183,0.6);backdrop-filter:blur(6px)}
  .hero-title{font-size:clamp(3rem,8vw,6rem);font-weight:900;font-family:'Orbitron',sans-serif;color:#b8a7e6;text-shadow:0 0 20px rgba(184,167,230,0.8),0 0 40px rgba(95,70,180,0.6);}
  .hero-text{margin-top:1rem;font-size:clamp(1.1rem,2.5vw,1.4rem);opacity:0.95;}
  .hero-actions{margin-top:2.5rem;display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap}
  .hero-actions button{padding:0.9rem 2.4rem;font-size:1.1rem;border-radius:12px;cursor:pointer;transition:all 0.3s ease;font-weight:600}
  .primary{border:none;background:linear-gradient(45deg,#7f5cff,#503ec2);color:#fff;box-shadow:0 0 30px rgba(127,92,255,0.6)}
  .primary:hover{transform:translateY(-4px);box-shadow:0 0 50px rgba(127,92,255,0.9)}
  .secondary{background:transparent;color:#b8a7e6;border:2px solid #b8a7e6}
  .secondary:hover{background:rgba(184,167,230,0.15)}
  .particle-canvas{position:fixed;inset:0;z-index:-3;pointer-events:none}

  /* SECCIONES */
  section{padding:4rem 2rem;text-align:center;color:#fff}
  section h2{font-size:clamp(2rem,5vw,2.5rem);margin-bottom:2rem;color:#7f5cff;text-shadow:0 0 10px #7f5cff;}

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
    background:#111111;border-radius:12px;overflow:hidden;padding:1rem;transition:0.3s;box-shadow:0 0 15px rgba(127,92,255,0.2);
  }
  .category-card:hover, .product-card:hover, .offer-card:hover, .upcoming-card:hover, .news-card:hover, .testimonial-card:hover{
    transform:translateY(-5px);box-shadow:0 0 25px rgba(127,92,255,0.6);filter:drop-shadow(0 0 10px #7f5cff);
  }

  /* NEWSLETTER */
  .newsletter-form{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;margin-top:1rem}
  .newsletter input{padding:0.8rem 1.2rem;border-radius:8px;border:none;min-width:220px}

  /* FOOTER */
  .footer{padding:2rem;text-align:center;background:#000;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
  .footer .social a{margin:0 1rem;color:#7f5cff;text-decoration:none;transition:0.3s}
  .footer .social a:hover{text-shadow:0 0 10px #7f5cff}

  /* ANIMACIONES */
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

  /* RESPONSIVE */
  @media(max-width:600px){
    .hero-actions{flex-direction:column}
  }
  </style>
