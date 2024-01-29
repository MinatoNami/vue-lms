<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">About</h1>
      </div>
    </div>
    <section class="section">This is the about page</section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'About | LMSNET'
})
</script>

<style></style>
