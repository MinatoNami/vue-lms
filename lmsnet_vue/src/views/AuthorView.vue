<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">By {{ created_by.first_name }} {{ created_by.last_name }}</h1>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div v-for="(course, index) in courses" :key="index" class="column is-4">
            <CourseItem :course="course" />
          </div>

          <div class="column is-12">
            <nav class="pagination">
              <a href="" class="pagination-previous">Previous</a>
              <a href="" class="pagination-next">Next</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CourseItem from '@/components/CourseItem.vue'
import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const courses: Ref<any> = ref([])
const created_by = ref({
  first_name: '',
  last_name: ''
})

const currentRoute = useRoute()
const getCourses = async (category: any) => {
  axios.get(`courses/get_author_courses/${currentRoute.params.id}/`).then((response) => {
    console.log(response.data)
    courses.value = response.data.courses
    created_by.value = response.data.created_by
  })
}

onMounted(() => {
  getCourses(-1)
})
</script>

<style></style>
