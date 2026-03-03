<template>
  <LazySection>
    <section class="news-page" v-reveal>
      
      <h1 class="page-title neon-text pulse">
        Noticias
      </h1>

      <NewsSkeleton v-if="loading" />

      <div v-if="!loading" class="news-container">

        <!-- NOTICIA PRINCIPAL -->
        <article
          v-if="news.length"
          class="featured-news"
          :class="{ active: expandedId === news[0].id }"
        >
          <img
            :src="news[0].image"
            :alt="news[0].title"
          />

          <div class="featured-overlay">
            <div class="featured-info">  
              <h2>{{ news[0].title }}</h2>
              <p>{{ news[0].description }}</p>
              <span class="news-date">{{ news[0].date }}</span>
            </div>  
            <!-- BOTÓN EXPAND -->
            <div
              class="featured-expand"
              :class="{ rotate: expandedId === news[0].id }"
              @click.stop="toggleNews(news[0].id)"
            >
              +
            </div>
          </div>

          <!-- CONTENIDO EXPANDIBLE PREMIUM -->
          <transition name="expand">
            <div
              v-if="expandedId === news[0].id"
              class="featured-expanded"
            >
              <p>{{ news[0].content }}</p>
              <button class="close-btn" @click="expandedId = null">Cerrar</button>
            </div>
          </transition>
        </article>

        <!-- GRID RESTO -->
        <div class="news-grid">
          <article
            v-for="item in news.slice(1)"
            :key="item.id"
            class="news-card"
            :class="{ active: expandedId === item.id }"
          >
            <div class="news-header">
              <img :src="item.image" :alt="item.title" />
              <div class="news-info">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <span class="news-date">{{ item.date }}</span>
              </div> 

              <!-- ICONO + -->
              <div
                class="expand-icon"
                :class="{ rotate: expandedId === item.id }"
                @click.stop="toggleNews(item.id)" 
              >
                +
              </div>
            </div>
                
            <!-- CONTENIDO EXPANDIDO -->
            <transition name="expand">
              <div class="expand-wrapper" :class="{ open: expandedId === item.id }">  
                <div class="expand-content" v-if="expandedId === item.id">
                  <p>{{ item.content }}</p>
                  <button class="close-btn" @click="expandedId = null">Cerrar</button>
                </div>
              </div>  
            </transition>
          </article>
        </div>       
      </div>
    </section>
  </LazySection>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import LazySection from '@/components/utils/LazySection.vue'
import NewsSkeleton from '@/components/skeletons/NewsSkeleton.vue'
import { fetchNews } from '@/api/news'
import { useHead } from '@vueuse/head'
import { useRouteMetrics } from '@/composables/useRouteMetrics'
import type { NewsItem } from '@/types/news'


/*interface NewsItem {
  id: number
  title: string
  description: string
  image?: string
  date?: string
  content?: string  
  showInHome?: boolean
}*/

const router = useRouter()
const news = ref<NewsItem[]>([])
const loading = ref(true)
const expandedId = ref<number | null>(null)

const toggleNews = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id

  const item = news.value.find(n => n.id === id)
  if (window.gtag && item) {
    window.gtag('event', 'news_expand', {
      event_category: 'engagement',
      event_label: item.title,
      value: id
    })
  }
}


const articleMeta = {
  title: "Noticias Gamer - LucyCell",
  description: "Mantente al día con las últimas noticias del mundo gamer.",
  image: "https://lucycell.vercel.app/assets/news-banner.jpg"
}



// SEO dinámico para noticia expandida
watch(expandedId, (id: number | null) => {
  if (!id) return
  const item = news.value.find(n => n.id === id)
  if (!item) return

  useHead({
    title: item.title,
    meta: [
      { name: 'description', content: item.description },
      { property: 'og:title', content: item.title },
      { property: 'og:description', content: item.description },
      { property: 'og:image', content: item.image }
    ]
  })
})

onMounted(async () => {
  try {
    news.value = await fetchNews()
  } catch (error) {
    console.error('Error cargando noticias', error)
  } finally {
    loading.value = false
  }
})

// SEO principal
useHead({
  title: articleMeta.title,
  meta: [
    { name: 'description', content: articleMeta.description },
    { property: 'og:title', content: articleMeta.title },
    { property: 'og:description', content: articleMeta.description },
    { property: 'og:image', content: articleMeta.image }
  ]
})

useRouteMetrics()
</script>

<style scoped>
.news-page { max-width: 1200px; margin: 0 auto; padding: 60px 20px; color: white; }
.page-title { 
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  font-size: clamp(2.8rem, 6vw, 4rem); 
  font-weight: 900;
  margin-bottom: 70px;
  letter-spacing: 4px; 
  text-transform: uppercase;
  
  background: linear-gradient(90deg, #7f5cff, #00e0ff, #7a48b1);
  background-size: 500% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: neonFlow 60s ease infinite;
  position: relative;

  text-shadow:
    0 0 10px rgba(127, 92, 255, 0.224),
    0 0 20px rgba(255, 0, 255, 0.313),
    0 0 40px rgba(127, 92, 255, 0.4);
}



/* Línea decorativa debajo */
/*.page-title::after {
  content: '';
  display: block;
  width: 720px;
  height: 3px;
  margin: 15px auto 0;
  background: linear-gradient(90deg, #7f5cff, #845c9e);
  border-radius: 10px;
  box-shadow: 0 0 10px #7f5cff, 0 0 20px #583058;
}*/

/* FEATURED */
.featured-news { 
  position: relative; 
  border-radius: 22px; 
  overflow: hidden; 
  /*cursor: pointer; */
  transition: all 0.4s ease; 
  margin-bottom: 50px; 
  border: 1px solid rgba(127, 92, 255, 0.3);
}

.featured-news:hover { 
  transform: translateY(-6px); 
  box-shadow:
    0 0 10px rgba(127, 92, 255, 0.6),
    0 0 25px rgba(127, 92, 255, 0.6),
    0 0 50px rgba(127, 92, 255, 0.6);
}

.featured-news img { 
  width: 100%; 
  height: 420px; 
  object-fit: cover; 
  filter: brightness(0.75); 
  display: block; 
}

.featured-overlay { position: absolute; bottom: 0; width: 100%; padding: 40px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); }
.featured-overlay h2 { font-size: 2rem; margin-bottom: 10px; }
.featured-overlay p { opacity: 0.9; margin-bottom: 10px; }
.featured-expand { position: absolute; top: 20px; right: 30px; font-size: 2.5rem; font-weight: bold; color: #7f5cff; cursor: pointer; transition: transform 0.4s ease; }
.featured-expand.rotate { transform: rotate(45deg); color: #34ccc4; }
.featured-expanded { 
  position: relative; 
  background: linear-gradient(180deg, rgba(15,15,30,0.95), rgba(10,10,20,0.95)); 
  padding: 35px; 
  border-radius: 0 0 20px 20px; 
  margin-top: -5px; 
  border-top: 1px solid rgba(127,92,255,0.5); 
  box-shadow: 0 20px 40px rgba(0,0,0,0.6); 
  animation: fadeIn 0.4s ease; }

/* GRID */
.news-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.news-card { background: rgba(25,25,45,0.7); backdrop-filter: blur(10px); border-radius: 18px; margin-bottom: 30px; padding: 20px; cursor: pointer; transition: all 0.4s ease; border: 1px solid rgba(127,92,255,0.3); overflow: hidden; position: relative; }
.news-card.active { border: 1px solid rgba(127,92,255,0.6); box-shadow: 0 0 10px rgba(127,92,255,0.4), 0 0 25px rgba(127,92,255,0.6), 0 0 45px rgba(127,92,255,0.4); }
.news-header { display: flex; flex-direction: column; gap: 10px; }
.news-header img { width: 100%; height: 180px; object-fit: cover; border-radius: 12px; }
.news-info { flex: 1; }
.news-info h2 { margin-bottom: 6px; }
.news-info p { font-size: 0.9rem; opacity: 0.85; }
.news-date { font-size: 0.75rem; color: #aaa; }

.news-expanded { margin-top: 15px; padding: 15px; background: rgba(0,0,0,0.4); border-radius: 12px; font-size: 0.9rem; line-height: 1.6; animation: fadeIn 0.3s ease; }

.close-btn { margin-top: 10px; background: transparent; border: 1px solid #7f5cff; color: #7f5cff; padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; }
.close-btn:hover { background: #7f5cff; color: white; }
.news-card:hover { transform: translateY(-6px); box-shadow: 0 0 20px rgba(127,92,255,0.6); }
.news-card img { width: 100%; border-radius: 12px; margin-bottom: 15px; }
.news-card h3 { margin-bottom: 10px; }
.news-card p { font-size: 0.9rem; opacity: 0.85; }
.news-date { font-size: 0.75rem; color: #aaa; }

/* HEADER */
.news-header { display: flex; gap: 20px; padding: 20px; cursor: pointer; align-items: center; position: relative; }
.news-header img { width: 100%; height: 180px; object-fit: cover; border-radius: 12px; }
.news-info { flex: 1; }
.news-info h2 { margin-bottom: 6px; }
.news-info p { font-size: 0.9rem; opacity: 0.85; }

/* ICONO + */
.expand-icon { position: absolute; top: 250px; right: 10px; font-size: 2rem; font-weight: bold; color: #7f5cff; cursor: pointer; transition: transform 0.4s ease, color 0.3s ease;}
.expand-icon.rotate { transform: rotate(45deg); color: #34ccc4; }

/* EXPANSIÓN ULTRA FLUIDA */
.expand-wrapper { max-height: 0; overflow: hidden; transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease; opacity: 0; }
.expand-wrapper.open { max-height: 500px; opacity: 1; }
.expand-content { padding: 10px 0 20 20; line-height: 1.6; font-size: 0.95rem; opacity: 0.95; }
.close-btn { margin-top: 10px; background: transparent; border: 1px solid #7f5cff; color: #7f5cff; padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; }
.close-btn:hover { background: #7f5cff; color: white; }

/* TRANSICIÓN */
.expand-enter-active, .expand-leave-active { transition: all 0.35s ease; }
.expand-enter-from, .expand-leave-to { opacity: 0; transform: translateY(-10px); }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Animación del gradiente */
@keyframes neonFlow {
  500% { background-position: 500% }
  100% { background-position: 150% }
}

/* RESPONSIVE */
@media (min-width: 1024px) {
  .news-grid { grid-template-columns: repeat(3, 1fr); }
  .news-header { flex-direction: column; align-items: flex-start; }
  .news-header img { width: 100%; height: 100px; object-fit: cover; }
  .expand-icon { align-self: flex-end; }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>