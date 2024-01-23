<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="min-height: 5rem">
    <div class="navbar-brand">
      <a class="navbar-item is-size-4" href="/">LMSNet</a>
    </div>
    <div id="navbar-item"></div>
  </nav>
  <RouterView />
</template>

<style lang="scss" scoped>
@import '../node_modules/bulma/bulma.sass';
</style>
