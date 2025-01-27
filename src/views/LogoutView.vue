<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'
import jwt from '@/stores/jwt'

const logout = () => {
  jwt.clearJWT
  router.push("/login");
}
</script>

<template>
  <h1 class="greeting">Logout</h1>
  <div class="greeting">
    <h1>Sorry to see you go</h1>
  </div>
  <div class="button-center">
    <button @click="logout" class="btn btn-primary">Logout</button>
  </div>
</template>

<style scoped>
.button-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
</style>
