<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterItem from './components/FooterItem.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <br />

  <RouterView />
  
  <FooterItem />
</template>

<style>
.base {
  background-color: black;
}
.btn-primary {
  background-color: #04be42;
  border: none;
  color: black;
  
}
.btn-secondary {
  background-color: #be3904;
  border: none;
  color: black;
  
}
.btn-secondary:hover {
  background-color: #be4c1e;
  border: none;
  color: black;
}
.btn-primary:hover {
  background-color: #05aa3c;
  color: black;

}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
