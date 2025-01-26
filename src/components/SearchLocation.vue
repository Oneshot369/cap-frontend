<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import SearchResults from './SearchResults.vue' // Import the SearchResults component
import type { WeatherObject } from '@/stores/weatherObject'
import router from '@/router'

const apiUrl = import.meta.env.VITE_SPRING_API_URL
const weatherData = ref<WeatherObject | null>(null)

const lat = ref<number>(33.4484)
const lon = ref<number>(-112.0741)
const location = ref<string | null>('Phoenix')
const errormsg = ref<string | null>('')
const searchResults = ref<[] | null>([])

const toggle = ref<string>('N')

const oneLocation = () => {
  router.push({
    path: '/location',
    query: {
      lat: lat.value,
      lon: lon.value
    }
  })
}

function sendRequestWithName() {
  if (location.value) {
    axios
      .get(`${apiUrl}/api/v1/weather/getWeatherFromName?locationName=${location.value}`)
      .then((response) => {
        searchResults.value = response.data.data
        console.log(searchResults.value)
        errormsg.value = ''
      })
      .catch((error) => {
        console.error('Error fetching location data', error)
        errormsg.value = 'Failed to fetch location data'
      })
  } else {
    errormsg.value = 'Enter a name before you try searching'
  }
}
</script>

<template>
  <main>
    <div class="greeting">
      <h1 class="green">Search a location</h1>
    </div>
    <div class="searches container">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="N"
          checked
          v-model="toggle"
        />
        <label class="form-check-label" for="flexRadioDefault1"> Search by Name</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="L"
          v-model="toggle"
        />
        <label class="form-check-label" for="flexRadioDefault2"> Search by Lon/Lat </label>
      </div>
    </div>
    <div class="searches container">
      <div class="weather-search" v-if="toggle != 'N'">
        <h1 class="lon-header">Lon: {{ lon }}</h1>
        <input class="form-control" v-model="lon" />

        <h1 class="lon-header">Lat: {{ lat }}</h1>
        <input class="form-control" v-model="lat" />

        <br /><br />
        <button @click="oneLocation" class="btn btn-primary">Search by coordinates</button>
        <br /><br />
      </div>
      <div class="weather-search" v-else>
        <h1>Name of location: {{ location }}</h1>
        <input class="form-control" v-model="location" />

        <br /><br />
        <button @click="sendRequestWithName" class="btn btn-primary">Search by Name</button>

        <p>{{ errormsg }}</p>

        <br />
      </div>
    </div>
    <div v-if="searchResults == null || searchResults.length == 0" class="request">
      Send a request, either type in the longitude and latitude, or search your location by name!
    </div>

    <div v-else>
      <SearchResults :searchResults="searchResults" />
    </div>
  </main>
</template>

<style lang="css">
.searches {
  justify-content: space-around;
}
.weather-search {
  width: 100%;
}
.request {
  text-align: center;
}
.lon-header{
  padding-top: 5px;
}
</style>
