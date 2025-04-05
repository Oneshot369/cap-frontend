<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Weather App" />
    </div>
  </header>
  <div class="greeting">
    <h1>This is an about page</h1>
  </div>
  <div class="text container">
    <img src="../assets/logo.png">
    <div class="about-text">
      <p>&emsp;Hello! My name is Joshua Peck, and I'm a senior at Grand Canyon University pursuing a degree in Software Development. I created Weather Notify as my senior capstone project to explore new technologies and sharpen my existing skills. Throughout this project, I built the frontend using Vue.js and designed the backend with Spring Boot and Java, leveraging tools like Lombok, SQL, and RESTful API design. One of the major highlights of this project is the integration of a complete CI/CD pipeline that automates the build, test, and deployment process. Every commit triggers a workflow that ensures smooth, consistent deployment to AWS. I also implemented scheduled email alerts, authentication, and cloud-hosted infrastructure, making this project a well-rounded demonstration of modern full-stack development practices.</p>
    </div>
    
  </div>
</template>

<style scoped>
.about-text{
  max-width: 40rem;
}
img{
  margin-left: 40px; 
}
.container{
  display: flex;
  justify-content: space-evenly;
}
</style>