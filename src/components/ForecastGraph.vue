<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

import { ref, type Ref } from 'vue'
import axios from 'axios'
import ForecastObject from '../stores/forecastObject.ts'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

var weatherData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Temperature',
      data: [40.3, 20.3, 12.5],
      borderColor: '#36A2EB',
      backgroundColor: '#9BD0F5'
    }
  ]
} as ForecastObject)
const apiUrl = import.meta.env.VITE_SPRING_API_URL

var options = {
  responsive: true
}

function sendForecastRequest() {
  axios
    .get(apiUrl + `/api/v1/weather/getForecast?lat=33.448376&lon=-112.074036`)
    .then((response) => {
      console.log(`Current value from our graph: `, weatherData.value)
      var forecastResponse = response.data.data

      var labelList = []
      var dataList = []

      forecastResponse.list.forEach((element) => {
        labelList.push(element.dt)
        dataList.push(element.main.temp)
      })

      var forecast = {
        labels: labelList,
        datasets: {
          label: forecastResponse.city.name,
          data: dataList,
          borderColor: '#36A2EB',
          backgroundColor: '#9BD0F5'
        }
      } as ForecastObject

      weatherData.value = forecast

      console.log(`Value from response: `, response.data)
      console.log(`Value from our graph: `, forecast)
    })
}
</script>

<template>
  <div>
    <h1>This is a graph for a location</h1>
    <Bar :data="weatherData" :options="options"></Bar>
  </div>
  <button @click="sendForecastRequest" class="btn btn-primary">Get forecast</button>
</template>

<style scoped></style>
