import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: []
  }),
  actions: {
    toggle(game) {
      const index = this.items.findIndex(g => g.id === game.id)
      index >= 0 ? this.items.splice(index, 1) : this.items.push(game)
    }
  }
})