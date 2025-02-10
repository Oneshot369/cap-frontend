<script setup lang="ts">
import { JWTcookie } from '@/stores/cookie'
import { onBeforeMount, ref } from 'vue'
import { Error } from '@/stores/error'
import router from '@/router'
import axios from 'axios'
import type { UserObject } from '@/stores/interface/userObject'
import SavedLocationsResults from '@/components/SavedLocationsResults.vue'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

const loading = ref(true)

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
          path: `/error`
        })
      }
    })
    .catch((error) => {
      Error.code = error.status
      Error.msg = error.code
      router.push({
        path: `/error`
      })
    })
    .finally(() => {
      loading.value = false
    })
}

//this makes sure the user is logged in and throws them to the error page if they not logged in.
onBeforeMount(() => {
  if (JWTcookie.cookie == undefined) {
    router.push({
      path: '/login'
    })
  }
  //then preform the API call to get the saved locations
  getLocations()
})
</script>

<template>
  <div class="greeting" v-if="loading">
    <h1 class="green">Welcome...</h1>
  </div>
  <div v-else>
    <div class="greeting">
      <h1 class="green">Welcome {{ user.firstName }}</h1>
    </div>
    <div v-if="user.locations.length > 0">
      <h3>Here are your saved locations:</h3>
      <SavedLocationsResults :locationList="user.locations" />
    </div>
    <div v-else>
      <h3>
        Looks like you haven't saved a location yet. You can search for a location
        <a href="/search">HERE</a>
      </h3>
    </div>
  </div>
</template>

<style lang="css" scoped>
h3 {
  text-align: center;
}
</style>
