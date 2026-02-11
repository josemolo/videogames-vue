import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  title: string
  price: number
  image?: string
  quantity: number
  stock: number
  type: 'console' | 'game' | 'accessory'
}

const STORAGE_KEY = 'vortex_cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addItem(item: CartItem) {
      const existing = this.items.find(i => i.id === item.id)
      if(existing) {
        // ⛔ respetar stock
        if (existing.quantity >= existing.stock) return
        existing.quantity++
      } else {
        if (item.stock <= 0) return

        this.items.push({
          ...item,
          quantity: item.quantity ?? 1,
        })
      }

      this.saveToStorage()
    },

    decreaseItem(id: number) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(id)
        return
      }
      
      this.saveToStorage()
    },

    removeItem(id:number){
      this.items = this.items.filter(i => i.id !== id)
      this.saveToStorage()
    },

    updateQuantity(id:number, quantity:number){
      const item = this.items.find(i => i.id === id)
      if(!item) return
      if(quantity <= 0) {
        this.removeItem(id)
        return
      }  
      
       // ⛔ no exceder stock
      item.quantity = Math.min(quantity, item.stock)
      this.saveToStorage()
    },

    clearCart() {
    this.items = []
    localStorage.removeItem(STORAGE_KEY)
    },

    saveToStorage(){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },

    loadFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return 
      
      try {
        const parsed = JSON.parse(saved) as CartItem[]
        if (Array.isArray(parsed)) {
          this.items = parsed
        }
      } catch {
        this.clearCart()
      }
    },  
  },
})
