import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  //name: string
  title: string
  price: number
  image?: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    //count: state =>
    //  state.items.reduce((total, item) => total + item.quantity, 0),

    //total: state =>
    //  state.items.reduce(
    //    (total, item) => total + item.price * item.quantity,
    //    0
    //  )
  },

  actions: {
    //add(game: Omit<CartItem, 'quantity'>) {
    //  const existing = this.items.find(i => i.id === game.id)

    //  if (existing) {
    //    existing.quantity++
    //  } else {
    //    this.items.push({ ...game, quantity: 1 })
    //  }
    //},

    //remove(id: number) {
    //  this.items = this.items.filter(i => i.id !== id)
    //},

    //clear() {
    //  this.items = []
    //},

    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(i => i.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id)
    },

    updateQuantity(id: number, quantity: number) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
 
      if (quantity <= 0) {
        this.removeFromCart(id)
      } else {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.items = []
    },
  },
})