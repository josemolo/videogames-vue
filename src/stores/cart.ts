import { defineStore } from 'pinia'

export interface CartItem {
  id: number
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
    count: state =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    total: state =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
  },

  actions: {
    add(game: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(i => i.id === game.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...game, quantity: 1 })
      }
    },

    remove(id: number) {
      this.items = this.items.filter(i => i.id !== id)
    },

    clear() {
      this.items = []
    }
  }
})