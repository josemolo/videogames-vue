import App from './App.vue'
import reveal from './directives/reveal'
import router from './router'

import { ViteSSG } from 'vite-ssg'
/*import { createRouter } from './router'*/
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

export const createApp = ViteSSG(
    App,
    { routes: router.options.routes },
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

