<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">My Account</h1>
      </div>
    </div>
    <section class="section">
      <div class="colums is-multiline">
        <div class="column is-12">
          <h2 class="subtitle is-size-3">Your active courses</h2>
        </div>
        <div class="column is-4" v-for="course in courses" :key="course.id">
          <CourseItem :course="course" />
        </div>
      </div>

      <hr />

      <button @click="logout" class="button is-danger">Log out</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'
import { useUserStore } from '@/stores/index'

import CourseItem from '@/components/CourseItem.vue'

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

const courses: any = ref([])

onMounted(() => {
  axios.get('activities/get_active_courses/').then((response) => {
    courses.value = response.data
  })
})
</script>

<style></style>
