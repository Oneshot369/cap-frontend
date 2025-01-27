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
import type { ForecastObject } from '../stores/forecastObject.ts'

defineProps<{
  readonly weather: ForecastObject
}>()

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
var options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'black' // Set legend text color to black
      }
    },
    title: {
      display: true,
      text: 'Forecasted Temperature',
      color: 'black' // Set title text color to black
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black' // Set x-axis tick labels to black
      },
      title: {
        display: true,
        color: 'black' // Set x-axis title color to black (if any)
      }
    },
    y: {
      ticks: {
        color: 'black' // Set y-axis tick labels to black
      },
      title: {
        display: true,
        color: 'black' // Set y-axis title color to black (if any)
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

  background-color: #6c757d;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
