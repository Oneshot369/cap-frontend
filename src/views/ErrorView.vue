<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Error } from '@/stores/error'
import { useRoute } from 'vue-router'

const props = defineProps({
  message: String,
  code: Number
})
const route = useRoute()

//use our error message state if no props are passed from the router
let ErrorCode = props.code ?? Error.code
let ErrorMessage = props.message ?? Error.msg
console.log(Error)
</script>

<template>
  <div class="greeting">
    <h1>Error code: {{ ErrorCode }}</h1>
    <p>{{ ErrorMessage }}</p>
  </div>
</template>

<style></style>
