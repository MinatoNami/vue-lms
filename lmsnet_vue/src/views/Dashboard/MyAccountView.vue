<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">My Account</h1>
      </div>
    </div>
    <section class="section">
      <button @click="logout" class="button is-danger">Log out</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/index'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const logout = async () => {
  await axios.post('token/logout/').then(() => {
    console.log('logout')
  })

  axios.defaults.headers.common['Authorization'] = ''

  localStorage.removeItem('token')

  store.removeToken()

  router.push('/')
}
</script>

<style></style>
