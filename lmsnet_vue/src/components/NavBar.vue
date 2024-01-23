<template>
  <nav
    class="navbar is-info"
    role="navigation"
    aria-label="main navigation"
    style="min-height: 5rem"
  >
    <div class="navbar-brand">
      <a class="navbar-item is-size-4" href="/">LMSNet</a>
    </div>
    <div id="navbar-item" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/">Home</a>
        <a class="navbar-item" href="/about">About</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="/sign-up">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/log-in"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style></style>
