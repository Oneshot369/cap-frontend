<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 3.6rem;
  position: relative;
  
  top: -10px;
}

.greetings h1 {
  text-align: center;
  align-items: center;
}
</style>
