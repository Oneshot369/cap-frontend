<script setup lang="ts">
import { computed, inject, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'
import { JWTcookie } from '@/stores/cookie'
import { Error } from '@/stores/error'

const logout = () => {
  JWTcookie.removeCookie()
  router.push('/login')
}

</script>

<template>
  <h1 class="greeting">Logout</h1>
  <div class="greeting">
    <h3>Sorry to see you go</h3>
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
