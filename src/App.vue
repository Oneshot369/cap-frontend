<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterItem from './components/FooterItem.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-wrapper">
  <Navbar />
  <br />
    <main>
  <RouterView />
</main>
  
  <FooterItem />
</div>
</template>

<style>
.base {
  background-color: black;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}



/* Buttons */
/* Green btn */

.btn-primary {
  background-color: #2fa54c;
  border: none;
  color: black;
  
}
.btn-primary:hover {
  background-color: #249343;
  box-shadow: 0 0 6px rgba(47, 165, 76, 0.4);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  color: black;

}
.btn-primary:focus,
.btn-primary:active,
.btn-primary:focus:active {
  background-color: #1d7034;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

/* Red btn */
.btn-secondary {
  background-color: #a72828;
  border: none;
  color: black;
  
}
.btn-secondary:hover {
  background-color: #8f1f1f;
  box-shadow: 0 0 6px rgba(167, 40, 40, 0.4); /* soft glow */
  transition: background 0.3s ease, box-shadow 0.3s ease;
  color: black;
}
.btn-secondary:focus,
.btn-secondary:active,
.btn-secondary:focus:active {
  background-color: #751717;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}
</style>
