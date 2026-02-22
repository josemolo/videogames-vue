import { defineStore } from 'pinia'
  
export interface CartItem {
  cartId: string    
  id: string
  name: string
  title: string
  price: number
  image?: string
  quantity: number
  stock: number
  type: 'console' | 'game' | 'accessory' | 'product'
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
    addItem(item: Omit<CartItem, 'quantity' | 'cartId'>) {
      if (item.stock <= 0) return

  // Buscar si ya existe el producto
      const existingItem = this.items.find(i => i.id === item.id)

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++
        }
      } else {

        const newItem: CartItem = {
          ...item,
          cartId: crypto.randomUUID(),
          quantity: 1,
        }

        this.items.push(newItem)
      }  
      this.saveToStorage()
    },

    
        // 🔥 AUMENTAR CANTIDAD
    increaseItem(cartId: string) {
      const item = this.items.find(i => i.cartId === cartId)
      if (!item) return

      if (item.quantity >= item.stock) return

      item.quantity++
      this.saveToStorage()
    },  
      


    decreaseItem(cartId: string) {
      const item = this.items.find(i => i.cartId === cartId)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(cartId)
        return
      }
      
      this.saveToStorage()
    },

    removeItem(cartId: string){
      this.items = this.items.filter(i => i.cartId !== cartId)
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

    /*
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

    */

  },
})
