<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ForecastGraph from '@/components/ForecastGraph.vue'
import type { ForecastObject } from '../stores/interface/forecastObject.js'
import moment from 'moment'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { JWTcookie } from '@/stores/cookie.js'

// Get the current route
const route = useRoute()
const router = useRouter()

// Extract query parameters from the route
const lat = route.query.lat || 'Not provided'
const lon = route.query.lon || 'Not provided'

// Reactive state for the component
const loading = ref(true)
const data: any = ref(null)
const errormsg = ref<null | string>(null)

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

var weatherData = ref<ForecastObject>({
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

// Get the API base URL from environment variables
const apiUrl = import.meta.env.VITE_SPRING_API_URL

const saveLocationToAccount = async () => {
  axios
    .post(
      `${apiUrl}/api/v1/user/saveLocation`,
      {
        //we don't really need to have this id, but i makes more sense to me to have it
        id: '0',
        lon: lon,
        lat: lat,
        name: data.value.name
      },
      {
        headers: {
          Authorization: `Bearer ${JWTcookie.cookie}`
        }
      }
    )
    .then((response: any) => {
      data.value = response.data.data
      loading.value = false
      router.push({
          path: `/user/saved`
        });
    })
    .catch((error: any) => {
      console.error('Error fetching weather data', error)
    })
}

const fetchData = async () => {
  if (lat == 'Not provided') {
    router.push({
      path: '/error'
    })
  }
  if (lon == 'Not provided') {
    router.push({
      path: '/error'
    })
  }

  try {
    axios
      .get(`${apiUrl}/api/v1/weather/getWeather?lat=${lat}&lon=${lon}`)
      .then((response: any) => {
        data.value = response.data.data
        loading.value = false
      })
      .catch((error: any) => {
        console.error('Error fetching weather data', error)
        errormsg.value = 'Failed to fetch weather data'
      })
    sendForecastRequest()
  } catch (err: any) {
    errormsg.value = err.message || 'An error occurred.'
  } finally {
    loading.value = false
  }
}
function sendForecastRequest() {
  axios.get(apiUrl + `/api/v1/weather/getForecast?lat=${lat}&lon=${lon}`).then((response) => {
    var forecastResponse = response.data.data

    var labelList: string[] = []
    var dataList: number[] = []

    forecastResponse.list.forEach((element: any) => {
      let formattedDate = moment(element.dt_txt).format('MMM-DD HH:mm:ss')
      labelList.push(formattedDate)
      dataList.push(element.main.temp)
    })

    var forecast = {
      labels: labelList as string[],
      datasets: [
        {
          label: forecastResponse.city.name as string,
          data: dataList as number[],
          borderColor: '#04be42' as string,
          backgroundColor: '#04be42' as string,
        }
      ]
    } as any

    weatherData.value = forecast
  })
}

// Fetch the data before the component is fully mounted
onBeforeMount(fetchData)
</script>

<template>
  <div>
    <div v-if="JWTcookie.cookie" class="save-button-container">
      <button @click="saveLocationToAccount" class="btn btn-primary">Save Location</button>
    </div>
    <div v-if="loading" class="greeting">
      <h1 class="green">Weather for...</h1>
    </div>
    <div v-else class="greeting">
      <h1 class="green">Weather for {{ data.name }}</h1>
      <h2>Current Temp: {{ data.main.temp }}</h2>
      <div class="container">
        <div class="temp-text">
          <h3>Feels like: {{ data.main.feels_like }} °F</h3>
          <h3>Max Temp: {{ data.main.temp_max }} °F</h3>
          <h3>Min Temp: {{ data.main.temp_min }} °F</h3>
        </div>
        <div class="temp-text">
          <h3>Humidity: {{ data.main.humidity }} %</h3>
          <h3>Pressure: {{ data.main.pressure }} hPa</h3>
          <h3>Wind Speed: {{ data.wind.speed }} MPH</h3>
          <h3>&emsp;Gust: {{ data.wind.gust }} MPH</h3>
          <h3>
            &emsp;Direction: {{ data.wind.deg }} °
            <img
              src="../assets/Arrow.png"
              class="arrow"
              :style="{ transform: 'rotate(' + data.wind.deg + 'deg)' }"
            />
          </h3>
        </div>
      </div>
    </div>
    <div class="graph">
      <ForecastGraph :weather="weatherData" />
    </div>
    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 3.6rem;
  position: relative;

  top: -10px;
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
