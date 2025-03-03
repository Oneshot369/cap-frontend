<script setup lang="ts">
import router from '@/router'
import { JWTcookie } from '@/stores/cookie'
import type { LocationObject } from '@/stores/interface/locationObject'
import { onBeforeMount, ref } from 'vue'
import { editLocation } from '@/stores/editLocation'
import { Error } from '@/stores/error'
import ConstraintItems from '@/components/ConstraintItems.vue'
import axios from 'axios'
import ConstraintModalAdd from '@/components/ConstraintModalAdd.vue'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

let location = ref<LocationObject>({
  id: 0,
  lon: 0,
  lat: 0,
  name: 'test'
})
let locationLength= ref<number>(0)

const childRef = ref<InstanceType<typeof ConstraintItems> | null>(null)

const addedItem = (constraint: any) => {
  axios
    .get(`${apiUrl}/api/v1/user/getLocation`, {
      headers: {
        Authorization: 'Bearer ' + JWTcookie.cookie
      }
    })
    .then((response) => {
      if (response.status == 200) {
        let locations = response.data.data.locations
        let didChange = false
        console.log('here locations from request', locations)
        console.log('Current', location)
        console.log('constraint', constraint)
        locations.forEach((loc: any) => {
          if (loc.id == location.value.id) {
            location.value.constraints = loc.constraints;
            didChange = true;
            //update child constraints
            locationLength.value = 1
            childRef.value?.handleAdd(loc.constraints)
          }
        })
        console.log('Added', location)
        if (!didChange) {
          pushBack()
        }
      } else {
        Error.code = response.status
        Error.msg = response.data
        router.push({
          path: `/error`
        })
      }
    })
    .catch((error) => {
      Error.code = error.status
      Error.msg = error.code
      router.push({
        path: `/error`
      })
    })
}
const pushBack = () => {
  router.push({
    path: `/user/saved`
  })
}

const deleteLocation = () => {
  axios
    .delete(`${apiUrl}/api/v1/user/deleteLocation?id=${location.value.id}`, {
      headers: {
        Authorization: 'Bearer ' + JWTcookie.cookie
      }
    })
    .then((response) => {
      if (response.status == 200) {
        pushBack()
      } else {
        Error.code = response.status
        Error.msg = response.data
        router.push({
          path: `/error`
        })
      }
    })
    .catch((error) => {
      Error.code = error.status
      Error.msg = error.code
      router.push({
        path: `/error`
      })
    })
}

onBeforeMount(() => {
  //if the editLocation value is not there return to the saved locations.
  if (editLocation.value) {
    location.value = editLocation.value
    //if its undefined / null its 0. if not set the real length
    locationLength.value = location.value.constraints ? location.value.constraints.length : 0
  } else {
    location.value = { name: '', id: 0, lon: 0, lat: 0 }
    locationLength.value = 0

    pushBack()
  }
})
</script>

<template>
  <div>
    <button class="btn btn-primary btn-padding" @click="pushBack()">Back</button>
    <div class="greeting">
      <h1 class="green">Alerts for {{ location.name }}</h1>

      <div class="container" v-if="locationLength != 0">
        <ConstraintItems :constraint-lists="location.constraints" ref="childRef" />
      </div>
      <div v-else>
        <p>
          Looks like you have no constraints for this location, create a new one to get started.
        </p>
      </div>
      <div class="add-constraint">
        <ConstraintModalAdd
          :locationId="location.id.toString()"
          @add-item="addedItem"
        ></ConstraintModalAdd>
      </div>

      <button class="btn btn-secondary btn-padding" @click="deleteLocation()">
        Delete Location
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-padding {
  margin-left: 20px;
}
.btn-secondary {
  float: left;
}
</style>
