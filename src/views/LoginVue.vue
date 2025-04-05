<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { JWTcookie } from '@/stores/cookie'
import { Error } from '@/stores/error'

const apiUrl = import.meta.env.VITE_SPRING_API_URL
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const registerLogin = () => {
  errorMsg.value = ''
  let loginAttempt = {
    username: email.value,
    password: password.value
  }
  axios
    .post(`${apiUrl}/api/v1/user/login`, loginAttempt)
    .then((response) => {
      if (response.status == 200) {
        JWTcookie.setCookie(response.data.data)
        errorMsg.value = ''
        router.push({
          path: '/'
        })
      } else {
        errorMsg.value = response.data.data
      }
    })
    .catch((error) => {
      if (error.response.status == 400) {
        errorMsg.value = "Incorrect Username or password, please try again. "
      } else {
        console.error(error)
        errorMsg.value = 'Internal error'
        Error.code = 500
        Error.msg = 'Internal server error. Please try again.'
        router.push({
          path: '/error'
        })
      }
    })
}

//this makes sure the user is NOT logged in and throws them to the error page if they are.
onBeforeMount(() => {
  if (JWTcookie.cookie != undefined) {
    Error.code = 403
    Error.msg = 'Forbidden. Cannot access this page if you are logged in. Please log out.'
    router.push({
      path: '/error'
    })
  }
})
</script>

<template>
  <h1 class="greeting">Login</h1>
  <div class="forml">
    <form @submit.prevent="registerLogin">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
      </div>
      <p v-if="errorMsg">Error: {{ errorMsg }}</p>
      <button submit class="btn btn-primary">Submit</button>
      <p>Don't have an account? Click<a href="./register">Here</a></p>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

form {
  width: 75%;
  justify-self: center;
}

button {
  align-self: flex-start;
}
</style>
