<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Create course</h1>
      </div>
    </div>
    <section class="section">
      <div class="mb-6 px-6 py-4 has-background-grey-lighter">
        <h2 class="subtitle">Meta Information</h2>
        <div class="field">
          <div class="field">
            <label>Title</label>
            <input type="text" class="input" v-model="form.title" />
          </div>
          <div class="field">
            <label>Short description</label>
            <textarea class="textarea" v-model="form.short_description" />
          </div>
          <div class="field">
            <label>Long description</label>
            <textarea class="textarea" v-model="form.long_description" />
          </div>

          <div class="field">
            <div class="select is-multiple">
              <select multiple size="10" v-model="form.categories">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6 px-6 py-4 has-background-grey-lighter">
        <h2 class="subtitle">Lessons</h2>
        <div v-for="(lesson, index) in form.lessons" :key="index">
          <h3 class="subtitle is-size-6">Lesson</h3>
          <div class="field">
            <label>Title</label>
            <input
              type="text"
              class="input"
              v-model="lesson.title"
              :name="`form.lessons[${index}][title]`"
            />
          </div>
          <div class="field">
            <label>Short description</label>
            <textarea
              class="textarea"
              v-model="lesson.short_description"
              :name="`form.lessons[${index}][short_description]`"
            />
          </div>
          <div class="field">
            <label>Long description</label>
            <textarea
              class="textarea"
              v-model="lesson.long_description"
              :name="`form.lessons[${index}][long_description]`"
            />
          </div>
        </div>
        <button class="button is-primary" @click="addLesson">Add lesson</button>
      </div>
      <div class="field buttons">
        <button class="button is-success" @click="submitForm('draft')">Save as draft</button>
        <button class="button is-info" @click="submitForm('review')">Submit for review</button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'

interface Lesson {
  title: string
  short_description: string
  long_description: string
}

interface AddCourseForm {
  title: string
  short_description: string
  long_description: string
  categories: number[]
  status: string
  lessons: Lesson[]
}

const form: Ref<AddCourseForm> = ref({
  title: '',
  short_description: '',
  long_description: '',
  categories: [],
  status: '',
  lessons: []
})

const categories: Ref<any> = ref([])

const getCategories = async () => {
  axios.get('courses/get_categories').then((response) => {
    categories.value = response.data
    console.log(categories.value)
  })
}

const submitForm = async (status: string) => {
  form.value.status = status
  axios
    .post('courses/create/', form.value)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

const addLesson = () => {
  form.value.lessons.push({
    title: '',
    short_description: '',
    long_description: ''
  })
}

onMounted(() => {
  getCategories()
})
</script>

<style lang="less" scoped></style>
