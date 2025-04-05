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
  listOfConstraints.value.forEach((con, index) => {
    if(con.id == id){
      listOfConstraints.value.splice(index, 1);
    }
  });
}

const handleAdd = (constraintFromChild: ConstraintObject[]) =>{
  listOfConstraints.value = constraintFromChild;
}

const switchEdit = (con: ConstraintObject) =>{
  editConstraint.value = con
  childRef.value?.openModal(con);
}
defineExpose({
  handleAdd
})
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
  background-color: #2c2f33; 
  color: #f0f0f0;
  flex: 1;
  font-size: large;
  padding: 23px;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: left;
  height: 75px;
}
.constraint:hover {
  background: radial-gradient(
    circle at center,
    rgba(4, 190, 66, 0.15) 10%,
  rgba(44, 47, 51, 1) 80%
  );
  box-shadow: 0 0 10px rgba(4, 190, 66, 0.5);
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
