<template>
  <section class="home-carousel">
    <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :loop="true"
      :speed="700"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false
      }"
      :pagination="{ clickable: true }"
      navigation
      class="carousel-swiper"
    >
      <SwiperSlide
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide"
      >
        <img :src="slide.image" alt="carousel image" />
        <!-- Overlay opcional -->
        <div
          v-if="slide.title || slide.text || slide.button"
          class="overlay"
        >
          <h2 v-if="slide.title">{{ slide.title }}</h2>
          <p v-if="slide.text">{{ slide.text }}</p>
          <button
            v-if="slide.button"
            class="primary"
            @click="go(slide.link)"
          >
            {{ slide.button }}
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useRouter } from 'vue-router'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()

const slides = [
  {
    image: '/images/carousel/consoles.jpg',
    title: '',
    text: '',
    button: '',
    link: '/game/1'
  },
  {
    image: '/images/carousel/gamevortex.jpg',
    title: '',
    text: '',
    button: '',
    link: '/console/1'
  },
  {
    image: '/images/carousel/news.jpg',
    title: '',
    text: '',
    button: '',
    link: '/news'
  },
  {
    image: '/images/carousel/moregames.jpg',
    title: '',
    text: '',
    button: '',
    link: '/console/1'
  },
  {
    image: '/images/carousel/nintendo.jpg',
    title: '',
    text: '',
    button: '',
    link: '/console/1'
  },
  {
    image: '/images/carousel/pspcontrol.jpg',
    title: '',
    text: '',
    button: '',
    link: '/console/1'
  },
  {
    image: '/images/carousel/pspportatil.jpg',
    title: '',
    text: '',
    button: '',
    link: '/console/1'
  },
  {
    image: '/images/carousel/xboxcontrol.jpg',
    title: '',
    text: '',
    button: '',
    link: '/console/1'
  }
]

const go = (link: string) => {
  router.push(link)
}
</script>

<style scoped>
.home-carousel { position: relative;    /* 🔥 FULL BLEED REAL */width: 100vw; max-width: 100vw;  margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); margin-top: 3rem; margin-bottom: 3rem; overflow: hidden; background: #0631c000; }

.carousel-swiper { width: 100%; height: min(70vh, 520px); }

.carousel-slide { position: relative; }

.carousel-slide img { width: 100%; height: 100%; object-fit: cover; }

.carousel-slide::after { content: ""; position: absolute; inset: 0; background: linear-gradient( to right, rgba(86, 86, 86, 0.283), rgba(186, 186, 186, 0.244) 40%, rgba(186, 143, 4, 0.228) 60%, rgba(217, 157, 7, 0.315) ); pointer-events: none; }

/* Overlay solo si hay contenido */
.overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; color: rgb(245, 190, 11); text-align: center; padding: 2rem; }

.overlay h2 { font-size: clamp(2.2rem, 5vw, 3rem); text-shadow: 0 0 25px rgba(255, 255, 255, 0.986); }

.overlay p { margin: 1rem 0 2rem; font-size: 1.1rem; opacity: 0.9; } 

.swiper-button-next,
.swiper-button-prev { color: #ffd900; filter: drop-shadow(0 0 6px #ffd900); transform: scale(0.9); transition: transform 0.3s ease, opacity 0.3s ease; opacity: 0.6; }

.swiper-button-next:hover,
.swiper-button-prev:hover { transform: scale(1.1); opacity: 1; }

.swiper-pagination-bullet { background: #ffae0091; opacity: 0.4; }

.swiper-pagination-bullet-active { background: #fff4b8; opacity: 1; }

.swiper-slide { background: #fff4b8; }

:deep(.swiper-button-next),
:deep(.swiper-button-prev) { color: #ffd900; filter: drop-shadow(0 0 8px #ffd900); transform: scale(0.9); transition: transform 0.3s ease, opacity 0.3s ease; opacity: 0.7; }

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) { transform: scale(1.15); opacity: 1; }

/* círculos del slider */
:deep(.swiper-pagination-bullet) { background: #ffd900; opacity: 0.4; }

:deep(.swiper-pagination-bullet-active) { background: #fff4b8; box-shadow: 0 0 10px #ffd900; opacity: 1; }

@media (max-width: 768px) {
  .carousel-swiper { height: 300px; }
}
</style>

