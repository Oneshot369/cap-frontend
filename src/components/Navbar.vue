<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { JWTcookie } from '@/stores/cookie'

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary" v-if="!JWTcookie.cookie">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="../assets/logo.png" /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item left-nav">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="nav-item left-nav">
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li class="nav-item left-nav">
            <RouterLink to="/search">Search Weather</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary" v-else>
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="../assets/logo.png" /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/search">Search Weather</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/logout">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  font-weight: 600;
  font-size: large;
  color: black;
  border-radius: 5px;
  padding: 12px 20px;
}
a:hover {
  border-radius: 5px;
  background-color: rgb(4, 190, 66);
  opacity: 0.5;
}
.nav-item {
  margin-left: 20px;
  justify-content: space-around;
}
img {
  max-width: 50px;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
}
nav {
  border-radius: 5px;
}
.navbar-nav {
  justify-content: space-between;
}
.left-nav {
  flex-grow: 4;
  display: flex;
  justify-content: center;
  margin-right: 55px;
}
</style>
