<script setup lang="ts">
import { defineProps } from 'vue'
import router from '@/router'
import type { LocationObject } from '@/stores/interface/locationObject'
import { editLocation } from '@/stores/editLocation'

defineProps<{
  locationList: LocationObject[]
}>()

const handleClick = (lat: number, lon: number) => {
  router.push({
    path: '/location',
    query: {
      lat: lat,
      lon: lon
    }
  })
}
const handleEditClick = (location: LocationObject) => {
  console.log(location)
  editLocation.value = location
  router.push({
    path: '/user/location'
  })
}
</script>

<template>
  <div class="container">
    <div
      v-for="item in locationList"
      :key="item.lat"
      class="searches"
      @click="handleClick(item.lat, item.lon)"
    >
      <h2>Name: {{ item.name }}</h2>
      <p>Lat/Lon: {{ item.lat }}, {{ item.lon }}</p>
      <p>#{{ item.id }}</p>
      <button class="btn btn-primary" @click.stop="handleEditClick(item)">Edit</button>
    </div>
  </div>
</template>

<style scoped>
.searches {
  color: black;
  background-color: rgb(108, 117, 125);
  margin: 10px;
  padding: 10px;
  min-width: 400px;
  border-radius: 10px;
  font-size: 25px;
}
.searches:hover {
  background-color: rgb(146, 155, 163);
  box-shadow: 5px 5px 10px rgba(146, 155, 163, 0.7);
  cursor: pointer;
}
.container {
  flex-wrap: wrap;
}
h2 {
  font-size: 35px;
}
</style>
