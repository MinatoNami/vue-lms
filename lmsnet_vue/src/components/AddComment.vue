<template>
  <form v-on:submit.prevent="submitComment()">
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

<script setup lang="ts">
import axios from 'axios'
import { ref, type PropType, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  course: {
    type: Object as PropType<any>,
    required: true
  },
  activeLesson: {
    type: Object as PropType<any>,
    required: true
  }
})

interface CourseComment {
  name: string
  content: string
  created_at?: string
  id?: number
}

const comment: Ref<CourseComment> = ref({
  name: '',
  content: ''
})

const errors: Ref<string[]> = ref([])
const currentRoute = useRoute()

const slug = currentRoute.params.slug

const emit = defineEmits(['addComment'])
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
    .post(`courses/${slug}/${props.activeLesson.slug}/`, comment.value)
    .then((response) => {
      comment.value = {
        name: '',
        content: ''
      }
      emit('addComment', response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style></style>
