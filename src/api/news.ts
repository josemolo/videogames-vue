import { NewsItem } from '@/types/news'

import newsData from '@/data/news.json'

// Simula un API REST
export function fetchNews(): Promise<NewsItem[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newsData)
    }, 500) // simulamos tiempo de respuesta
  })
}