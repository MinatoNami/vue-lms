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

                <template v-if="activeLesson.lesson_type === 'quiz'">
                  <Quiz :quiz="quiz" />
                </template>

                <template v-if="activeLesson.lesson_type === 'article'">
                  <CourseComment v-for="comment in comments" :key="comment.id" :comment="comment" />
                  <AddComment
                    :course="course"
                    :activeLesson="activeLesson"
                    @addComment="(value: any) => addComment(value)"
                  />
                </template>
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
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import type { QuizType, Comment } from '@/types/common-types'

import { useUserStore } from '@/stores'

import AddComment from '@/components/AddComment.vue'
import CourseComment from '@/components/CourseComment.vue'
import Quiz from '@/components/Quiz.vue'

const store = useUserStore()

const course: Ref<any> = ref({})
const lessons: Ref<any> = ref([])
const comments: Ref<Comment[]> = ref([])
const errors: Ref<string[]> = ref([])
const activeLesson: Ref<any> = ref({})

const quiz: Ref<QuizType> = ref({
  question: '',
  answer: '',
  op1: '',
  op2: '',
  op3: ''
})

const comment: Ref<Comment> = ref({
  name: '',
  content: ''
})

const currentRoute = useRoute()

const slug = currentRoute.params.slug

const setActiveLesson = (lesson: any) => {
  activeLesson.value = lesson

  if (lesson.lesson_type === 'quiz') {
    getQuiz()
  }

  document.title = lesson.title + ' | LMSNET'
  errors.value = []
  getComments()
}

const getComments = async () => {
  await axios.get(`courses/${slug}/${activeLesson.value.slug}/get-comments`).then((response) => {
    comments.value = response.data
  })
}

const addComment = (comment: Comment) => {
  comments.value.push(comment)
}

const getQuiz = async () => {
  await axios.get(`courses/${slug}/${activeLesson.value.slug}/get-quiz`).then((response) => {
    quiz.value = response.data
  })
}

onMounted(async () => {
  await axios.get(`courses/${slug}`).then((response) => {
    course.value = response.data.course
    lessons.value = response.data.lessons
  })
  document.title = course.value.title + ' | LMSNET'
})
</script>

<style></style>
