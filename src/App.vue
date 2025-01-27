<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterItem from './components/FooterItem.vue'
import Navbar from './components/Navbar.vue'
import { JWTcookie } from './stores/cookie'
</script>

<template>
  <Navbar />
  <br />

  <RouterView />

  <FooterItem />
  <p>Your cookie: {{ JWTcookie.cookie }}</p>
</template>

<style>
.base {
  background-color: black;
}
.btn-primary {
  background-color: #04be42;
  border: none;
  color: black;
  font-weight: bold;
}
.btn-primary:hover {
  background-color: #05aa3c;
  color: black;
  font-weight: bold;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
