<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-secondary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="../assets/logo.png"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink to="/about">About</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink to="/test">Search Weather</RouterLink>
            
        </li>
        <li class="nav-item">
            <RouterLink to="/graph">Test a graph</RouterLink>
        </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <RouterLink to="/graph">Login</RouterLink>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
</template>

<style scoped>
a{
    text-decoration: none;
    font-weight: 600;
    font-size: large;
    color: black;
}
.nav-item{
    padding-left: 20px;
    margin: 5px
}
img{
    max-width: 50px;
}
nav{
    border-radius: 5px;
    
}
</style>