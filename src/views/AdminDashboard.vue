<template>
  <div>
    <div class="admin-dashboard">

      <h1>Panel de Administración</h1>

      <div class="admin-tabs">

          <button 
              :class="{ active: activeTab === 'productos' }"
              @click="activeTab='productos'"
          >
              Productos
          </button>

          <button 
              :class="{ active: activeTab === 'consolas' }"
              @click="activeTab='consolas'"
          >
              Consolas
          </button>

          <button 
              :class="{ active: activeTab === 'juegos' }"
              @click="activeTab='juegos'"
          >
              Juegos
          </button>

      </div>

      <!-- ESTADÍSTICAS -->
      <section class="stats">
        <div class="stat-card">
          <h3>Total Productos</h3>
          <p>{{ allItems.length }}</p>
        </div>

        <div class="stat-card">
          <h3>Stock Bajo</h3>
          <p>{{ lowStockCount }}</p>
        </div>

        <div class="stat-card">
          <h3>Inventario Total</h3>
          <p>{{ totalStock }}</p>
        </div>
      </section>

      <!-- ACCIONES -->
      <section class="admin-actions">

        <button @click="openNewProductModal" class="btn-primary">
          Agregar Producto
        </button>

        <input
          v-model="search"
          placeholder="Buscar producto..."
          class="search-input"
        />

      </section>

      <!-- PRODUCTOS -->
      <section class="product-list">

        <div class="cards-grid">

          <div
            v-for="product in displayedItems"
            :key="product.id"
            class="product-card"
          >

            <img :src="product.image" alt="producto" />

            <h3>{{ product.name }}</h3>

            <p class="price">₡{{ product.price }}</p>

            <label v-if="activeTab !== 'consolas'" class="featured-toggle">  <!-- "!isConsole(product)"-->
              <input 
                  type="checkbox" 
                  v-model="product.featured"
                  @change="updateFeatured(product)"
              />
              Destacado
            </label>

            <!-- CATEGORÍA -->
            <p>Sección: 
              <select v-model="product.category" @change="updateCategory(product)">
                <option value="consolas">Consolas</option>
                <option value="juegos">Juegos</option>
                <option value="articulos">Artículos</option>
                <option value="otros">Otros</option>
              </select>
            </p>

            <!-- STOCK CONTROL -->
            <div class="stock-controls">
              <button @click="updateStock(product, -1)">-</button>

              <span :class="{ lowStock: product.stock <= 5 }">
                {{ product.stock }}
              </span>

              <button @click="updateStock(product, 1)">+</button>
            </div>

            <!-- ACCIONES -->
            <div class="actions">
              <button @click="editProduct(product)" class="btn-edit">
                Editar
              </button>

              <button @click="deleteProduct(product)" class="btn-delete">
                Eliminar
              </button>
            </div>

          </div>

        </div>

      </section>

      <!-- MODAL -->
      <div v-if="showModal" class="modal-backdrop">

        <div class="modal">

          <h2>{{ editingProduct ? 'Editar Producto' : 'Nuevo Producto' }}</h2>

          <input v-model="form.name" placeholder="Nombre del producto" />

          <input v-model="form.subtitle" placeholder="Subtítulo consola" />

          <textarea
            v-model="form.description"
            placeholder="Descripción de la consola">
          </textarea>

          <input v-model="form.slug" placeholder="slug (ej: play5)" />

          <input
            v-model.number="form.price"
            placeholder="Precio"
            type="number"
          />

          <input
            v-model.number="form.stock"
            placeholder="Stock"
            type="number"
          />

          <label>Sección / Categoría</label>
          <select v-model="form.category">
            <option value="consolas">Consolas</option>
            <option value="juegos">Juegos</option>
            <option value="articulos">Artículos</option>
            <option value="otros">Otros</option>
          </select>

          <label>Features</label>

          <div v-for="(f, index) in form.features" :key="index">
            <input v-model="form.features[index]" />
          </div>

          <button @click="addFeature">Agregar feature</button>

          <!-- ACCESORIOS -->
          <label>Accesorios Compatibles</label>

          <!--<div v-for="(a,index) in form.accessories" :key="'a'+index">-->
          <Draggable v-model="form.accessories" item-key="uid" tag="div">

              <template #item="{ element, index }">

                  <div class="game-item">    

                      <input v-model="element.name" placeholder="Nombre accesorio" />

                      <input v-model.number="element.price" type="number" placeholder="Precio" />

                      <input v-model.number="element.stock" type="number" placeholder="Stock" />

                      <input type="file" @change="uploadAccessoryImage($event,element)" />

                      <button @click="deleteAccessory(element)">
                          ❌ Eliminar
                      </button>

                  </div>
              </template>
          </Draggable>         

          <button @click="addAccessory">Agregar accesorio</button>

          <label>Juegos Disponibles</label>

          <Draggable 
          v-model="form.games"
          item-key="id"
          tag="div"
          @end="saveGameOrder"
          >

              <template #item="{ element, index }">

                  <div class="game-item">

                      <input v-model="element.name" placeholder="Nombre juego" />

                      <input v-model="element.description" placeholder="Descripción" />

                      <input v-model.number="element.price" type="number" placeholder="Precio" />

                      <input v-model.number="element.stock" type="number" placeholder="Stock" />

                      <input type="file" @change="uploadGameImage($event,element)" />

                      <button @click="deleteGame(element)">
                          ❌ Eliminar
                      </button>

                  </div>

              </template>

          </Draggable>

          <button @click="addGame">Agregar juego</button>

          <input type="file" @change="uploadImage" />

          <div class="modal-actions">

            <button @click="saveProduct" class="btn-primary">
              Guardar
            </button>

            <button @click="closeModal" class="btn-secondary">
              Cancelar
            </button>

          </div>

        </div>

      </div>

    </div>
    <div v-if="showDeleteModal" class="delete-overlay">

      <div class="delete-modal">

          <h2>Eliminar producto</h2>

          <p>¿Seguro que deseas eliminar este artículo?</p>

          <div class="delete-buttons">

            <button class="cancel" @click="showDeleteModal=false">
                Cancelar
            </button>

            <button class="confirm" @click="confirmDelete">
                Eliminar
            </button>

          </div>

      </div>

    </div>
  </div>  
</template>

<script setup lang="ts">

import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import Draggable from 'vuedraggable'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  category: string
  featured?: boolean
}

interface ConsoleItem {
  id: string
  name: string
  subtitle: string
  description: string
  image: string
  price: number
  stock: number
  slug: string
  features: string[]
}

type AdminItem = {
  id: string
  name: string
  price: number
  stock: number
  image: string
  category?: string
  featured?: boolean
  subtitle?: string
  description?: string
  slug?: string
  features?: string[]
  type: 'product' | 'console'
}

const products = ref<Product[]>([])
const consoles = ref<ConsoleItem[]>([])

const showModal = ref(false)
const showDeleteModal = ref(false)
const productToDelete = ref<AdminItem | null>(null)
const editingProduct = ref<AdminItem | null>(null)

const search = ref('')

/*const activeTab = ref<'productos' | 'consolas' | 'juegos'>('productos')*/

const activeTab = ref<'productos' | 'consolas' | 'juegos' | 'accesorios'>(
  (localStorage.getItem('adminTab') as 'productos' | 'consolas' | 'juegos'| 'accesorios') || 'productos'
)

watch(activeTab, (tab: 'productos' | 'consolas' | 'juegos' | 'accesorios') => {
  localStorage.setItem('adminTab', tab)
})

const form = ref({
  id: '',
  name: '',
  subtitle: '',
  description: '',
  price: 0,
  stock: 0,
  image: '',
  slug: '',
  category: 'otros',
  features: [] as string[],
  accessories: [] as any[],
  games: [] as any[]
})

/* ---------------------------
   COMPUTED
--------------------------- */

const filteredProducts = computed(() => {
  return products.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )

})

const allItems = computed(() => {

  const productItems = products.value.map(p => ({
    ...p,
    type: 'product'
  }))

  const consoleItems = consoles.value.map(c => ({
    id: c.id,
    name: c.name,
    price: c.price,
    stock: c.stock,
    image: c.image,
    category: 'consolas',
    featured: false,
    type: 'console'
  }))

  return [...consoleItems, ...productItems]

})

const totalStock = computed(() => {
  /*products.value.reduce((sum, p) => sum + p.stock, 0)*/

  const productStock = products.value.reduce((sum, p) => sum + p.stock, 0)
  const consoleStock = consoles.value.reduce((sum, c) => sum + c.stock, 0)

  return productStock + consoleStock
})

const lowStockCount = computed(() => {
  /*products.value.filter(p => p.stock <= 5).length*/

  const lowProducts = products.value.filter(p => p.stock <= 5).length
  const lowConsoles = consoles.value.filter(c => c.stock <= 5).length

  return lowProducts + lowConsoles  
})


const displayedItems = computed<AdminItem[]>(() => {

  if (activeTab.value === 'consolas') {
    return consoles.value.map(c => ({
        ...c,
        category: 'consolas',
        featured: false,
        type: 'console'
    }))
  }

  if (activeTab.value === 'juegos') {
    return products.value.filter(p => p.category === 'juegos')
    .map(p => ({...p, type: 'product'}))
  }

  return products.value.filter(p => p.category !== 'juegos')
  .map(p => ({...p, type: 'product'}))

})

const isConsole = (item:AdminItem) => item.type === 'console'

/* ---------------------------
   MODAL
--------------------------- */

function openNewProductModal() {

  editingProduct.value = null

  form.value = {
    id: '',
    name: '',
    subtitle: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    slug: '',
    category: 'otros',
    features: [],

    accessories: [], /*as any[]*/
    games: [] /*as any[]*/
  }

  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

/* ---------------------------
   PRODUCTS
--------------------------- */

async function loadProducts() {

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  products.value = data as Product[]
}

async function loadConsoles() {

  const { data, error } = await supabase
    .from('consoles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  consoles.value = data as ConsoleItem[]
}

function addFeature(){
  form.value.features.push('')
}

function addAccessory(){
  form.value.accessories.push({
    /*id:crypto.randomUUID(),*/
    name:'',
    price:0,
    stock:0,
    image: ''
  })
}

function addGame(){
  form.value.games.push({
    /*id:crypto.randomUUID(),*/
    name:'',
    description:'',
    price:0,
    stock:0,
    image: ''
  })
}

async function saveProduct() {

    if (form.value.category === 'consolas') {  /*if (editingProduct.value) {*/

    const slug = form.value.slug || form.value.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')

    const { data, error } = await supabase
      .from('consoles')  /*.from('products')*/
      /*.update(form.value)
      .eq('id', editingProduct.value.id)*/
      
      .upsert({
        id: editingProduct.value?.id,
        name: form.value.name,
        subtitle: form.value.subtitle,
        description: form.value.description,
        price: form.value.price,
        stock: form.value.stock,
        image: form.value.image,
        features: form.value.features,
        slug: slug        
    })    
    .select()
    .single()

    if (error) {
        console.error(error)
        return
    }    

    /*loadConsoles()*/

    /*const consoleId = editingProduct.value?.id*/

    const consoleId = data.id

    /*if(consoleId){*/

    for(const a of form.value.accessories){

        if(!a.name) continue

        /*const price = Number(a.price) || 0
        const stock = Number(a.stock) || 0*/
        

        if(a.id){
            await supabase
            .from('accessories')
            .update({
                name:a.name,
                price: Number(a.price),
                stock: Number(a.stock),
                /*console_id: consoleId,*/
                image: a.image || ''
            })
            .eq('id',a.id)
        }else{
             await supabase
            .from('accessories')
            .insert({
                console_id: consoleId,
                name: a.name,
                price: Number(a.price),
                stock: Number(a.stock),
                image: a.image || ''
            })    
        }
    }

    for(const g of form.value.games){
      
        if(!g.name) continue

        /*const price = Number(g.price) || 0
        const stock = Number(g.stock) || 0 */

        if(g.id){
             await supabase
            .from('games')
            .update({
                name: g.name,
                description: g.description,
                price: Number(g.price),
                stock: Number(g.stock),
                image: g.image || ''
          })
          .eq('id',g.id)

        }else{
             await supabase
            .from('games')
            .insert({
                console_id: consoleId,
                name: g.name,
                description: g.description,
                price: Number(g.price),
                stock: Number(g.stock),
                image: g.image || '',
                order_position: form.value.games.length
          })
        }
    }

    loadConsoles()

}   else {
        
    if (editingProduct.value) {

        await supabase
            .from('products')
            .update({
                name: form.value.name,
                price: form.value.price,
                stock: form.value.stock,
                image: form.value.image,
                category: form.value.category
            })
           .eq('id', editingProduct.value.id)
    /*
    const { error } = await supabase
      .from('products')
      .insert([form.value])*/
    } else {
        await supabase
        .from('products')
        .insert({
            name: form.value.name,
            price: form.value.price,
            stock: form.value.stock,
            image: form.value.image,
            category: form.value.category
        })
    }  
    loadProducts()
  }
/*
function addFeature(){
  form.value.features.push('')*/
  closeModal()  
}

/* ---------------------------
   LOAD ACCESSORIES / GAMES
--------------------------- */

async function loadConsoleExtras(consoleId:string){

  const { data: accessories } = await supabase
  .from('accessories')
  .select('*')
  .eq('console_id',consoleId)

  const { data: games } = await supabase
  .from('games')
  .select('*')
  .eq('console_id',consoleId)
  .order('order_position',{ascending:true})

  form.value.accessories = accessories || []
  form.value.games = games || []

}

async function editProduct(product: AdminItem) {

  editingProduct.value = product as any

  if (product.type === 'console') {

    form.value = { 
        id: product.id,
        name: product.name,
        subtitle: product.subtitle || '',
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        image: product.image,
        slug: product.slug || '',
        category: 'consolas',
        features: product.features || [],
        accessories: [],
        games: []
    }

    const { data: accessories } = await supabase
        .from('accessories')
        .select('*')
        .eq('console_id', product.id)

    form.value.accessories = accessories || []

    const { data: games } = await supabase
        .from('games')
        .select('*')
        .eq('console_id', product.id)

    form.value.games = games || []

    await loadConsoleExtras(product.id)

  } else {

     form.value = { 
        id: '',
        name: product.name,
        subtitle: '',
        description: '',
        price: product.price,
        stock: product.stock,
        image: product.image,
        slug: '',
        category: product.category || 'otros',
        features: [],
        accessories: [],
        games: []
     }  
  }  

  showModal.value = true
}

/* ---------------------------
   DELETE ACCESSORY / GAME
--------------------------- */

async function deleteAccessory(a:any){

  if(!a.id) return

  await supabase
  .from('accessories')
  .delete()
  .eq('id',a.id)

  form.value.accessories =
  form.value.accessories.filter(x => x.id !== a.id)

}

async function deleteGame(g:any){

  if(!g.id) return

  await supabase
  .from('games')
  .delete()
  .eq('id',g.id)

  form.value.games =
  form.value.games.filter(x => x.id !== g.id)

}

/* ---------------------------
   STOCK CONTROL
--------------------------- */

async function updateStock(product: AdminItem, change: number) {

  const newStock = product.stock + change

  if (newStock < 0) return

  const table = product.type === 'console' ? 'consoles' : 'products'

    /* ACTUALIZA UI INMEDIATAMENTE */

  product.stock = newStock

  if(product.type === 'console'){
    consoles.value = consoles.value.map(c =>
      c.id === product.id ? { ...c, stock:newStock } : c
    )
  }else{
    products.value = products.value.map(p =>
      p.id === product.id ? { ...p, stock:newStock } : p
    )
  }

   /* ACTUALIZA SUPABASE */

  const { error } = await supabase
    .from(table)
    .update({ stock: newStock })
    .eq('id', product.id)

  if (error) {
    console.error(error)
  }

  product.stock = newStock

   if(product.type === 'console'){
    consoles.value = [...consoles.value]
  }else{
    products.value = [...products.value]
  }
}

/* ---------------------------
   CATEGORY CONTROL
--------------------------- */
async function updateCategory(product: AdminItem) {
  const { error } = await supabase
    .from('products')
    .update({ category: product.category })
    .eq('id', product.id)
    
  if (error) console.error(error)
}

async function updateFeatured(product: AdminItem) {

  const { error } = await supabase
    .from('products')
    .update({ featured: product.featured })
    .eq('id', product.id)

  if (error) console.error(error)

}

/* ---------------------------
   IMAGE UPLOAD
--------------------------- */

async function uploadImage(event: Event) {

  const file = (event.target as HTMLInputElement).files?.[0]

  if (!file) return

  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file)

  if (error) {
    console.error(error)
    return
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  form.value.image = data.publicUrl
}

async function uploadAccessoryImage(event: Event, accessory:any){

  const file = (event.target as HTMLInputElement).files?.[0]
  if(!file) return

  const fileName = `accessory-${Date.now()}-${file.name}`

  const { error } = await supabase.storage
  .from('product-images')
  .upload(fileName,file)

  if(error){
    console.error(error)
    return
  }

  const { data } = supabase.storage
  .from('product-images')
  .getPublicUrl(fileName)

  accessory.image = data.publicUrl
}

async function uploadGameImage(event: Event, game:any){

  const file = (event.target as HTMLInputElement).files?.[0]
  if(!file) return

  const fileName = `game-${Date.now()}-${file.name}`

  const { error } = await supabase.storage
  .from('product-images')
  .upload(fileName,file)

  if(error){
    console.error(error)
    return
  }

  const { data } = supabase.storage
  .from('product-images')
  .getPublicUrl(fileName)

  game.image = data.publicUrl
}

async function saveGameOrder(){

  const updates = form.value.games.map((g,i)=>({
    id:g.id,
    order_position:i
  }))

  for(const u of updates){

    if(!u.id) continue

    await supabase
    .from('games')
    .update({order_position:u.order_position})
    .eq('id',u.id)

  }

}



/* ---------------------------
   DELETE
--------------------------- */

function deleteProduct(product: AdminItem) {

  productToDelete.value = product
  showDeleteModal.value = true
}

async function confirmDelete(){

  if(!productToDelete.value) return

  const product = productToDelete.value  

  const table = product.type === 'console' ? 'consoles' : 'products'

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', product.id)

  if (error) console.error(error)

  if (product.type === 'console') {
    loadConsoles()
  } else {
    loadProducts()
  }

  showDeleteModal.value = false
  productToDelete.value = null
}

onMounted(() => {
    loadProducts()
    loadConsoles()
})    

window.addEventListener("keydown",(e)=>{
if(e.key==="Escape"){
showModal.value=false
}
})

</script>

<style scoped>

.admin-dashboard{
padding:2rem;
max-width:1200px;
margin:auto;
}

/* STATS */
.stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1rem; margin-bottom:2rem; }

.stat-card { background:#111; color:white; padding:1rem; border-radius:10px; text-align:center; }

.stat-card p { font-size:1.5rem; font-weight:bold; }

/* ACTIONS */
.admin-actions { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }

.admin-tabs{
display:flex;
gap:10px;
margin-bottom:20px;
}

.admin-tabs button{
background:#333;
color:white;
border:none;
padding:8px 16px;
border-radius:8px;
cursor:pointer;
}

.admin-tabs button.active{
background:#ffd900;
color:black;
font-weight:bold;
}

.search-input { padding:0.5rem; border-radius:6px; border:none; }

/* GRID */
.cards-grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }

/* PRODUCT */
.product-card{
background:#1a1a1a;
color:white;
padding:1rem;
border-radius:14px;
text-align:center;
border:1px solid #333;
transition:0.2s;
}

.product-card:hover{
transform:translateY(-4px);
border-color:#ffd900;
}

.product-card img { width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:0.5rem; }

.price { font-weight:bold; margin-bottom:0.5rem; }

/* STOCK */

.stock-controls{
display:flex;
justify-content:center;
align-items:center;
gap:10px;
margin-bottom:0.5rem;
}

.stock-controls button{
background:#ffd900;
border:none;
padding:4px 10px;
border-radius:6px;
font-weight:bold;
cursor:pointer;
}

.lowStock{
color:#ff4d4d;
font-weight:bold;
}

/* ACTIONS */

.actions{
display:flex;
justify-content:center;
gap:0.5rem;
}

.btn-edit{
background:#33ccff;
color:#000;
border-radius:8px;
padding:0.4rem 0.8rem;
}

.btn-delete{
background:#ff4d4d;
color:white;
border-radius:8px;
padding:0.4rem 0.8rem;
border:none;
cursor:pointer;
}

.btn-primary{
background:#ffd900;
color:black;
padding:0.6rem 1.2rem;
border-radius:8px;
font-weight:bold;
border:none;
cursor:pointer;
transition:0.2s;
}

.btn-primary:hover{
transform:scale(1.05);
}

.btn-secondary{
background:#ccc;
color:black;
padding:0.6rem 1.2rem;
border-radius:8px;
border:none;
}

/* MODAL */

.modal-backdrop{
position:fixed;
inset:0;
background:rgba(0,0,0,0.8);
display:flex;
justify-content:center;
align-items:flex-start;
overflow-y:auto;
padding:40px 20px;
z-index:1000;
}

.modal{
background:#1b1b1b;
padding:2rem;
border-radius:14px;
display:flex;
flex-direction:column;
gap:0.9rem;

width:100%;
max-width:700px;

max-height:90vh;
overflow-y:auto;

box-shadow:0 0 40px rgba(0,0,0,0.6);
border:1px solid #333;
}

.modal input,
.modal textarea,
.modal select{
background:#111;
border:1px solid #333;
border-radius:8px;
padding:10px;
color:white;
}

.modal textarea{
min-height:80px;
resize:vertical;
}

.modal-actions{
display:flex;
justify-content:flex-end;
gap:0.5rem;
margin-top:1rem;
}

.featured-toggle{
display:flex;
justify-content:center;
align-items:center;
gap:6px;
margin-bottom:8px;
font-size:0.9rem;
}

.game-item{
background:#111;
padding:10px;
border-radius:8px;
border:1px solid #333;
margin-bottom:10px;
display:flex;
flex-direction:column;
gap:6px;
}

.modal::-webkit-scrollbar{
width:6px;
}

.modal::-webkit-scrollbar-thumb{
background:#ffd900;
border-radius:4px;
}

.delete-overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.8);
display:flex;
justify-content:center;
align-items:center;
z-index:2000;
}

.delete-modal{
background:#1b1b1b;
padding:2rem;
border-radius:12px;
text-align:center;
border:1px solid #333;
box-shadow:0 0 30px rgba(0,0,0,0.7);
max-width:400px;
width:90%;
}

.delete-buttons{
display:flex;
justify-content:center;
gap:12px;
margin-top:20px;
}

.delete-buttons button{
padding:10px 20px;
border:none;
border-radius:8px;
font-weight:bold;
cursor:pointer;
}

.cancel{
background:#555;
color:white;
}

.confirm{
background:#ff4d4d;
color:white;
}

</style>