<template>
  <LazySection>
    <div class="window news" v-reveal>
      <h1  class="neon-text pulse">Noticias de Videojuegos</h1>
      <NewsSkeleton v-if="loading" />      
      <ul>
        <li v-for="newsItem in news" :key="newsItem.id" class="news-item">
          <h3 class="neon-text">{{ newsItem.title }}</h3>
          <p>{{ newsItem.content }}</p>
        </li>
      </ul>
    </div>
  </LazySection>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LazySection from '@/components/utils/LazySection.vue'
import NewsSkeleton from '@/components/skeletons/NewsSkeleton.vue'
import { useHead } from '@vueuse/head'
//import Card from '@/components/Card.vue'
//import { newsList } from '@/data/news'


interface NewsItem {
  id: number
  title: string
  content: string
  image?: string
  author?: string
  date?: string
}

const buildArticlesSchema = (items: NewsItem[]) => ({
  "@context": "https://schema.org",
  "@graph": items.map(item => ({
    "@type": "Article",
    "headline": item.title,
    "description": item.content.slice(0, 160),
    "image": item.image || "https://videogames-vue.vercel.app/assets/news-banner.jpg",
    "datePublished": item.date || "2026-01-19",
    "author": {
      "@type": "Person",
      "name": item.author || "Videogames Store"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Videogames Store",
      "logo": {
        "@type": "ImageObject",
        "url": "https://videogames-vue.vercel.app/assets/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://videogames-vue.vercel.app/news#${item.id}`
    }
  }))
})


const loading = ref(true)

const news = ref<NewsItem[]>([
  { id: 1, title: 'Nuevo DLC de Zelda', content: 'Explora nuevas tierras y aventuras épicas en Hyrule.' },
  { id: 2, title: 'Mario Kart 9 anunciado', content: 'Prepárate para nuevas pistas, personajes y modos online.' },
  { id: 3, title: 'Minecraft actualiza mobs', content: 'Nuevos mobs y biomas para explorar y construir.' },
])

const article = {
  title: "Ultimas Noticias en videojuegos",
  author: "Tu Nombre",
  datePublished: "2026-01-19",
  image: "https://videogames-vue.vercel.app/assets/news-banner.jpg",
  description: "Resumen de la noticia para SEO y snippet"
}

// Simulación de fetch de API
const NEWS_API = 'http://localhost:3000/news'
onMounted(async () => {
  try {
    const res = await fetch(NEWS_API)
    if (!res.ok) throw new Error('Error al cargar noticias')
    const data = (await res.json()) as NewsItem[]
    news.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

useHead({
  title: article.title,
  meta: [
    { name: 'description', content: article.description },
    { property: 'og:title', content: article.title },
    { property: 'og:description', content: article.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: article.image }, //'/og/news.png' 
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
  ],

  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "datePublished": article.datePublished,
        "author": { "@type": "Organization", "name": article.author },
        "publisher": {
          "@type": "Organization",
          "name": "Videogames store",
          "logo": { "@type": "ImageObject", "url": "https://videogames-vue.vercel.app/assets/logo.png" }
        },
        "image": article.image,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://videogames-vue.vercel.app/news"
        }
      })
    }
  ]
})
</script>

<style scoped>
.window {
  background: #1c1c2f;
  border: 3px solid #bf97ea;
  border-radius: 15px;
  padding: 30px;
  width: 500px;
  margin: 20px auto;
  box-shadow: 0 0 20px #bf97ea, 0 0 40px #6d307a;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
}

.window h1 {
  text-align: center;
  color: #bf97ea;
  text-shadow: 0 0 10px #bf97ea, 0 0 20px #6d307a;
  margin-bottom: 20px;
}

.news-item {
  border-bottom: 1px solid #6d307a;
  border: 1px solid #00ffff;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border-radius: 8px;
  padding: 10px;
  will-change: transform, box-shadow;
}

.news-item:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff;
}

.news-item h3 {
  color: #00ffff;
  margin-bottom: 5px;
}

.news-item p {
  font-size: 0.9rem;
  color: #ccc;
}

.neon-text {
  color: #00ffff;
  text-shadow:
    0 0 5px #00ffff,
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 40px #00ffff;
  transition: text-shadow 0.3s ease, color 0.3s ease;
}

.neon-text:hover {
  color: #ff00ff;
  text-shadow:
    0 0 10px #ff00ff,
    0 0 20px #ff00ff,
    0 0 30px #ff00ff,
    0 0 50px #ff00ff;
}

@keyframes neonPulse {
  0%, 100% {
    text-shadow:
      0 0 5px #00ffff,
      0 0 10px #00ffff,
      0 0 20px #00ffff,
      0 0 40px #00ffff;
  }
  50% {
    text-shadow:
      0 0 10px #00ffff,
      0 0 20px #00ffff,
      0 0 30px #00ffff,
      0 0 60px #00ffff;
  }
}

.neon-text.pulse {
  animation: neonPulse 1.5s infinite alternate;
}
</style>
