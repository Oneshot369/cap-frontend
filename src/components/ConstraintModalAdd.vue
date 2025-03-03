<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { ConstraintObject } from '@/stores/interface/constraint'
import { WeatherTypes } from '@/stores/interface/weatherTypes'
import { JWTcookie } from '@/stores/cookie'

const apiUrl = import.meta.env.VITE_SPRING_API_URL

const props = defineProps({
  locationId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['add-item'])

let toggle = ref(false)
let showModal = ref(false)
let nameError = ref(false);
let valError = ref(false);

let constraint = ref({
  id: props.locationId,
  name: '',
  condition: 'TEMP',
  val: '',
  greaterThan: false
})

const closeModal = () => {
  showModal.value = false
  //clear the add model
  clearAddConstraint();
}

const clearAddConstraint = () =>{
  constraint.value.name = '';
  constraint.value.val = '';
  constraint.value.greaterThan = false;
}

const checkVal = () => {
  let didPass = true;
  nameError.value = false;
  valError.value = false;
  if (constraint.value.name == '') {
    nameError.value = true;
    didPass = false
  }
  if (constraint.value.val == '') {
    valError.value = true;
    didPass = false
  }
  return didPass;
}

const addConstraint = () => {
  //set our toggle value to our constraint.
  constraint.value.greaterThan = toggle.value
  if (checkVal()) {
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
          emit('add-item', constraint);
        }
        closeModal();
        
      })
      .catch((error: any) => {
        console.error('Error fetching weather data', error)
      })
  }
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <button class="btn btn-primary" @click="showModal = true">Create Alert</button>

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
            <h5 class="modal-title">Create a new Alert</h5>
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
              <small id="emailHelp" class="form-text text-error" :style="{ display: nameError ? 'block' : 'none' }">Cannot be blank</small>

              <br>

              <label for="exampleInputEmail1" class="form-label">For:</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="constraint.condition"
              >
                <option @value="WeatherTypes.TEMP">{{ WeatherTypes.TEMP }}</option>
                <option @value="WeatherTypes.FEELS_LIKE">{{ WeatherTypes.FEELS_LIKE }}</option>
                <option @value="WeatherTypes.HUMIDITY">{{ WeatherTypes.HUMIDITY }}</option>
                <option @value="WeatherTypes.PRESSURE">{{ WeatherTypes.PRESSURE }}</option>
                <option @value="WeatherTypes.WIND_SPEED">{{ WeatherTypes.WIND_SPEED }}</option>
                <option @value="WeatherTypes.WIND_GUST">{{ WeatherTypes.WIND_GUST }}</option>
                <option @value="WeatherTypes.VISIBILITY">{{ WeatherTypes.VISIBILITY }}</option>
              </select>
              <br>
              <label for="exampleInputEmail1" class="form-label">Value:</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="constraint.val"
              />
              <small id="emailHelp" class="form-text text-error" :style="{ display: valError ? 'block' : 'none' }">Cannot be blank</small>
              <br>
              <label for="exampleInputEmail1" class="form-label">Notify me when:</label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioAbove"
                :value="true"
                checked
                v-model="toggle"
              />
              <label class="form-check-label" for="flexRadioDefault1"> Above</label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioBelow"
                :value="false"
                checked
                v-model="toggle"
              />
              <label class="form-check-label" for="flexRadioDefault1"> Below</label>
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
.text-error{
  float: left;
  color: red;
}

</style>
