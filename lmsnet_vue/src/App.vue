<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { onBeforeMount } from 'vue'
import { useUserStore } from './stores/index'
import { storeToRefs } from 'pinia'
import axios from 'axios'

const store = useUserStore()
const { user } = storeToRefs(store)

onBeforeMount(() => {
  store.initializeStore()

  const token = user.value.token

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    axios.defaults.headers.common['Authorization'] = ''
  }
})
</script>

<template>
  <div>
    <NavBar />
    <RouterView />
    <Footer />
  </div>
</template>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
</style>
