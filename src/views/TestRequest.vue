<script setup lang="ts">
import { ref, type Ref } from 'vue'
import axios from 'axios'
import type { WeatherObject } from '@/stores/weatherObject';
const weatherData = ref({} as WeatherObject)

const lat: Ref<number | null> = ref(33.4484)
const lon: Ref<number | null> = ref(-112.0741)

function sendRequest() {
  axios
    .get(`http://localhost:8080/api/v1/weather/getWeather?lat=${lat.value}&lon=${lon.value}`)
    .then((response) => {
      weatherData.value = response.data
      console.log("res", response.data)
    })
}
</script>

<template>
  <main>
    <!-- Check if a value is undefined, meaning we have not sent a request yet -->
    <div v-if="weatherData.name == undefined">
      Send a request
    </div>
    <div v-else>
      <h2> Location at {{ weatherData.name }} (or lon: {{ weatherData.coord.lon }}, lat: {{ weatherData.coord.lat }} )
      </h2>
      <h4>{{ weatherData.main }} </h4>
      <h4>Currently at {{ weatherData.name }} it has {{ weatherData.weather[0].description }}</h4>
    </div>

    <button @click="sendRequest">send request</button>
    <h1>Lon: {{ lon }}</h1>

    <input v-model="lon" @input="event => {
      // @ts-ignore
      lon = event.target?.value
    }" />
    <h1>Lat: {{ lat }}</h1>
    <input v-model="lat" @input="event => {
      // @ts-ignore
      lat = event.target?.value
    }" />
  </main>
</template>
