<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import FooterItem from './components/FooterItem.vue';
import Navbar from './components/Navbar.vue';
import { onMounted, provide, reactive, ref, watch } from 'vue';
import Cookies from 'js-cookie';

//set up the global var and cookie
const ADMIN = reactive({
  value: false
})
const jwt = ref('');
//watches for any changes in our cookie
watch(jwt, (newValue: any) => {
  //expires in 10 days
  Cookies.set('jwt', newValue, { expires: 10, path: '' })
})

provide('jwt', jwt);
provide('admin', ADMIN);

onMounted(() => {
  const storedValue = Cookies.get('jwt')
  if (storedValue) {
    jwt.value = storedValue
  }
})
</script>

<template>
  <Navbar/>
  <br>
  

  <RouterView />

  <FooterItem/>
  <p>Your cookie: {{ jwt }}</p>
</template>

<style>
.base {
  background-color: black;
}
.btn-primary{
  background-color: #04be42;
  border: none;
  color: black;
  font-weight: bold;
}
.btn-primary:hover{
  background-color: #05aa3c;
  color: black;
  font-weight: bold;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
