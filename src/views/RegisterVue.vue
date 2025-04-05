<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { JWTcookie } from '@/stores/cookie'
import { Error } from '@/stores/error'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const age = ref(0)
const password = ref('')
const emailError = ref('')
const registerError = ref('')

// Regex pattern for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Method to validate email
const validateEmail = () => {
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
  } else {
    emailError.value = '' // Clear error if valid
  }
}

const registerSubmit = () => {
  console.log("here")
  const newUser = {
    Id: 0,
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
    username: email.value,
    password: password.value
  }
  axios
    .post(`${apiUrl}/api/v1/user/saveUser`, newUser)
    .then((response) => {
      console.log(response)
      if (response.status == 200) {
        router.push({
          path: '/login'
        })
      } else {
        registerError.value = 'An error occurred please try again'
      }
    })
    .catch((error) => {
      console.error('Error fetching location data', error)
      registerError.value = 'Internal Error occurred. Please try again at another time.'
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
  <h1 class="greeting">Register</h1>
  <form @form.prevent="validateEmail" @submit.prevent="registerSubmit">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="email"
        @input="validateEmail"
        required
      />
      <p v-if="emailError">{{ emailError }}</p>
    </div>
    <div class="mb-3">
      <label for="Password" class="form-label">Password</label>
      <input type="password" class="form-control" id="Password" v-model="password" required />
    </div>
    <div class="mb-3">
      <label for="FName" class="form-label">First Name</label>
      <input type="text" class="form-control" id="FName" v-model="firstName" required />
    </div>
    <div class="mb-3">
      <label for="LName" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="LName" v-model="lastName" required />
    </div>
    <div class="mb-3">
      <label for="Age" class="form-label">Age</label>
      <input type="number" class="form-control" id="Age" v-model="age" required />
    </div>
    <p v-if="registerError">{{ registerError }}</p>
    <button type="submit" class="btn btn-primary">Submit</button>
    <p>Already have and account? Click<a href="./login">Here</a></p>
  </form>
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
