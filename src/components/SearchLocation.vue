<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import SearchResults from './SearchResults.vue'; // Import the SearchResults component
import type { WeatherObject } from '@/stores/weatherObject';

const apiUrl = import.meta.env.VITE_SPRING_API_URL;
const weatherData = ref<WeatherObject | null>(null);

const lat = ref<number>(33.4484);
const lon = ref<number>(-112.0741);
const location = ref<string | null>('');
const errormsg = ref<string | null>('');
const searchResults = ref<[] | null>([]);

function sendRequest() {
  axios
    .get(`${apiUrl}/api/v1/weather/getWeather?lat=${lat.value}&lon=${lon.value}`)
    .then((response) => {
      weatherData.value = response.data.data;
    })
    .catch((error) => {
      console.error('Error fetching weather data', error);
      errormsg.value = 'Failed to fetch weather data';
    });
}

function sendRequestWithName() {
  if (location.value) {
    axios
      .get(`${apiUrl}/api/v1/weather/getWeatherFromName?locationName=${location.value}`)
      .then((response) => {
        searchResults.value = response.data.data
        console.log(searchResults.value)
        errormsg.value = '';
      })
      .catch((error) => {
        console.error('Error fetching location data', error);
        errormsg.value = 'Failed to fetch location data';
      });
  } else {
    errormsg.value = 'Enter a name before you try searching';
  }
}
</script>

<template>
  <main>
    <div class="searches container">
      <div class="weather-search">
        <h1>Lon: {{ lon }}</h1>
        <input class="form-control" v-model="lon" />

        <h1>Lat: {{ lat }}</h1>
        <input class="form-control" v-model="lat" />

        <br /><br />
        <button @click="sendRequest" class="btn btn-primary">Search by coordinates</button>
        <br /><br />
      </div>
      <div class="weather-search">
        <h1>Name of location: {{ location }}</h1>
        <input class="form-control" v-model="location" />

        <br /><br />
        <button @click="sendRequestWithName" class="btn btn-primary">Search by Name</button>

        <p>{{ errormsg }}</p>

        <br />
      </div>
    </div>
    <div v-if="searchResults==null||searchResults.length == 0" class="request">
      Send a request, either type in the longitude and latitude, or search your location by name!
    </div>

    <div v-else>
      <SearchResults :searchResults="searchResults" />
    </div>
  </main>
</template>


<style lang="css">
.searches{
  justify-content: space-between;
  
}
.weather-search{
  width: 30rem;
  
}
.request{
  text-align: center;
}
</style>