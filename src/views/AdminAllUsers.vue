<script setup lang="ts">
import { JWTcookie } from '@/stores/cookie'
import { onBeforeMount, ref } from 'vue'
import { Error } from '@/stores/error'
import router from '@/router'
import axios from 'axios'
import type { UserObject } from '@/stores/interface/userObject'
import SavedLocationsResults from '@/components/SavedLocationsResults.vue'
import UsersList from '@/components/UsersList.vue'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

const loading = ref(true)

let users = ref<UserObject[]>([]);
let filterUsers = ref<UserObject[]>([]);
let search = ref<string>("");

// Method to search the list
const filterAdmin = () => {
  const query = search.value.trim().toLowerCase();
  filterUsers.value = users.value.filter( user =>user.username.toLowerCase().includes(query))
}

const getUsers = () => {
  axios
    .get(`${apiUrl}/api/v1/user/getAllUsers`, {
      headers: {
        Authorization: 'Bearer ' + JWTcookie.cookie
      }
    })
    .then((response) => {
      if (response.status == 200) {
        users.value = response.data.data
        filterUsers.value = response.data.data
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
  getUsers();
})
</script>

<template>
  <div class="greeting" v-if="loading">
    <h1 class="green">Welcome...</h1>
  </div>
  <div v-else>
    <div class="greeting">
      <h1 class="green">Admin View</h1>
    </div>
    
    <h3>Here are the current users:</h3>
    <div class="input">
    <label for="email" class="form-label">Search by Username:</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="search"
        @input="filterAdmin"
        required
      />
    </div>
      <UsersList :usersList="filterUsers"></UsersList>
    
  </div>
  
</template>

<style lang="css" scoped>
h3 {
  text-align: center;
}
.input{
  width:750px;
  margin: 0 auto; /* centers the input div */
  text-align: center;
}
</style>
