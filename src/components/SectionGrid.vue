<template>
  <section class="section-grid">
    <h2 v-if="title" class="section-title">{{ title }}</h2>

    <div class="grid">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.section-grid {
  padding: 4rem 2rem;
    max-width: 1300px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: #7f5cff;
  text-shadow: 0 0 10px #7f5cff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
</style>
