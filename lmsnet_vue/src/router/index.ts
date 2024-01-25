import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import CoursesView from '@/views/CoursesView.vue'
import CourseView from '@/views/CourseView.vue'

import MyAccountView from '@/views/Dashboard/MyAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: LoginView
    },
    {
      path: '/dashboard/my-account',
      name: 'my-account',
      component: MyAccountView
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView
    },
    {
      path: '/course/:slug',
      name: 'course',
      component: CourseView
    }
  ]
})

export default router
