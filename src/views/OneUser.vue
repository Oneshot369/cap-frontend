<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Error } from '@/stores/error'
import router from '@/router'
import type { UserObject } from '@/stores/interface/userObject';
import { JWTcookie } from '@/stores/cookie';
import UserSearchLocations from '@/components/UserSearchLocations.vue'

const route = useRoute();
const userId = route.params.id;

// Get the API base URL from environment variables
const apiUrl = import.meta.env.VITE_SPRING_API_URL

const user = ref<UserObject>({
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
});
const loading = ref(true);

const getUser= () =>{
  axios
    .get(`${apiUrl}/api/v1/user/getUserById?id=${userId}`, {
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

onBeforeMount(getUser);
</script>

<template>
  <div>
    <div v-if="loading">
      <h1 class="green">Loading...</h1>
    </div>
    <div v-else>
      <h1 class="green">User account: {{ user.username }}</h1>
      <div class="container">
        <div class="temp-text">
          <h3>ID: #{{ user.id }}</h3>
          <h3>Name: {{ user.firstName }} {{ user.lastName }}</h3>
        </div>
        <div class="temp-text">
          <h3>Age: {{ user.age }}</h3>
          <h3>Last Logon: {{ user.lastLogin }}</h3>
        </div>
        
      </div>
      <div v-if="user.locations.length > 0">
      <h2>Here are the saved locations for the user:</h2>
      <UserSearchLocations :searchResults="user.locations" />
    </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
.greetings h1 {
  text-align: center;
  align-items: center;
}
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  align-items: flex-start;
}
.temp-text {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-left: 17%;
}
.temp-text h3 {
  padding-bottom: 10px;
}
.arrow {
  max-width: 30px;
  margin-bottom: 10px;
}
.graph {
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 90%; 
  height: auto; 
  max-width: 100rem; 
  margin: 0 auto; 
}
.save-button-container {
  display: flex;
  justify-content: flex-end; 
  padding-right: 20px;        
  margin-top: 20px;          
}
</style>
