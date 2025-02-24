<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { ConstraintObject } from '@/stores/interface/constraint'
import { WeatherTypes } from '@/stores/interface/weatherTypes'
import { JWTcookie } from '@/stores/cookie'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['add-item'])

let toggle = ref(false);
let showModal = ref(false);

let constraint = ref({
  id: props.id,
  name: '',
  condition: 'TEMP',
  val: '',
  greaterThan: false
})

let closeModal = () => {
  showModal.value = false
}

const addConstraint = () => {
  axios
    .post(
      `${apiUrl}/api/v1/user/saveConstraint`,
      {
        id: constraint.value.id,
        name: constraint.value.name,
        condition: constraint.value.condition,
        val: constraint.value.val,
        greaterThan: constraint.value.greaterThan
      },
      {
        headers: {
          Authorization: `Bearer ${JWTcookie.cookie}`
        }
      }
    )
    .then((response) => {
      if (response.status == 200) {
        emit('add-item', constraint)
      }
      closeModal()
    })
    .catch((error: any) => {
      console.error('Error fetching weather data', error)
    })
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <button class="btn btn-primary" @click="showModal = true">Open Modal</button>

    <!-- Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
      @click.self="closeModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-secondary">
          <div class="modal-header">
            <h5 class="modal-title">My Modal</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <label for="exampleInputEmail1" class="form-label">Name:</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="constraint.name"
              />
              <label for="exampleInputEmail1" class="form-label">For:</label>
              <select class="form-select" aria-label="Default select example" v-model="constraint.condition">
                <option @value="WeatherTypes.TEMP">{{ WeatherTypes.TEMP }}</option>
                <option @value="WeatherTypes.FEELS_LIKE">{{ WeatherTypes.FEELS_LIKE }}</option>
                <option @value="WeatherTypes.HUMIDITY">{{ WeatherTypes.HUMIDITY }}</option>
                <option @value="WeatherTypes.PRESSURE">{{ WeatherTypes.PRESSURE }}</option>
                <option @value="WeatherTypes.WIND_SPEED">{{ WeatherTypes.WIND_SPEED }}</option>
                <option @value="WeatherTypes.WIND_GUST">{{ WeatherTypes.WIND_GUST }}</option>
                <option @value="WeatherTypes.VISIBILITY">{{ WeatherTypes.VISIBILITY }}</option>
              </select>
              <label for="exampleInputEmail1" class="form-label">Value:</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="constraint.val"
              />
              <label for="exampleInputEmail1" class="form-label">Notify me when:</label>
              <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="true"
          checked
          v-model="toggle"
        />
        <label class="form-check-label" for="flexRadioDefault1"> Search by Name</label>
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="false"
          checked
          v-model="toggle"
        />
        <label class="form-check-label" for="flexRadioDefault1"> Search by Name</label>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="addConstraint">Send request</button>
            <button class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div class="modal-backdrop fade" :class="{ show: showModal }" v-if="showModal"></div>
  </div>
</template>

<style lang="css" scoped>
.modal {
  transition: opacity 0.3s ease-in-out;
  color: black;
}
.form-label {
  float: left;
  margin-left: 5px;
  padding-top: 5px;
}
</style>
