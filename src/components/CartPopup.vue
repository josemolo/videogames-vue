<template>
  <div v-if="isOpen" class="cart-overlay">
    <div class="cart-popup" ref="cartRef">

      <div class="cart-header">
        <h2>Tu Carrito</h2>
        <button class="close-btn" @click="closeCart">x</button>
      </div>
      <div v-if="cart.items.length > 0" class="cart-items">
        <div class="cart-item" v-for="item in cart.items" :key="item.cartId">
          <img :src="item.image" class="item-image" />
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <!--<p class="item-quantity"> {{ item.quantity }}</p>-->
              <p class="item-price">₡ {{ item.price * item.quantity }}</p>
            </div>
            
            <div class="item-actions"><!--quantity-control-->
              <button class="qty-btn" @click.stop="decreaseItem(item.cartId)">-</button>
              <span class="qty-number">{{ item.quantity }}</span>
              <button class="qty-btn" @click.stop="increaseItem(item.cartId)">+</button>
              <!--<button @click.stop="cart.increaseItem(item.cartid)"></button>-->
              <!-- SVG de eliminar profesional -->
              <button class="delete-btn" @click.stop="removeItem(item.cartId)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 24 24">
                  <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 11v6M14 11v6M5 6l1-3h12l1 3"/>
                </svg>
              </button>
            </div>
        </div>
        <div class="cart-total">
          <strong>Total: ₡{{ cart.totalPrice }}</strong>
        </div>
        <button class="checkout-btn" @click="checkoutWhatsApp">
          Pagar por WhatsApp
        </button>
      </div>
      <div v-else class="empty-cart">
        <p>Tu carrito está vacío</p>
      </div>
    </div>  
  </div>  
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useCartStore, type CartItem } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cart = useCartStore()
const userStore = useUserStore()

const isOpen = ref(false)
const cartRef = ref<HTMLElement | null>(null)

// Abrir / cerrar popup
const openCart = async () => {
  isOpen.value = true
  await nextTick()

  document.addEventListener('click', handleClickOutside)
}

const closeCart = () => {
  isOpen.value = false
  document.removeEventListener('click', handleClickOutside)
}

const handleClickOutside = (event: MouseEvent) => {
  if (!cartRef.value) return
  if (!cartRef.value.contains(event.target as Node)) {
    closeCart()
  }
}

// Checkout por WhatsApp
const checkoutWhatsApp = () => {
  if (!cart.items.length) return /*alert('Tu carrito está vacío')*/

  const username = userStore.user?.username || 'Cliente'
  let message = `Hola 👋\n\nSoy ${username}\nQuiero realizar el siguiente pedido:\n\n🛒 PRODUCTOS:\n`
  cart.items.forEach(item => {
    message += `- ${item.name} x ${item.quantity} = ₡${item.price * item.quantity}\n`
  })

  message += `\nTotal: ₡${cart.totalPrice}\n\nGracias!`

  const encodedMessage = encodeURIComponent(message)
  const phone = '50687469019' // reemplaza con tu número
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
}

// Métodos del store con tipado correcto
const addItem = (item: CartItem) => cart.addItem(item)
const decreaseItem = (id: string) => cart.decreaseItem(id)
const increaseItem = (id: string) => cart.increaseItem(id)
const removeItem = (id: string) => cart.removeItem(id)



/*
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
*/  




// Exponer openCart para Navbar
defineExpose({ open: openCart })


</script>


<style scoped>
/* 🔥 Overlay oscuro profesional */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 90px;
  z-index: 999;
}

.cart-popup {
  position: fixed;
  top: 10px;
  right: 20px;
  width: 380px;
  /*max-width: 95vw;
  max-height: 80vh;
  overflow-y: auto;*/
  background: #201644;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px #59111b;
  padding: 15px;
  font-family: 'Orbitron', sans-serif;
  animation: slideIn 0.25s ease;/*ease-out */

  /*transform: translateX(5%);*/

  font-size: 0.9rem;
  transition: transform 0.2s ease-in-out; 
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
  max-height: 80vh;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  gap: 10px;
  background: #19dfb425;
  padding: 10px;
  border-radius: 8px;
  /*position: relative;*/
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  /*
  border-radius: 6px;
  flex-shrink: 0;*/

}

.item-info {
  flex: 1;
  /*
  display: flex;
  flex-direction: column;
  justify-content: center;*/
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qty-number {
  width: 30px;          /* 👈 evita movimiento */
  text-align: center;
  font-weight: bold;
}

.qty-btn {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 6px;
  background: #19dfb486;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 6px;
}

.checkout-btn {
  width: 100%;
  background: #25d366;
  color: white;
  font-weight: bold; 
  border: none;
  padding: 10px;
  border-radius: 6px;
  margin-top: 15px;
  cursor: pointer;
}

.cart-total {
  margin-top: 15px;
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
}

.empty-cart {
  text-align: center;
  opacity: 0.7;
  margin-top: 20px;
  /*
  color: #ccc;
  font-size: 1rem;*/
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*margin-bottom: 15px;*/
}

.cart-header h2 {
  /*font-size: 1.3rem;*/
  color: #19dfb4;
}

.item-info p {
  margin: 2px 0;
}

.item-actions button {
  background: #19dfb486;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-name {
  font-weight: bold;
  /*margin-bottom: 5px;*/
}

.item-price {
  /*color: #fff;
  margin-bottom: 5px;*/
  font-size: 0.9rem;
}

.checkout-btn:hover {
  background: #20b358;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  color: #fff;
  cursor: pointer;
}


.quantity-control span {
  width: 45px;       /* ancho fijo */
  text-align: center;
  font-weight: bold;
}

.quantity-control button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: #7f5cff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/

@keyframes slideIn {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* RESPONSIVE */
@media screen and (max-width: 400px) {
  .cart-popup {
    width: 90vw;
    top: 50px;
    right: 5vw;
  }
  .item-image {
    width: 50px;
    height: 50px;
  }
}
</style>
