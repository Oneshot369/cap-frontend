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

//this makes sure the user is logged in and throws them to the error page if they not logged in.
onBeforeMount(() => {
  if (JWTcookie.cookie == undefined) {
    Error.code = 403
    Error.msg =
      'Forbidden. Cannot access this page if not logged in. Please log in or create an account.'
    router.push({
      path: '/error'
    })
  }
})
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
