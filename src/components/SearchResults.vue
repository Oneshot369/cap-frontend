<script setup lang="ts">
import { defineProps } from 'vue';
import type { WeatherObject } from '@/stores/weatherObject';

const props = defineProps<{
  searchResults: any;
}>();
console.log(props.searchResults)
</script>

<template>
  <div class="container">
      <div v-for="item in searchResults" :key="item.lat" class="searches ">
        <h2>Name: {{ item.name }}</h2>
        <p>Lat/Lon: {{ item.lat }}, {{item.lon }}</p>
        <p>Country: {{ item.country }}</p>
        <p>State: {{ item.state }}</p>
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