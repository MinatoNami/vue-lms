<template>
  <article class="media box">
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.name }}</strong> {{ comment.created_at }}<br />
          {{ comment.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface CourseComment {
  name: string
  content: string
  created_at?: string
  id?: number
}

defineProps({
  comment: {
    type: Object as PropType<CourseComment>,
    required: true
  }
})
</script>

<style></style>
