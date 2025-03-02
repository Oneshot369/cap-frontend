<script setup lang="ts">
import type { ConstraintObject } from '@/stores/interface/constraint'
import ConstraintModalEdit from './ConstraintModalEdit.vue';
import { WeatherTypes } from '@/stores/interface/weatherTypes';
import { ref, type Ref } from 'vue';

const props = defineProps<{
  constraintLists?: ConstraintObject[]
}>()

let editConstraint = ref<ConstraintObject>({
  id: '',
  name: '',
  condition: WeatherTypes.TEMP,
  val: '',
  greaterThan: false
})

let listOfConstraints = ref<ConstraintObject[]>(props.constraintLists || []);

let childRef = ref<InstanceType<typeof ConstraintModalEdit>|null>(null);

const handleEdit = (constraintFromChild: ConstraintObject) =>{
  listOfConstraints.value.forEach((con, index) => {
    if(con.id == constraintFromChild.id){
      listOfConstraints.value[index] = constraintFromChild;
    }
  });
}
const handleDelete = (id: string) =>{
  console.log("del")
  listOfConstraints.value.forEach((con, index) => {
    if(con.id == id){
      listOfConstraints.value.splice(index, 1);
    }
  });
}

const switchEdit = (con: ConstraintObject) =>{
  editConstraint.value = con
  childRef.value?.openModal(con);
}

</script>

<template>
  <div class="container">
    <div v-for="con in listOfConstraints" :key="con.id" class="constraint" @click="switchEdit(con)">
      <p class="label">Constraint:</p><p class="value">{{ con.name }}</p>
      <p class="label">For:</p><p class="value">{{ con.condition }}</p>
      <p class="label">Value:</p><p class="value">{{ con.val }}</p>
      <p class="label">Notify me when</p><p class="value">{{ con.greaterThan ? 'above' : 'below' }} {{ con.val }}</p>
    </div>
  </div>
  <div class="add-constraint">
        <ConstraintModalEdit :constraintRef="editConstraint" @del-item="handleDelete" @edit-item="handleEdit" ref="childRef"/>
      </div>
</template>

<style scoped>
.container {
  display: block;
  margin-top: 10px;
}
.constraint {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  background-color: rgb(108, 117, 125);
  flex: 1;
  color: black;
  font-size: large;
  padding: 23px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: left;
  height: 75px;
}
.constraint:hover {
  background-color: rgb(184, 190, 196);
  cursor: pointer;
}
.label {
  width: 150px;
  font-weight: bold;
  text-align: right;
  margin-right: 10px;
}

.value {
  flex: 1;
  text-align: left;
}
</style>
