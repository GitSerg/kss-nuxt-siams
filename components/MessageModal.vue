<!-- Global message modal window used from pinia state -->
<script setup lang="ts">
  const messageModal = useMessageModalStore()
</script>

<template>
  <Modal v-model:is-show="messageModal.isShow" yes-message="Close">
    <template #body>
      {{messageModal.message}}
    </template>
  </Modal>
</template>