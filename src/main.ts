  /*
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from './router'

  import './assets/style.css'

  createApp(App).use(router).mount('#app')
  */

  import { createApp } from "vue";
  import { createPinia } from "pinia";
  import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
  import { createHead } from '@vueuse/head'
  
  import App from "./App.vue";
  import router from "./router/index";
  import reveal from './directives/reveal'

  //import '@/assets/styles/main.css'

  const app = createApp(App);

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  const head = createHead()
  
  app
  .use(pinia) 
  .use(router)                  // 👈 3️⃣ usar router
  .use(head)                    // 👈 4️⃣ usar head
  .directive('reveal', reveal)  // 👈 5️⃣ directiva
  .mount('#app') 
  
  //createApp(App)
  //  .use(router)  
  //  .use(head)
  //  .directive('reveal', reveal)
  //  .mount('#app')

  //app.use(createPinia());
  //app.use(pinia);
  //app.use(router);
  //app.directive('reveal', reveal)

  //app.mount("#app");
