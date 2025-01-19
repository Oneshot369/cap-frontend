<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import FooterItem from './components/FooterItem.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar/>
  <br>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Weather App" />
    </div>
  </header>

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
