<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import FooterItem from './components/FooterItem.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar/>
  <br>
  

  <RouterView />

  <FooterItem/>
</template>

<style scoped>
.base {
  background-color: black;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
