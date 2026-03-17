  <template>
    <div>
      <div class="admin-dashboard">
        <h1 class="gold-title">Panel de Administración</h1>
        <div class="admin-tabs">
            <button 
                :class="{ active: activeTab === 'productos' }"
                @click="activeTab='productos'"
            >
                Productos Destacados
            </button>
            <button 
                :class="{ active: activeTab === 'consolas' }"
                @click="activeTab='consolas'"
            >
                Consolas Tienda
            </button>
            <button 
                :class="{ active: activeTab === 'juegos' }"
                @click="activeTab='juegos'"
            >
                Juegos Destacados
            </button>
            <button :class="{ active: activeTab === 'catalogo-juegos' }" @click="activeTab='catalogo-juegos'">
              Catálogo Juegos
            </button>

            <button :class="{ active: activeTab === 'catalogo-articulos' }" @click="activeTab='catalogo-articulos'">
              Catálogo Artículos
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
              <!--<p>{{ product.image }}</p>-->
              <img :src="product.image || '/no-image.png'"
              @error="handleImageError"
              alt="producto" 
              />
              <!--<img v-if="form.image" :src="form.image" style="width:120px;margin-top:10px;">-->
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
            <label v-if="form.category === 'juegos' || form.category === 'articulos'">
              Plataforma / Categoría
            </label>

            <select 
              v-if="form.category === 'juegos' || form.category === 'articulos'"
              v-model="form.platform"
            >
              <option disabled value="">Seleccionar</option>

              <option
                v-for="p in platformOptions[form.category]"
                :key="p"
                :value="p"
              >
                {{ p }}
              </option>
            </select>
            <select v-model="form.category">
              <option value="consolas">Consolas</option>
              <option value="juegos">Juegos</option>
              <option value="articulos">Artículos</option>
              <option value="otros">Otros</option>
            </select>
            <label class="checkbox">
              <input type="checkbox" v-model="form.is_new">
                Producto nuevo
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="form.on_sale">
              En oferta
            </label>
            <label>Features</label>
            <div v-for="(f, index) in form.features" :key="index">
              <input v-model="form.features[index]" />
            </div>
            <button @click="addFeature">Agregar feature</button>
            <!-- ACCESORIOS -->
            <label>Accesorios Compatibles</label>          
            <Draggable v-model="form.accessories" item-key="id" :clone="(item: any)=>({...item})" tag="div">
                <template #item="{ element, index }">
                    <div class="game-item">    
                        <p>{{ element.image }}</p>
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
            :clone="(item: any)=>({...item})"
            tag="div"
            @end="saveGameOrder"
            >
                <template #item="{ element, index }">
                    <div class="game-item">
                        <p>{{ element.image }}</p>
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
              <button @click="saveProduct" :disabled="saving" class="btn-primary">
                {{ saving ? "Guardando..." : "Guardar" }}
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
    platform?: string 
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

  const selectedPlatform = ref('ALL')

  const search = ref('')
  const saving = ref(false)

  const activeTab = ref<'productos' | 'consolas' | 'juegos' | 'accesorios' | 'catalogo-juegos' | 'catalogo-articulos'>(
    (localStorage.getItem('adminTab') as 'productos' | 'consolas' | 'juegos'| 'accesorios' | 'catalogo-juegos' | 'catalogo-articulos') || 'productos'
  )

  watch(activeTab, (tab: 'productos' | 'consolas' | 'juegos' | 'accesorios' | 'catalogo-juegos' | 'catalogo-articulos') => {
    localStorage.setItem('adminTab', tab)
  })

  const platformOptions: Record<string, string[]> = {
    juegos: ['SWITCH','PS5','XBOXX','PS4','XBOXS','3DS'],
    articulos: ['SWITCH','PS5','PS4','XBOXX','XBOXS','3DS','SAMSUNG','IPHONE','SONY','VARIOS']
  }

  const form = ref({
    id: '',
    name: '',
    subtitle: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    imageFile: null as File | null, 
    slug: '',
    category: 'otros',
    platform: '',
    is_new:false,
    on_sale:false,
    features: [] as string[],
    accessories: [] as any[],
    games: [] as any[]
  })
    /*COMPUTED*/
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
    const productStock = products.value.reduce((sum, p) => sum + p.stock, 0)
    const consoleStock = consoles.value.reduce((sum, c) => sum + c.stock, 0)

    return productStock + consoleStock
  })

  const lowStockCount = computed(() => {
    const lowProducts = products.value.filter(p => p.stock <= 5).length
    const lowConsoles = consoles.value.filter(c => c.stock <= 5).length

    return lowProducts + lowConsoles  
  })

  const gamesFromConsoles = ref<any[]>([])

  async function loadGames(){
    const { data } = await supabase
      .from('games')
      .select('*')

    gamesFromConsoles.value = data || []
  }

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
    if (activeTab.value === 'catalogo-juegos') {
      return products.value
        .filter(p => {
          if (p.category !== 'juegos') return false

          if (selectedPlatform.value === 'ALL') return true

          return (p.platform || '').toUpperCase().trim() === selectedPlatform.value.toUpperCase().trim()
        })
        .map(p => ({ ...p, type: 'product' }))
    }

    if (activeTab.value === 'catalogo-articulos') {
      return products.value
        .filter(p => {
           if (p.category !== 'articulos') return false

          if (selectedPlatform.value === 'ALL') return true

          return p.platform === selectedPlatform.value
        })
        .map(p => ({ ...p, type: 'product' }))
    }
    if (activeTab.value === 'productos') {    
      return products.value.filter(p => p.category === 'articulos' && p.featured)
      .map(p => ({...p, type: 'product'}))
    }
    
    return []
  })

  const isConsole = (item:AdminItem) => item.type === 'console'
    /*MODAL*/
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
      imageFile: null as File | null, 
      slug: '',
      category: activeTab.value === 'juegos' || activeTab.value === 'catalogo-juegos' ? 'juegos' : activeTab.value === 'catalogo-articulos' ? 'articulos' : 'otros',
      platform: '',
      is_new:false,
      on_sale:false,
      features: [],
      accessories: [], 
      games: []
    }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }
    /*PRODUCTS*/
  async function loadProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .range(0,50)
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

  async function saveProduct(){
    saving.value = true 

    try{
        /*CONSOLA*/
      if(form.value.category === 'consolas'){
        const slug = form.value.slug || form.value.name
        .toLowerCase()
        .replace(/\s+/g,'-')
        .replace(/[^\w-]+/g,'')

        const { data:consoleData, error:consoleError } = await supabase
        .from('consoles')
        .upsert({
          id: editingProduct.value?.id || undefined,
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

        if(consoleError) throw consoleError

        const consoleId = consoleData.id
          /*ACCESSORIES*/
        const { data:existingAccessories } = await supabase
        .from('accessories')
        .select('id')
        .eq('console_id',consoleId)

        const existingIds = existingAccessories?.map(a=>a.id) || []

        const formIds = form.value.accessories
        .filter(a=>a.id)
        .map(a=>a.id)
        /* eliminar accesorios removidos */
        const toDelete = existingIds.filter(id => !formIds.includes(id))

        if(toDelete.length){
          await supabase
          .from('accessories')
          .delete()
          .in('id',toDelete)
        }
        /* preparar insert/update */
        const accessoriesPayload = form.value.accessories
        .filter(a => a.name)
        .map(a => {
          const payload:any = {
            console_id: consoleId,
            name: a.name,
            price: Number(a.price),
            stock: Number(a.stock),
            image: a.image || ''
          }
          if(a.id){
            payload.id = a.id
          }
          return payload
        })  

        const newAccessories = accessoriesPayload.filter(a => !a.id)
        const existingAccessoriesToUpdate = accessoriesPayload.filter(a => a.id)

        if(newAccessories.length){
          await supabase
          .from('accessories')
          .insert(newAccessories)
        }
        for(const a of existingAccessoriesToUpdate){
          await supabase
          .from('accessories')
          .update(a)
          .eq('id',a.id)
        }
          /*GAMES*/
        const { data:existingGames } = await supabase
        .from('games')
        .select('id')
        .eq('console_id',consoleId)

        const existingGameIds = existingGames?.map(g=>g.id) || []

        const formGameIds = form.value.games
        .filter(g=>g.id)
        .map(g=>g.id)

        const gamesToDelete = existingGameIds.filter(id => !formGameIds.includes(id))

        if(gamesToDelete.length){
          await supabase
          .from('games')
          .delete()
          .in('id',gamesToDelete)
        }

        const gamesPayload = form.value.games
        .filter(g => g.name)
        .map((g,index) => {
          const payload:any = {
            /*id: g.id,*/
            console_id: consoleId,
            name: g.name,
            description: g.description,
            price: Number(g.price),
            stock: Number(g.stock),
            image: g.image || '',
            order_position: index
          }
          if(g.id && g.id.length < 40){
            payload.id = g.id
          }  
          return payload
        })

          const newGames = gamesPayload.filter(g => !g.id)
          const existingGamesToUpdate = gamesPayload.filter(g => g.id)

          if(newGames.length){
            const { error } = await supabase
            .from('games')
            .insert(newGames)

            if(error) console.error(error)
          }

          for(const g of existingGamesToUpdate){
            await supabase
            .from('games')
            .update(g)
            .eq('id', g.id)
          }
        }
        /*PRODUCTOS NORMALES*/
      else{
          if (form.value.imageFile) {
          const fileName = `product-${Date.now()}-${form.value.imageFile.name}`

          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, form.value.imageFile, { upsert: true })

          if (uploadError) {
            console.error('Error subiendo imagen:', uploadError)
            saving.value = false
            return
          }

          const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName)

          form.value.image = data.publicUrl
        }

        if(editingProduct.value){
          const { error } = await supabase
          .from('products')
          .update({
            name: form.value.name,
            price: form.value.price,
            stock: form.value.stock,
            image: form.value.image || null,
            category: form.value.category,
            platform: form.value.platform,
            is_new: form.value.is_new,
            on_sale: form.value.on_sale
          })
          .eq('id',editingProduct.value.id)

          if(error) throw error

        }else{     
          const { error } = await supabase
          .from('products')
          .insert({
            name: form.value.name,
            price: form.value.price,
            stock: form.value.stock,
            image: form.value.image || null,
            category: form.value.category,
            platform: form.value.platform,
            featured: false,

            is_new:false,
            on_sale:false
          })
          if(error) throw error
        }
      }
      closeModal()

      await loadProducts()
      await loadConsoles()

    }catch(error){
      console.error("Error guardando producto:",error)
    }
    saving.value = false
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
          imageFile: null as File | null, 
          slug: product.slug || '',
          category: product.category || 'otros',
          platform: (product as any).platform || '',
          is_new: form.value.is_new,
          on_sale: form.value.on_sale,
          features: product.features || [],
          accessories: [],
          games: []
      }

      const { data, error } = await supabase
          .from('consoles')
          .select(`*, accessories!accessories_console_id_fkey(*), games(*)`)
          .eq('id', product.id)
          .single()

      if(error){
        console.error(error)
        return
      }

      form.value.accessories = data?.accessories || []
      form.value.games = data?.games || []

    }else{
      form.value = { 
          id: product.id,
          name: product.name,
          subtitle: '',
          description: '',
          price: product.price,
          stock: product.stock,
          image: product.image,
          imageFile: null as File | null, 
          slug: '',
          is_new: form.value.is_new,
          on_sale: form.value.on_sale,
          category: product.category || 'otros',
          platform: (product as any).platform || '',
          features: [],
          accessories: [],
          games: []
      }  
    }  
    showModal.value = true
  }
    /*DELETE ACCESSORY / GAME*/
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
    /*STOCK CONTROL*/
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
    /*CATEGORY CONTROL*/
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
    /*IMAGE UPLOAD*/
  async function uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]

    if (!file) return

    const fileName = `product-${Date.now()}-${file.name}`

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
    form.value.imageFile = file
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
    .upload(fileName,file, { upsert: true })

    if(error){
      console.error(error)
      return
    }

    const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

    game.image = data.publicUrl

    game.imageFile = file
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

  function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement

    if (target.src.includes('no-image.png')) return

    target.src = '/no-image.png'
  }

    /*DELETE*/
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

  watch(activeTab, async(tab)=>{
  if(tab === 'productos' && products.value.length === 0){
    await loadProducts()
  }

  if(tab === 'consolas' && consoles.value.length === 0){
    await loadConsoles()
  }
  })

  watch(() => form.value.category, () => {
    form.value.platform = ''
  })

  onMounted(()=>{
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
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800&display=swap');

  .admin-dashboard{ padding:2rem; max-width:1200px; margin:auto; }
  /* STATS */
  .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1rem; margin-bottom:2rem; }

  .stat-card { background:#57521148; color:rgb(255, 250, 176); padding:1rem; border-radius:10px; text-align:center; }

  .stat-card p { font-size:1.5rem; font-weight:bold; }
  /* ACTIONS */
  .admin-actions { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }

  .admin-tabs { display:flex; gap:10px; margin-bottom:20px; }

  .admin-tabs button { background:#57521148; color:rgb(255, 250, 176); border:none; padding:8px 16px; border-radius:8px; cursor:pointer; }

  .admin-tabs button.active { background:#fff6c1; color:black; font-weight:bold; }

  .search-input { padding:0.5rem; border-radius:6px; border:none; }
  /* GRID */
  .cards-grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
  /* PRODUCT */
  .product-card { background:#57521148; color:rgb(255, 250, 176); padding:1rem; border-radius:14px; text-align:center; border:1px solid #fff4a14b; transition:0.2s; }

  .product-card:hover { transform:translateY(-4px); border-color:#fff6c1; }

  .product-card img { width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:0.5rem; }

  .price { font-weight:bold; margin-bottom:0.5rem; }
  /* STOCK */
  .stock-controls { display:flex; justify-content:center; align-items:center; gap:10px; margin-bottom:0.5rem; }

  .stock-controls button { background:#fff6c1; border:none; padding:4px 10px; border-radius:6px; font-weight:bold; cursor:pointer; }

  .lowStock { color:#fff6c1a9; font-weight:bold; }
  /* ACTIONS */
  .actions { display:flex; justify-content:center; gap:0.5rem; }

  .btn-edit { background:#33ccffa2; color:#000; border-radius:8px; padding:0.4rem 0.8rem; }

  .btn-delete { background:#ff1e0075; color:rgb(14, 14, 14); border-radius:8px; padding:0.4rem 0.8rem; border:none; cursor:pointer; }

  .btn-primary { background:#fff6c1a9; color:black; padding:0.6rem 1.2rem; border-radius:8px; font-weight:bold; border:none; cursor:pointer; transition:0.2s; }

  .btn-primary:hover { transform:scale(1.05); }

  .btn-secondary { background:#fff6c1a9; color:black; padding:0.6rem 1.2rem; border-radius:8px; border:none; }
  /* MODAL */
  .modal-backdrop { position:fixed; inset:0; background:rgba(66, 67, 37, 0.425); display:flex; justify-content:center; align-items:flex-start; overflow-y:auto; padding:40px 20px; z-index:1000; }

  .modal { background:#3e3d1f; padding:2rem; border-radius:14px; display:flex; flex-direction:column; gap:0.9rem; width:100%; max-width:700px; max-height:90vh; overflow-y:auto; box-shadow:0 0 40px rgba(224, 223, 148, 0.333); border:1px solid #f1f0a9; }
    
  .modal input,
  .modal textarea,
  .modal select { background:#252204; border:1px solid #f1f0a9; border-radius:8px; padding:10px; color:rgb(222, 224, 155); }

  .modal textarea { min-height:80px; resize:vertical; }

  .modal-actions { display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1rem; }

  .featured-toggle { display:flex; justify-content:center; align-items:center; gap:6px; margin-bottom:8px; font-size:0.9rem; }

  .game-item { background:#cfcd7570; padding:10px; border-radius:8px; border:1px solid #f1f0a9; margin-bottom:10px; display:flex; flex-direction:column; gap:6px; }

  .modal::-webkit-scrollbar { width:6px; }

  .modal::-webkit-scrollbar-thumb { background:#d3d8886b; border-radius:4px; }

  .delete-overlay { position:fixed; inset:0; background:rgba(255, 255, 162, 0.155); display:flex; justify-content:center; align-items:center; z-index:2000; }

  .delete-modal { background:#fff79ebe; padding:2rem; border-radius:12px; text-align:center; border:1px solid #fff79e78; box-shadow:0 0 30px rgba(255, 250, 157, 0.7); max-width:400px; width:90%; }

  .delete-buttons { display:flex; justify-content:center; gap:12px; margin-top:20px; }

  .delete-buttons button { padding:10px 20px; border:none; border-radius:8px; font-weight:bold; cursor:pointer; }

  .cancel { background:#fdf5b190; color:rgb(0, 0, 0); }

  .confirm { background:#ff00006b; color:rgb(0, 0, 0); }

  .gold-title { font-family:'Orbitron',sans-serif; font-weight:800; letter-spacing:3px; text-transform:uppercase; background:linear-gradient(90deg,#FFD700,#fff0b3,#BFA06D); background-size:400% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:goldFlow 18s ease infinite; text-shadow: 0 0 10px rgba(255,215,0,0.3), 0 0 25px rgba(255,248,220,0.3), 0 0 40px rgba(191,160,109,0.4); }

  @keyframes goldFlow {
  0%{background-position:0% 50%;}
  50%{background-position:100% 50%;}
  100%{background-position:0% 50%;}
  }
  </style>