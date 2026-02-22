<template>
  <LazySection>
    <div class="window news" v-reveal>
      <h1 class="neon-text pulse">Noticias de Videojuegos</h1>
      <NewsSkeleton v-if="loading" />      
      <ul v-else>
        <li v-for="newsItem in news" :key="newsItem.id" class="news-item">
          <img
            :src="newsItem.image"
            :alt="newsItem.title"
            class="news-image"
          />
          <h3 class="neon-text">{{ newsItem.title }}</h3>
          <p>{{ newsItem.description }}</p>

          <small class="news-date">{{ newsItem.date || '' }}</small>
        </li>
      </ul>
    </div>
  </LazySection>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import LazySection from '@/components/utils/LazySection.vue'
import NewsSkeleton from '@/components/skeletons/NewsSkeleton.vue'
import { useHead } from '@vueuse/head'
//import newsData from '@/data/news.json'
//import Card from '@/components/Card.vue'
//import { newsList } from '@/data/news'

import { useRouteMetrics } from '@/composables/useRouteMetrics'
//import type { NewsItem } from '@/types/news'
import { fetchNews } from '@/api/news'

interface NewsItem {
  id: number
  title: string
  //content: string
  description: string
  image?: string
  author?: string
  date?: string
}

const buildArticlesSchema = (items: NewsItem[]) => ({
  "@context": "https://schema.org",
  "@graph": items.map(item => ({
    "@type": "Article",
    "headline": item.title,
    "description": item.description.slice(0, 160),
    "image": item.image || defaultImage, //"https://videogames-vue.vercel.app/assets/news-banner.jpg",
    "datePublished": item.date || article.datePublished, //"2026-01-19",
    "author": {
      "@type": "Organization",
      "name": item.author || article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Videogames Store",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lucycell.vercel.app/assets/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://lucycell.vercel.app/news#${item.id}`
    }
  }))
})


const news = ref<NewsItem[]>([
  //{ id: 1, title: 'Nuevo DLC de Zelda', content: 'Explora nuevas tierras y aventuras épicas en Hyrule.' },
  //{ id: 2, title: 'Mario Kart 9 anunciado', content: 'Prepárate para nuevas pistas, personajes y modos online.' },
  //{ id: 3, title: 'Minecraft actualiza mobs', content: 'Nuevos mobs y biomas para explorar y construir.' },
])

const loading = ref(true)

const defaultImage = 'https://lucycell.vercel.app/assets/news-banner.jpg'

const article = {
  title: "Ultimas Noticias en videojuegos",
  author: "Tu Nombre",
  datePublished: "2026-01-19",
  image: "https://lucycell.vercel.app/assets/news-banner.jpg",
  description: "Resumen de la noticia para SEO y snippet"
}

const articlesSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': news.value.map(item => ({
    '@type': 'Article',
    headline: item.title,
    description: item.description.slice(0, 160),
    image: item.image || defaultImage,
    datePublished: item.date || article.datePublished,
    author: {
      '@type': 'Organization',
      name: item.author || article.author
    },
    publisher: {
      '@type': 'Organization',
      name: article.author,
      logo: {
        '@type': 'ImageObject',
        url: 'https://lucycell.vercel.app/assets/logo.png'
      } 
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lucycell.vercel.app/news#${item.id}`
    }
  }))
}))

// ref para almacenar el schema dinámico
//const schemaArticles = ref({})

//watch(news, (value) => {
//  if (!value.length) return
//  schemaArticles.value = buildArticlesSchema(value)
//})


// Simulación de fetch de API
// const NEWS_API = 'http://localhost:3000/news'
onMounted(async () => {
  try {
    // Simulación de fetch API
    news.value = await fetchNews()
  } catch (err) {
    console.error('Error cargando noticias:', err)
  } finally {
    loading.value = false
  }

     // Simulación de carga real (UX profesional)
   // await new Promise(resolve => setTimeout(resolve, 600))
})

useHead(() => ({
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
          "name": article.author,
          "logo": { "@type": "ImageObject", "url": "https://lucycell.vercel.app/assets/logo.png" }
        },
        "image": article.image,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://lucycell.vercel.app/news"
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(articlesSchema.value)
    }
  ]
}))

useRouteMetrics()
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

.news-image {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 0.5rem;
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

.news-item {
  margin-bottom: 1.5rem;
}
.news-date {
  color: #aaa;
  font-size: 0.85rem;
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
