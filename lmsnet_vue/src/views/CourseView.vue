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
              <li v-for="lesson in lessons" :key="lesson.id">
                <a @click="setActiveLesson(lesson)">{{ lesson.title }}</a>
              </li>
            </ul>
          </div>

          <div class="column is-10">
            <template v-if="store.user.isAuthenticated">
              <template v-if="activeLesson">
                <h2>{{ activeLesson.title }}</h2>
                {{ activeLesson.long_description }}
                <hr />

                <article class="media box" v-for="comment in comments" :key="comment.id">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{ comment.name }}</strong> {{ comment.created_at }}<br />
                        {{ comment.content }}
                      </p>
                    </div>
                  </div>
                </article>

                <form v-on:submit.prevent="submitComment">
                  <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                      <input type="text" class="input" v-model="comment.name" />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Comment</label>
                    <div class="control">
                      <textarea class="textarea" v-model="comment.content"></textarea>
                    </div>
                  </div>

                  <div class="notification is-danger" v-for="error in errors" :key="error">
                    {{ error }}
                  </div>

                  <div class="field">
                    <div class="control">
                      <button class="button is-link">Submit</button>
                    </div>
                  </div>
                </form>
              </template>
              <template v-else>
                {{ course.long_description }}
              </template>
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

interface Comment {
  name: string
  content: string
  created_at?: string
  id?: number
}

const store = useUserStore()

const course: Ref<any> = ref({})
const lessons: Ref<any> = ref([])
const comments: Ref<Comment[]> = ref([])
const errors: Ref<string[]> = ref([])
const activeLesson: Ref<any> = ref({})

const comment: Ref<Comment> = ref({
  name: '',
  content: ''
})

const currentRoute = useRoute()

const slug = currentRoute.params.slug

const submitComment = () => {
  errors.value = []

  if (!comment.value.name) {
    errors.value.push('Name is required.')
  }
  if (!comment.value.content) {
    errors.value.push('Comment is required.')
  }
  if (errors.value.length > 0) {
    return
  }
  axios
    .post(`api/v1/courses/${slug}/${activeLesson.value.slug}/`, comment.value)
    .then((response) => {
      comment.value = {
        name: '',
        content: ''
      }
      comments.value.push(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

const setActiveLesson = (lesson: any) => {
  activeLesson.value = lesson
  errors.value = []
  getComments()
}

const getComments = async () => {
  await axios
    .get(`api/v1/courses/${slug}/${activeLesson.value.slug}/get-comments`)
    .then((response) => {
      comments.value = response.data
    })
}

onMounted(async () => {
  await axios.get(`api/v1/courses/${slug}`).then((response) => {
    course.value = response.data.course
    lessons.value = response.data.lessons
  })
})
</script>

<style></style>
