<script setup lang="ts">
import router from '@/router'
import { JWTcookie } from '@/stores/cookie'
import type { LocationObject } from '@/stores/interface/locationObject'
import { onBeforeMount } from 'vue'
import { editLocation } from '@/stores/editLocation'
import { Error } from '@/stores/error'

let location: LocationObject
let locationLength: number = 0

onBeforeMount(() => {
  if (JWTcookie.cookie == undefined) {
    router.push({
      path: '/login'
    })
  }
  //if the editLocation value is not there return to the saved locations.
  if (editLocation.value) {
    location = editLocation.value
    //if its undefined / null its 0. if not set the real length
    locationLength = location.constraints ? location.constraints.length : 0
    console.log(locationLength)
  } else {
    Error.code = 403
    Error.msg =
      "Forbidden. You tried to access a location without going thru the proper channel. Please select 'Saved Locations' then select edit on the constraint."
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
        {{ location.constraints }}
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
