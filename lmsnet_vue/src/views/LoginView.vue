<template>
  <div class="login">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Log in</h1>
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
              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" :key="error">{{ error }}</p>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-dark">Login</button>
                </div>
              </div>
            </form>

            <hr />

            Or <router-link to="/sign-up">click here</router-link> to sign-up!
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import axios from 'axios'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const username = ref('')
const password = ref('')

const errors: Ref<string[]> = ref([])

const submitForm = () => {
  axios.defaults.headers.common['Authorization'] = ''

  localStorage.removeItem('token')

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

  if (errors.value.length === 0) {
    const formData = {
      username: username.value,
      password: password.value
    }

    axios
      .post('/api/v1/token/login/', formData)
      .then((response) => {
        const token = response.data.auth_token
        store.setToken(token)

        axios.defaults.headers.common['Authorization'] = `Token ${token}`

        localStorage.setItem('token', token)
        router.push('/dashboard/my-account')
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
</script>

<style></style>
