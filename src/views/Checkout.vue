<!-- src/views/Checkout.vue -->
<template>
  <div>
    <h1>Checkout</h1>
    <p v-if="cart.items.length === 0">Tu carrito esta vacio</p>

    <div v-else>
        <ul>
            <li v-for="item in cart.items" :key="item.id">
                {{ item.title }} x {{ item.quantity }} - ${{ item.price * item.quantity }}
            </li>
        </ul>

        <p>Total: ${{ cart.totalPrice }}</p>

        <button @click="payViaWhatsApp">Pagar por WhatsApp</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()

const payViaWhatsApp = () => {
    if (cart.items.length === 0) return

    const text = encodeURIComponent(
        `Hola, quiero comprar los siguientes productos:\n` +
        cart.items.map(i => `${i.title} x ${i.quantity}`).join(`\n`) +
        `\nTotal: $${cart.totalPrice}`
    )

    // Numero de WhatsApp
    const phone = '50663110405'
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
}
</script>

<style scoped>
/* estilo básico */
</style>
