<!-- Pagination panel with limit select -->
<script setup lang="ts">
  import PrevButton from './PrevButton.vue'
  import MidButton from './MidButton.vue'
  import CurrentPage from './CurrentPage.vue'
  import NextButton from './NextButton.vue'
  const limitRef = defineModel<number>('limitRef', { required: true })
  const pageRef = defineModel<number>('pageRef', { required: true })
  const props = defineProps<{ selectLimitOptions: number[], pages: number }>()
</script>

<template>
  <nav class="pb-4">
    <ul class="inline-flex -space-x-px text-sm">
      <li class="mr-2">
        <Select v-model:value-ref="limitRef" :options="props.selectLimitOptions"></Select>
      </li>
      <li>
        <PrevButton :disabled="pageRef < 2" @click="pageRef = pageRef - 1" />
      </li>
      <li v-if="pageRef > 1">
        <MidButton @click="pageRef = 1" >1</MidButton>
      </li>
      <li>
        <CurrentPage @click="pageRef = 1" >{{ pageRef }}</CurrentPage>
      </li>
      <li v-if="pageRef + 5 < pages">
        <MidButton @click="pageRef = pageRef + 5" >{{ pageRef + 5 }}</MidButton>
      </li>
      <li v-if="pageRef < pages">
        <MidButton @click="pageRef = pages" >{{ pages }}</MidButton>
      </li>
      <li>
        <NextButton :disabled="pageRef === pages" @click="pageRef = pageRef + 1" />
      </li>
    </ul>
  </nav>
</template>
