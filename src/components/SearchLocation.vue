<script setup lang="ts">
import { ref, type Ref } from 'vue'
import axios from 'axios'
import type { WeatherObject } from '@/stores/weatherObject';

const weatherData = ref({} as WeatherObject)

const lat: Ref<number | null> = ref(33.4484)
const lon: Ref<number | null> = ref(-112.0741)
const location: Ref<String | null> = ref("")
const errormsg : Ref<String | null> = ref("")

function sendRequest() {
  axios
    .get(`http://localhost:8080/api/v1/weather/getWeather?lat=${lat.value}&lon=${lon.value}`)
    .then((response) => {
      weatherData.value = response.data
      console.log(`Value from response of ${lat.value}, ${lon.value}`, response.data)
    })
}
function sendRequestWithName() {
  if(location.value != ""){
    axios
    .get(`http://localhost:8080/api/v1/weather/getWeatherFromName?locationName=${location.value}`)
    .then((response) => {
      let city = response.data[0]
      console.log("Geolocation result", response.data)
      lat.value = city.lat;
      lon.value = city.lon;
      sendRequest();
      errormsg.value = ""
    })
  }else{
    errormsg.value = "Enter a name before you try searching"
  }
  
}
</script>

<template>
  <main>
    

    
    <h1>Lon: {{ lon }}</h1>

    <input class="form-control" v-model="lon" @input="event => {
      // @ts-ignore
      lon = event.target?.value
    }" />
    <h1>Lat: {{ lat }}</h1>
    <input class="form-control" v-model="lat" @input="event => {
      // @ts-ignore
      lat = event.target?.value
    }" />
    <br><br>
    <button @click="sendRequest" class="btn btn-primary">Search by coordinates</button>
    <br><br>
    
    <h1>Name of location: {{ location }}</h1>

    <input class="form-control" v-model="location" @input="event => {
      // @ts-ignore
      location = event.target?.value
    }" />
    <br><br>
    <button @click="sendRequestWithName" class="btn btn-primary">Search by Name</button>
    <p>{{ errormsg }}</p>
    <br>
    <!-- Check if a value is undefined, meaning we have not sent a request yet -->
    <div v-if="weatherData.name == undefined">
      Send a request, either type in the longitude and latitude, or search you location by name!
    </div>
    <div v-else>
      <h2> Location at {{ weatherData.name }} (or lon: {{ weatherData.coord.lon }}, lat: {{ weatherData.coord.lat }} )</h2>
      <h4>{{ weatherData.main }} </h4>
      <h4>Currently at {{ weatherData.name }} it has {{ weatherData.weather[0].description }}</h4>
    </div>
  </main>
</template>
