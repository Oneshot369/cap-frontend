<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <p class="footer-text">Weather data provided by<a href="https://openweathermap.org/">OpenWeather</a>. Hosted using<a href="https://aws.amazon.com/">AWS</a>. <br>To view source code please visit my<a href="https://github.com/Oneshot369">GitHub</a></p>
  </footer>
</template>

<style>
.footer-text{
  text-align: center;
  clear:both;
}
.footer {
  padding: 1rem 0;
  margin-top: auto;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.15); /*white line */
}
.footer a {
  color: #04be42; 
  text-shadow: 0 0 2px rgba(4, 190, 66, 0.4); 
}
.footer a:hover {
  color: #05aa3c;
  text-shadow: 0 0 4px rgba(4, 190, 66, 0.6);
}
</style>
