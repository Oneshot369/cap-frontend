<script setup lang="ts">
import { defineProps } from 'vue'
import router from '@/router'
import type { UserObject } from '@/stores/interface/userObject';

defineProps<{
  usersList: UserObject[]
}>()

const handleClick = (user: UserObject) => {
  router.push({
    path: `/admin/user/${user.id}`
  })
}
</script>

<!-- There are two errors here, but I have looking into them and they should not be happening, 
 not only that but they also work so IDK why the compiler is mad at them -->
<template>
  <div class="container">
    <div
      v-for="item in usersList"
      :key="item.id"
      class="searches"
      @click="handleClick(item)"
    >
      <h2>U-Name: {{ item.username }}</h2>
      <p>Age: {{ item.age }}</p>
      <p>Last Logon: {{ item.lastLogin }}</p>
      <p>Locations #: {{ item.locations.length }}</p>
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
/* This makes it so the h2 header text gets clipped */
.searches h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 370px; 
}
.container {
  flex-wrap: wrap;
}
h2 {
  font-size: 35px;
}
</style>
