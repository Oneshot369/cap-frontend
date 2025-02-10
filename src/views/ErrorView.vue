<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Error } from '@/stores/error'
import { useRoute } from 'vue-router'

const props = defineProps({
  message: String,
  code: Number
})
const route = useRoute()

// Extract query parameters from the route
const messageQ = route.query.message || 'An error occurred'
const codeQ = route.query.code || '500'
//use our error message state if no props are passed from the router
let ErrorCode = props.code ?? messageQ
let ErrorMessage = props.message ?? codeQ
console.log(Error)
</script>

<template>
  <div class="greeting">
    <h1>Error code: {{ ErrorCode }}</h1>
    <p>{{ ErrorMessage }}</p>
  </div>
</template>

<style></style>
