<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Courses</h1>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">Categories</p>

              <ul class="menu-list">
                <li>
                  <a :class="{ 'is-active': activeCategory === -1 }" @click="setActiveCategory(-1)"
                    >All courses</a
                  >
                </li>
                <li v-for="category in categories" :key="category.id">
                  <a
                    :class="{ 'is-active': activeCategory === category.id }"
                    @click="setActiveCategory(category.id)"
                    >{{ category.title }}</a
                  >
                </li>
              </ul>
            </aside>
          </div>
          <div class="column is-10">
            <div class="columns is-multiline">
              <div v-for="(course, index) in courses" :key="index" class="column is-4">
                <CourseItem :course="course" />
              </div>

              <div class="column is-12">
                <nav class="pagination">
                  <a href="" class="pagination-previous">Previous</a>
                  <a href="" class="pagination-next">Next</a>

                  <ul class="pagination-list">
                    <li>
                      <a href="" class="pagination-link is-current">1</a>
                    </li>

                    <li>
                      <a href="" class="pagination-link">2</a>
                    </li>

                    <li>
                      <a href="" class="pagination-link">2</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
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

const courses: Ref<any> = ref([])
const categories: Ref<any> = ref([])
const activeCategory: Ref<any> = ref(null)

const setActiveCategory = (category: any) => {
  activeCategory.value = category

  getCourses(category)
}

const getCourses = async (category: any) => {
  let url = 'api/v1/courses/'
  if (activeCategory.value !== -1) {
    url += `?category_id=${activeCategory.value}`
  }
  axios.get(url).then((response) => {
    courses.value = response.data
  })
}

onMounted(() => {
  axios.get('api/v1/courses/get_categories').then((response) => {
    categories.value = response.data
  })
})
</script>

<style></style>
