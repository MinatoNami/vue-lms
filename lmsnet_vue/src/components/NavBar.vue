<template>
  <nav
    class="navbar is-info"
    role="navigation"
    aria-label="main navigation"
    style="min-height: 5rem"
  >
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item is-size-4">LMSNet</router-link>
    </div>
    <div id="navbar-item" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
        <router-link to="/courses" class="navbar-item">Courses</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!store.user.isAuthenticated">
              <router-link to="/sign-up" class="button is-primary">
                <strong>Sign up</strong>
              </router-link>
              <router-link to="/log-in" class="button is-light">Log in</router-link>
            </template>
            <template v-else>
              <router-link to="/dashboard/my-account" class="button is-info"
                >My account</router-link
              >
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'

const store = useUserStore()
</script>

<style></style>
