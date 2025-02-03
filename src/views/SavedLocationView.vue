<script setup lang="ts">
import { JWTcookie } from '@/stores/cookie'
import { onBeforeMount, ref } from 'vue'
import { Error } from '@/stores/error'
import router from '@/router'
import axios from 'axios'
import type { LocationObject } from '@/stores/locationObject'
import type { UserObject } from '@/stores/userObject'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

let user = ref<UserObject>({
  id: 0,
  firstName: '',
  lastName: '',
  age: 0,
  lastLogin: '',
  locations: [
    {
      id: 0,
      lon: 0,
      lat: 0,
      name: 'test'
    }
  ]
})

const getLocations = () => {
  axios
    .get(`${apiUrl}/api/v1/user/getLocation`, {
      headers: {
        Authorization: 'Bearer ' + JWTcookie.cookie
      }
    })
    .then((response) => {
      if (response.status == 200) {
        user.value = response.data.data
      } else {
        Error.code = response.status
        Error.msg = response.data
        router.push({
          path: '/error'
        })
      }
    })
    .catch((error) => {
      Error.code = error.status
      Error.msg = error.router.push({
        path: '/error'
      })
    })
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
  //then preform the API call to get the saved locations
  getLocations()
})
</script>

<template>
  <div class="greeting">
    <h1 class="green">Welcome {{ user.firstName }}</h1>
  </div>
  <div v-if="user.locations.length > 0">
    {{ user.locations }}
  </div>
  <div v-else>
    <h3>
      Looks like you havent saved a location yet. You can search for a location
      <a href="/search">HERE</a>
    </h3>
  </div>
</template>

<style lang="css" scoped>
h3 {
  text-align: center;
}
</style>
