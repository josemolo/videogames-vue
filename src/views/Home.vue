<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
  <div class="home">

    <!-- HERO -->
    <Hero
      :video="gamingBg"
      @shop="goToShop"
      @news="goToNews"
      :refCanvas="canvasRef" 
    />

    <!-- SECCIONES SIMPLES -->
 <SectionGrid v-if="games && games.length" title="Juegos Destacados">
  <Card
    v-for="game in games"
    :key="game.id"
    :title="game.title"
    :description="game.description"
    :image="game.image"
  />
</SectionGrid>

    <!-- PRODUCTOS -->
    <section class="products">
      <h2>Productos Destacados</h2>
      <div class="product-grid">
        <Card
          v-for="p in featuredProducts"
          :key="p.id"
          :image="p.image"
          :title="p.name"
          :description="p.price"
          button="Ver producto"
        />
      </div>
    </section>

    <!-- NOTICIAS -->
    <section class="news">
      <h2>Últimas Noticias</h2>
      <div class="news-grid">
        <Card
          v-for="n in newsList"
          :key="n.id"
          :image="n.image"
          :title="n.title"
          :description="n.description"
        />
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="testimonials">
      <h2>Lo que dicen nuestros gamers</h2>
      <div class="testimonial-grid">
        <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
          <p>"{{ t.text }}"</p>
          <span>- {{ t.name }}</span>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter">
      <h2>Suscríbete y recibe ofertas</h2>
      <div class="newsletter-form">
        <input type="email" placeholder="Tu correo" />
        <button class="primary">Suscribirse</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div>© 2025 VortexGames</div>
      <div class="social">
        <a v-for="s in socials" :key="s" href="#">{{ s }}</a>
      </div>
    </footer>

  </div>
</template>


<script setup>

import { useHead } from '@vueuse/head'

useHead({
  title: 'VortexGames | Consolas, Juegos y Accesorios Gamer',
  meta: [
    { name: 'description', content: 'Compra consolas, juegos y accesorios gamer con envíos rápidos y precios competitivos.' }
  ]
})  

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import gamingBg from '@/assets/videos/gaming.mp4'
import Hero from '@/components/Hero.vue'
import SectionGrid from '@/components/SectionGrid.vue'
import Card from '@/components/Card.vue'
import { useParticles } from '@/composables/useParticles'

import games from '@/data/games.json'
import featuredProducts from '@/data/featuredProducts.json'
import newsList from '@/data/news.json'

import { useScrollAnimation } from '@/composables/useScrollAnimation'

useScrollAnimation('.card') 


const router = useRouter()
const goToShop = () => router.push('/consoles')
const goToNews = () => router.push('/news')

const canvasRef = ref(null)

useParticles(canvasRef)

const simpleSections = [
  { title: 'Categorías', items: ['PlayStation','Xbox','Nintendo','PC Gamer'] },
  { title: 'Ofertas Especiales', items: ['20% en PS5','Bundle PC Gamer','Accesorios'] },
  { title: 'Próximos Lanzamientos', items: ['Juego X - 2026','Juego Y - 2026','Juego Z - 2026'] }
]
/*
const featuredProducts = [
  {id:1,name:'PlayStation 5',price:'$499',image:'https://picsum.photos/250/150'},
  {id:2,name:'Xbox Series X',price:'$499',image:'https://picsum.photos/250/150'},
  {id:3,name:'Nintendo Switch',price:'$299',image:'https://picsum.photos/250/150'},
  {id:4,name:'PC Gamer',price:'$999',image:'https://picsum.photos/250/150'},
]

const newsList = [
  {id:1,title:'Nuevo lanzamiento',description:'El juego X salió hoy',image:'https://picsum.photos/250/150'} ,
  {id:2,title:'Evento gamer',description:'Torneo este fin de semana',image:'https://picsum.photos/250/150'},
  {id:3,title:'Oferta especial',description:'20% en consolas',image:'https://picsum.photos/250/150'},
]
*/
const testimonials = [
  { name:'Gamer123', text:'Excelente tienda y envío rápido!' },
  { name:'ProGamer', text:'Gran variedad y precios inmejorables.' }
]

const socials = ['Twitch','YouTube','Discord']
/*
const games = [
  {
    id: 1,
    title: 'Cyber Adventure',
    description: 'Un juego de acción futurista.',
    image: 'https://picsum.photos/300/180'
  },
  {
    id: 2,
    title: 'Fantasy World',
    description: 'Explora un mundo lleno de magia.',
    image: 'https://picsum.photos/300/180'
  },
  {
    id: 3,
    title: 'Racing Pro',
    description: 'Carreras a máxima velocidad.',
    image: 'https://picsum.photos/300/180'
  }
]
*/

console.log('games:', games)
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
.particle-canvas{position:absolute;inset:0;z-index:-1;pointer-events:none}

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
