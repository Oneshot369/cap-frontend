<script setup lang="ts">
import { defineProps } from 'vue';
import router from '@/router';
import type { LocationObject } from '@/stores/locationObject';

const props = defineProps<{
  locationList: LocationObject[];
}>();
console.log(props.locationList)

const handleClick = (lat: number, lon: number) =>{
  router.push({
    path: '/location',
    query:{
      lat: lat,
      lon: lon
    }
  });
}
</script>

<template>
  <div class="container">
      <div v-for="item in locationList" :key="item.lat" class="searches" @click="handleClick(item.lat, item.lon)">
        <h2>Name: {{ item.name }}</h2>
        <p>Lat/Lon: {{ item.lat }}, {{item.lon}}</p>
        <p>#{{ item.id }}</p>
      </div>
  </div>
</template>

<style scoped>
.searches{
  color: black; 
  background-color: rgb(108, 117, 125);
  margin: 10px;
  padding: 10px;
  min-width: 400px;
  border-radius: 10px;
  font-size: 25px;
}
.searches:hover{
  background-color: rgb(12, 175, 66);
  box-shadow: 5px 5px 10px rgba(0, 173, 66, 0.7);
  cursor: pointer;
}
.container{
  flex-wrap: wrap;
}
h2{
  font-size: 35px;
}
</style>