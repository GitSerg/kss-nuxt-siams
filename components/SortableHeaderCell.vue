<!-- Styled header cell with sort parametrs -->
<script setup lang="ts">
import type { TSortParam } from '~/interfaces/User';

  const sortRef = defineModel('sortRef')
  const sortByRef = defineModel<TSortParam>('sortByRef')
  const props = defineProps<{ col: number, param: TSortParam }>()

  const computedIsSelected = computed(() => {
    return sortByRef.value === props.param
  })

  function click() {
    if (computedIsSelected.value) {
      if (sortRef.value === 'asc') {
        sortRef.value = 'desc'
      } else if (sortRef.value === 'desc') {
        sortRef.value = ''
      } else {
        sortRef.value = 'asc'
      }
    } else {
      sortByRef.value = props.param
      sortRef.value = sortRef.value || 'asc'
    }
  }
</script>

<template>
  <div :class="`col-span-${props.col}`" class="px-6 py-3" 
    @click="click"
  >
    <div class="flex items-center cursor-pointer">
      <slot />
      <SortIcon :value="computedIsSelected && sortRef"/>
    </div>   
  </div>
</template>