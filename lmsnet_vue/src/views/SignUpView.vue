<template>
  <div class="signup">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Sign up</h1>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="column">
          <div class="column is-4 is-offset-4">
            <form v-on:submit.prevent="submitForm">
              <div class="field">
                <label>Email</label>
                <div class="control"><input type="email" class="input" v-model="username" /></div>
              </div>
              <div class="field">
                <label>Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password" />
                </div>
              </div>
              <div class="field">
                <label>Confirm password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password2" />
                </div>
              </div>
              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" :key="error">{{ error }}</p>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-dark">Sign up</button>
                </div>
              </div>
            </form>

            <hr />

            Or <router-link to="/log-in">click here</router-link> to login!
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const password2 = ref('')

const errors: Ref<string[]> = ref([])

const submitForm = () => {
  errors.value = []
  if (username.value === '') {
    errors.value.push('Username is required')
  }
  if (username.value.length < 3) {
    errors.value.push('Username must be at least 3 characters')
  }
  if (password.value === '') {
    errors.value.push('Password is required')
  }
  if (password.value.length < 8) {
    errors.value.push('Password must be at least 8 characters')
  }
  if (password.value !== password2.value) {
    errors.value.push('Passwords do not match')
  }

  if (errors.value.length === 0) {
    const formData = {
      username: username.value,
      password: password.value
    }

    axios
      .post('/api/v1/users/', formData)
      .then((response) => {
        router.push('/log-in')
      })
      .catch((error) => {
        if (error.response) {
          for (const property in error.response.data) {
            errors.value.push(`${property}: ${error.response.data[property]}`)
          }
          console.log(JSON.stringify(error.response.data))
        } else if (error.message) {
          errors.value.push('Something went wrong. Please try again')

          console.log(JSON.stringify(error.message))
        }
      })
  }
}

onMounted(() => {
  document.title = 'Sign up | LMSNET'
})
</script>

<style></style>
