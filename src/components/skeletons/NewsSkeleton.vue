<template>
  <div class="window news skeleton">
    <h1 class="skeleton-title"></h1>

    <ul>
      <li v-for="i in 3" :key="i" class="news-item skeleton-item">
        <h3>██████████████</h3>
        <p>████████████████████████████</p>
        <div class="skeleton-line title"></div>
        <div class="skeleton-line text"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Skeleton base */
.skeleton {
  opacity: 0.85;
  background: rgba(255,255,255,0.05);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.skeleton h3, .skeleton p {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  height: 1rem;
  margin-bottom: 5px;
}

/* Título fake */
.skeleton-title {
  height: 32px;
  width: 70%;
  margin: 0 auto 20px;
  border-radius: 8px;
  background-color: #2a2a40;
}

/* Items */
.skeleton-item {
  border-bottom: 1px solid #6d307a;
  padding: 10px 0;
}

.skeleton-line {
  height: 14px;
  border-radius: 6px;
  background-color: #2a2a40;
}

.skeleton-line.title {
  width: 60%;
  margin-bottom: 8px;
}

.skeleton-line.text {
  width: 90%;
}
</style>
