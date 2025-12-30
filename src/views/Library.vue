<template>
  <div class="library">
    <h1>Biblioteca de Videojuegos</h1>

    <!-- Lista de juegos -->
    <div class="games">
      <div v-for="game in games" :key="game.id" class="game-card">
        <h3>{{ game.name }}</h3>
        <p>{{ game.description }}</p>
        <p>Precio: ${{ game.price }}</p>
        <input type="number" min="1" v-model.number="game.quantity" />
        <button @click="addToCart(game)">Agregar al carrito</button>
      </div>
    </div>

    <!-- Carrito de compras -->
    <div class="cart">
      <h2>Carrito</h2>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} x {{ item.quantity }} = ${{ item.price * item.quantity }}
        </li>
      </ul>
      <p v-if="cart.length">Total: ${{ total }}</p>
      <button @click="checkout" :disabled="!cart.length">Pagar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Game {
  id: number
  name: string
  description: string
  price: number
  quantity: number
}

const games = ref<Game[]>([
  { id: 1, name: 'The Legend of Zelda', description: 'Aventura épica', price: 50, quantity: 1 },
  { id: 2, name: 'Mario Kart 8', description: 'Carreras divertidas', price: 40, quantity: 1 },
  { id: 3, name: 'Minecraft', description: 'Construye tu mundo', price: 30, quantity: 1 },
])

const cart = ref<Game[]>([])

const addToCart = (game: Game) => {
  const existing = cart.value.find(item => item.id === game.id)
  if (existing) {
    existing.quantity += game.quantity
  } else {
    cart.value.push({ ...game })
  }
  alert(`${game.name} agregado al carrito`)
}

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const checkout = () => {
  if (!cart.value.length) return
  alert(`Pago simulado de $${total.value} realizado! Gracias por tu compra.`)
  cart.value = []
}
</script>

<style scoped>
.library {
  padding: 20px;
  color: #fff;
  background: #0a0a1f;
  min-height: 100vh;
  font-family: 'Orbitron', sans-serif;
}

.games {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.game-card {
  background: #1c1c2f;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #bf97ea;
  width: 200px;
  box-shadow: 0 0 10px #bf97ea, 0 0 20px #6d307a;
}

.game-card input {
  width: 60px;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  text-align: center;
}

.game-card button {
  margin-top: 10px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(45deg, #bf97ea, #6d307a);
  color: #fff;
  cursor: pointer;
}

.cart {
  margin-top: 30px;
  background: #1c1c2f;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #bf97ea;
  width: 400px;
}

.cart button {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(45deg, #bf97ea, #6d307a);
  color: #fff;
  cursor: pointer;
}
</style>
