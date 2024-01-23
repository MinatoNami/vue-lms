import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('index', () => {
  const user = ref({
    token: '',
    isAuthenticated: false
  })

  const initializeStore = () => {
    if (localStorage.getItem('token')) {
      user.value.token = localStorage.getItem('token') || ''
      user.value.isAuthenticated = true
    } else {
      user.value.token = ''
      user.value.isAuthenticated = false
    }
  }

  const setToken = (token: string) => {
    user.value.token = token
    user.value.isAuthenticated = true
  }

  const removeToken = () => {
    user.value.token = ''
    user.value.isAuthenticated = false
  }

  return { user, initializeStore, setToken, removeToken }
})
