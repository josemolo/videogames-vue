<template>
  <section ref="el">
    <slot v-if="visible" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
const el = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      visible.value = true
      observer?.disconnect()
    }
  }, { threshold: 0.1 })

  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>
