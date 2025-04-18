<script setup lang="ts">
import { defineProps } from 'vue';
import router from '@/router';

const props = defineProps<{
  searchResults: any;
}>();
console.log(props.searchResults)

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
      <div v-for="item in searchResults" :key="item.lat" class="searches" @click="handleClick(item.lat, item.lon)">
        <h2>Name: {{ item.name }}</h2>
        <p>Lat: {{ item.lat }}</p>
        <p>Lon: {{item.lon}}</p>
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
.container{
  flex-wrap: wrap;
}
h2{
  font-size: 35px;
}
</style>