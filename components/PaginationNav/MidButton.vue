<script setup lang="ts">
  const props = defineProps<{ disabled?: boolean }>()
</script>

<template>
  <a
    :class="{ 'pointer-events-none opacity-50': props.disabled }"
    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  ><slot /></a>
</template>
