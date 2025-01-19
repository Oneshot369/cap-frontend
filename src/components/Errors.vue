<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps<{
  code: number,
  message: string
}>()
</script>

<template>
<div class="greeting">
    <h1>Error code: {{ code }}</h1>
    <p>{{ message }}</p>
</div>

</template>

<style>

</style>