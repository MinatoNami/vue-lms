<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">{{ course.title }}</h1>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns content">
          <div class="column is-2">
            <h2>Table of contents</h2>
            <ul>
              <li><a href="#">Introduction</a></li>
              <li><a href="#">Get started</a></li>
              <li><a href="#">Part 1</a></li>
              <li><a href="#">Part 2</a></li>
              <li><a href="#">Summary</a></li>
            </ul>
          </div>

          <div class="column is-10">
            <template v-if="store.user.isAuthenticated">
              {{ course.long_description }}
            </template>
            <template v-else>
              <h2>Restricted access</h2>

              <p>You need to have an account to continue!</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useUserStore()

const course: Ref<any> = ref([])
const currentRoute = useRoute()

const slug = currentRoute.params.slug

onMounted(() => {
  axios.get(`api/v1/courses/${slug}`).then((response) => {
    course.value = response.data
  })
})
</script>

<style></style>