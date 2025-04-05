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
      :key="item.id"
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
.searches{
  background-color: #2c2f33; 
  color: #f0f0f0;
  margin: 10px;
  padding: 10px;
  min-width: 400px;
  border-radius: 10px;
  font-size: 25px;
  
}
.searches:hover{
  background: radial-gradient(
    circle at center,
    rgba(4, 190, 66, 0.15) 0%,
    #2c2f33 70%
  );
  box-shadow: 0 0 10px rgba(4, 190, 66, 0.5);
  cursor: pointer;
}
.container {
  flex-wrap: wrap;
}
h2 {
  font-size: 35px;
}
</style>
