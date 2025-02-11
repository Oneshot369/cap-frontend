<script setup lang="ts">
import router from '@/router'
import { JWTcookie } from '@/stores/cookie'
import type { LocationObject } from '@/stores/interface/locationObject'
import { onBeforeMount } from 'vue'
import { editLocation } from '@/stores/editLocation'
import { Error } from '@/stores/error'
import ConstraintItems from '@/components/ConstraintItems.vue'

let location: LocationObject
let locationLength: number = 0

onBeforeMount(() => {
  //if the editLocation value is not there return to the saved locations.
  if (editLocation.value) {
    location = editLocation.value
    //if its undefined / null its 0. if not set the real length
    locationLength = location.constraints ? location.constraints.length : 0
    console.log(locationLength)
  } else {
    location = {name: "", id: 0, lon: 0, lat: 0}
    locationLength = 0
    Error.code = 403
    Error.msg = "You attempted to access a resource by URL directly instead of through the correct channels. Please access this via the /user/saved url then select the edit button."
    router.push({
      path: `/error`
    })
  }
})
</script>

<template>
  <div>
    <div class="greeting">
      <h1 class="green">Edit {{ location.name }}</h1>

      <div class="container" v-if="locationLength != 0">
        <ConstraintItems :constraint-lists="location.constraints"/>
      </div>
      <div v-else>
        <p>
          Looks like you have no constraints for this location, create a new one to get started.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
