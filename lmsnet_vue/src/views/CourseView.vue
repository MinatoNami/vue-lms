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
                  <h3>{{ quiz.question }}</h3>

                  <div class="control">
                    <label class="radio">
                      <input type="radio" :value="quiz.op1" v-model="selectedAnswer" />
                      {{ quiz.op1 }}
                    </label>
                  </div>

                  <div class="control">
                    <label class="radio">
                      <input type="radio" :value="quiz.op2" v-model="selectedAnswer" />
                      {{ quiz.op2 }}
                    </label>
                  </div>

                  <div class="control">
                    <label class="radio">
                      <input type="radio" :value="quiz.op3" v-model="selectedAnswer" />
                      {{ quiz.op3 }}
                    </label>
                  </div>

                  <div class="control mt-4">
                    <button class="button is-info" @click="submitQuiz">Submit</button>
                  </div>

                  <template v-if="quizResult === 'Correct'">
                    <div class="notification is-success mt-4">Correct :-D</div>
                  </template>

                  <template v-if="quizResult === 'Incorrect'">
                    <div class="notification is-danger mt-4">Wrong! Please try again</div>
                  </template>
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
import AddComment from '@/components/AddComment.vue'
import CourseComment from '@/components/CourseComment.vue'
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

interface Quiz {
  question: string
  answer: string
  op1: string
  op2: string
  op3: string
}

interface CourseComment {
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

const quiz: Ref<Quiz> = ref({
  question: '',
  answer: '',
  op1: '',
  op2: '',
  op3: ''
})
const selectedAnswer = ref(null)
const quizResult: Ref<string> = ref('')

const comment: Ref<Comment> = ref({
  name: '',
  content: ''
})

const currentRoute = useRoute()

const slug = currentRoute.params.slug

const setActiveLesson = (lesson: any) => {
  activeLesson.value = lesson

  if (lesson.lesson_type === 'quiz') {
    selectedAnswer.value = null
    getQuiz()
  }

  document.title = lesson.title + ' | LMSNET'
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

const addComment = (comment: CourseComment) => {
  comments.value.push(comment)
}

const getQuiz = async () => {
  await axios.get(`api/v1/courses/${slug}/${activeLesson.value.slug}/get-quiz`).then((response) => {
    quiz.value = response.data
  })
}

const submitQuiz = async () => {
  quizResult.value = ''
  if (selectedAnswer.value) {
    if (selectedAnswer.value === quiz.value.answer) {
      quizResult.value = 'Correct'
    } else {
      quizResult.value = 'Incorrect'
    }
  }
}

onMounted(async () => {
  await axios.get(`api/v1/courses/${slug}`).then((response) => {
    course.value = response.data.course
    lessons.value = response.data.lessons
  })
  document.title = course.value.title + ' | LMSNET'
})
</script>

<style></style>
