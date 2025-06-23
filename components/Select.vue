<!-- Styled select -->
<script setup lang="ts">
  const valueRef = defineModel('valueRef')
  const props = defineProps(['options'])
</script>

<template>
  <select
    :value="valueRef" @input="valueRef = $event?.target?.value"
    class="p-1.5 pl-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option v-for="option in props.options" :selected="option === valueRef" :value="option">{{option}}</option>
  </select>
</template>