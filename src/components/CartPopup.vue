<template>
  <div v-if="isOpen" class="cart-popup">
    <div class="cart-header">
      <h2>Tu Carrito</h2>
      <button @click="closeCart">X</button>
    </div>
    <div class="cart-items" v-if="cart.items.length > 0">
      <div class="cart-item" v-for="item in cart.items" :key="item.id">
        <img :src="item.image" alt="" class="item-image" />
        <div class="item-info">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-quantity">Cantidad: {{ item.quantity }}</p>
          <p class="item-price">Precio: ${{ item.price * item.quantity }}</p>
        </div>
        <div class="item-actions">
          <button @click="decreaseItem(item.id)">-</button>
          <button @click="addItem(item)">+</button>
          <button @click="removeItem(item.id)">Eliminar</button>
        </div>
      </div>
      <div class="cart-total">
        <strong>Total: ${{ cart.totalPrice }}</strong>
      </div>
      <button class="checkout-btn" @click="checkoutWhatsApp">
        Pagar por WhatsApp
      </button>
    </div>
    <div v-else class="empty-cart">
      <p>Tu carrito está vacío</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore, type CartItem } from '@/stores/cart'

const cart = useCartStore()
const isOpen = ref(false)

// Métodos del store con tipado correcto
const addItem = (item: CartItem) => cart.addItem(item)

const decreaseItem = (id: number) => cart.decreaseItem(id)

const removeItem = (id: number) => cart.removeItem(id)

// Abrir / cerrar popup
const openCart = () => {
  isOpen.value = true
}

const closeCart = () => {
  isOpen.value = false
}

// Checkout por WhatsApp
const checkoutWhatsApp = () => {
  if (!cart.items.length) return alert('Tu carrito está vacío')
  let message = '¡Hola! Quiero hacer un pedido:\n\n'
  cart.items.forEach(item => {
    message += `- ${item.name} x ${item.quantity} ($${item.price * item.quantity})\n`
  })

  message += `\nTotal: $${cart.totalPrice}`
  const encodedMessage = encodeURIComponent(message)
  const phone = '521234567890' // reemplaza con tu número
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
}

// Exponer openCart para Navbar
defineExpose({ openCart })
</script>


<style scoped>
.cart-popup {
  position: fixed;
  top: 60px;
  right: 20px;
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  background: #1f1f3d;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px #59111b;
  padding: 15px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  z-index: 1000;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cart-header h2 {
  font-size: 1.2rem;
  color: #7f5cff;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.cart-item {
  display: flex;
  gap: 60px;
  background: #2b2b4d;
  padding: 5px;
  border-radius: 5px;
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info p {
  margin: 2px 0;
}

.item-actions button {
  margin: 2px;
  background: #7f5cff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 5px;
}

.cart-total {
  margin-top: 10px;
  text-align: right;
}

.checkout-btn {
  width: 100%;
  background: #25d366;
  color: white;
  font-weight: bold;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.empty-cart {
  text-align: center;
  color: #ccc;
}
</style>
