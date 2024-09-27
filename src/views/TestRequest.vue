<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
const weatherData = ref('this is some data')

function sendRequest() {
  axios

    .get('http://localhost:8080/api/v1/weather/getWeather?lat=33.448376&lon=-112.074036')
    .then((response) => (weatherData.value = response as unknown as string))
}
</script>

<template>
  <main>
    <p>this is a test</p>
    <button @click="sendRequest">send request</button>
  </main>
</template>
