<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'
import { Line } from 'vue-chartjs'
import type { ForecastObject } from '../stores/interface/forecastObject.js'

defineProps<{
  readonly weather: ForecastObject
}>()

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
var options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'white' // Set legend text color to black
      }
    },
    title: {
      display: false,
      text: 'Forecasted Temperature',
      color: 'rgba(255, 255, 255, 0.9)' // Set title text color to black
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white' // Set x-axis tick labels to black
      },
      title: {
        display: true,
        color: 'white' // Set x-axis title color to black (if any)
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' 
      }
    },
    y: {
      ticks: {
        color: 'white' // Set y-axis tick labels to black
      },
      title: {
        display: true,
        color: 'white' // Set y-axis title color to black (if any)
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' 
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Forecasted Temperature:</h1>
    <div class="graph">
      <Line :data="weather" :options="options" width="1000" />
    </div>
  </div>
</template>

<style scoped>
.graph {
  width: 100%; /* Allow it to take up the full space provided by parent */
  max-width: 100%; /* Optional: set a max size for scaling */

  background-color: #2c2f33;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  box-shadow: 0 0 20px rgba(4, 190, 66, 0.4);
  margin-bottom: 60px;   
}
</style>
