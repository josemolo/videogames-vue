import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    count: s => s.items.length,
    total: s => s.items.reduce((t, i) => t + i.price, 0)
  },
  actions: {
    add(game) {
      this.items.push(game)
    },
    remove(i) {
      this.items.splice(i, 1)
    }
  }
})