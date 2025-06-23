<!-- Button with ready color styles -->
<script setup lang="ts">
  import type { ButtonHTMLAttributes } from 'vue'
 
  const props = defineProps<{ color: 'gray' | 'blue', type?: ButtonHTMLAttributes['type'] }>()
  const defaultStyles = 'py-2.5 px-5 font-medium text-sm rounded-lg text-center'
  const customStyles = {
    gray: [
      'text-gray-900', 'dark:text-gray-400',
      'focus:outline-none', 'focus:z-10 focus:ring-4 focus:ring-gray-100', 'dark:focus:ring-gray-700',
      'hover:text-blue-700', 'dark:hover:text-white dark:hover:bg-gray-700', 'hover:bg-gray-100', 
      'bg-white','dark:bg-gray-800',
      'border border-gray-200', 'dark:border-gray-600',
    ],
    blue: [
      'text-white', 
      'bg-blue-700', 'dark:bg-blue-600',
      'hover:bg-blue-800', 'dark:hover:bg-blue-700 ',
      'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'dark:focus:ring-blue-800',
    ]
  }
  const styleClass: string = [
    defaultStyles, 
    customStyles[props.color || 'blue'].join(' ')
  ].join(' ')

</script>

<template>
  <button data-modal-hide="default-modal" :type="props.type || 'button'"
    :class=styleClass>
    <slot></slot>
  </button>
</template>
