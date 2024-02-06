<template>
  <div class="video-container">
    <iframe
      width="100%"
      height="400"
      frameborder="0"
      :src="'http://www.youtube.com/embed/' + youtube_id"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
defineProps({
  youtube_id: {
    type: String,
    required: true
  }
})
</script>

<style></style>
