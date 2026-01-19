import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import reveal from './directives/reveal'

export const createApp = ViteSSG(
    App,
    { routes: createRouter().options.routes },
    ({ app, router }) => {
        const pinia = createPinia()
        const head = createHead()        

        app.use(pinia)
        app.use(router)
        app.use(head)
        app.directive('reveal', reveal)

        //AQUI PUEDES AGREGAR plugins, store, etc.
    }
)

