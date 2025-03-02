<script setup lang="ts">
import { ref, type Ref, defineProps } from 'vue'
import axios from 'axios'
import { cloneDeep } from 'lodash';
import type { ConstraintObject } from '@/stores/interface/constraint'
import { WeatherTypes } from '@/stores/interface/weatherTypes'
import { JWTcookie } from '@/stores/cookie'

const apiUrl = import.meta.env.VITE_SPRING_API_URL


//emits a clear item, and and edit item function
const emit = defineEmits(['edit-item', 'clear-item', 'del-item'])

//above / below value
let toggle = ref(false);
//show modal
let showModal = ref(false);
//errors
let nameError = ref(false);
let valError = ref(false);

//a temporary reference for the modal instance
let tempConstraint = ref<ConstraintObject>({
  id: '',
  name: '',
  condition: WeatherTypes.TEMP,
  val: '',
  greaterThan: false
});

const closeModal = () => {
  showModal.value = false;
  //unlock scrolling
  document.body.style.overflow = '';
}
const openModal = (con: ConstraintObject): void => {
  //lock scrolling
  document.body.style.overflow = 'hidden';
  showModal.value = true;
  //clone this reference to prevent it updating the list when we dont want it too. 
  tempConstraint.value = cloneDeep(con);

  toggle.value = tempConstraint.value.greaterThan;
}

const checkVal = () => {
  let didPass = true;
  nameError.value = false;
  valError.value = false;
  if (tempConstraint.value.name == '') {
    nameError.value = true;
    didPass = false
  }
  if (tempConstraint.value.val == '') {
    valError.value = true;
    didPass = false
  }
  return didPass;
}

const editConstraint = () => {
  //set our toggle value to our constraint.
  tempConstraint.value.greaterThan = toggle.value
  if (checkVal()) {
    axios
      .put(
        `${apiUrl}/api/v1/user/updateConstraint`,
        {
          id: tempConstraint.value.id,
          name: tempConstraint.value.name,
          condition: tempConstraint.value.condition,
          val: tempConstraint.value.val,
          greaterThan: tempConstraint.value.greaterThan
        },
        {
          headers: {
            Authorization: `Bearer ${JWTcookie.cookie}`
          }
        }
      )
      .then((response) => {
        if (response.status == 200) {
          emit('edit-item', tempConstraint.value)
        }
        closeModal()
      })
      .catch((error: any) => {
        console.error('Error fetching weather data', error)
      })
  }
}

const deleteConstraint = () =>{
  axios
      .delete(`${apiUrl}/api/v1/user/deleteConstraint?id=${tempConstraint.value.id}`,
        {
          headers: {
            Authorization: `Bearer ${JWTcookie.cookie}`
          }
        }
      )
      .then((response) => {
        if (response.status == 200) {
          emit('del-item', tempConstraint.value.id);
        }
        closeModal()
      })
      .catch((error: any) => {
        console.error('Error fetching weather data', error)
      })
}

defineExpose({
openModal
})
</script>

<template>
  <div>
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
            <h5 class="modal-title">Edit Alert</h5>
            <button type="button" class="btn-secondary btn-delete" @click="deleteConstraint">Delete</button>
            
          </div>
          <div class="modal-body">
            <form>
              <label for="exampleInputEmail1" class="form-label">Name:</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="tempConstraint.name"
              />
              <small id="emailHelp" class="form-text text-error" :style="{ display: nameError ? 'block' : 'none' }">Cannot be blank</small>

              <br>

              <label for="exampleInputEmail1" class="form-label">For:</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="tempConstraint.condition"
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
                v-model="tempConstraint.val"
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
            <button class="btn btn-primary" @click="editConstraint">Send request</button>
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

.btn-delete{
  /* This is copied from bootstraps .modal-header .btn=-close class. I just repurposed it for the delete */
  margin : calc(-0.5* var(--bs-modal-header-padding-y)) calc(-0.5* var(--bs-modal-header-padding-x)) calc(-0.5* var(--bs-modal-header-padding-y)) auto;

  border-radius: 5px;
  padding: 6px 12px 6px 12px;
}

</style>