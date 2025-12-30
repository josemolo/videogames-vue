<template>
  <div ref="el" :class="{ show }">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const el = ref()
const show = ref(false)

onMounted(() => {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) show.value = true
  })
  io.observe(el.value)
})
</script>

<style scoped>
div{opacity:0;transform:translateY(40px);transition:1s}
.show{opacity:1;transform:none}
</style>
