<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import type { QuizType } from '@/types/common-types'
import { ref, type PropType, type Ref } from 'vue'

const props = defineProps({
  quiz: {
    type: Object as PropType<QuizType>,
    required: true
  }
})

const selectedAnswer = ref(null)
const quizResult: Ref<string> = ref('')

const submitQuiz = async () => {
  quizResult.value = ''
  if (selectedAnswer.value) {
    if (selectedAnswer.value === props.quiz.answer) {
      quizResult.value = 'Correct'
    } else {
      quizResult.value = 'Incorrect'
    }
  }
}
</script>
