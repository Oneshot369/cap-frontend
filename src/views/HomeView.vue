<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import HelloWorld from '../components/HelloWorld.vue';



</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Weather Notify" />
    </div>
  </header>
  <div class="greeting">
    <h1>Get weather information anywhere in the world!</h1>
  </div>
  <div class="container">
    <p> &emsp;Welcome to Weather Notify, your modern weather companion designed for fast, reliable, and accessible forecasts. With this app, you can easily check current weather conditions and view detailed temperature forecasts for any location. Whether you're planning your day or preparing for the week ahead, Weather Notify gives you up-to-date insights to help you stay ahead of changing conditions. This project was built as part of a senior capstone to demonstrate practical, real-world frontend development and user-focused design.</p>
    <p> &emsp;One of Weather Notify's standout features is its customizable weather alerts. Users can define specific weather conditions and set upper or lower bounds for metrics like temperature. Once saved, the app continuously monitors the forecast—and if those conditions are met or exceeded, it automatically sends an alert to your email. This proactive notification system ensures you're never caught off guard, making it a powerful tool for planning, safety, and convenience.</p>
  </div>
</template>

<style scoped>


p{
  margin:10px;
  padding: 10px;
}
.container {
  display: flex;
  padding: 10px;
  align-items: flex-start; 
  justify-content: center;
  gap: 20px; 
}
</style>