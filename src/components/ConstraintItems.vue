<script setup lang="ts">
import type { ConstraintObject } from '@/stores/interface/constraint'

defineProps<{
  constraintLists?: ConstraintObject[]
}>()
</script>

<template>
  <div class="container">
    <div v-for="con in constraintLists" :key="con.id" class="constraint">
      <p class="label">Constraint:</p><p class="value">{{ con.name }}</p>
      <p class="label">For:</p><p class="value">{{ con.condition }}</p>
      <p class="label">Value:</p><p class="value">{{ con.val }}</p>
      <p class="label">Notify me when</p><p class="value">{{ con.greaterThan ? 'above' : 'below' }} {{ con.val }}</p>
    </div>
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
