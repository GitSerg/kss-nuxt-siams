<!-- Modal window template -->
<script setup lang="ts">
  import Button from './Button.vue' 

  const isShow = defineModel('isShow')
  const props = defineProps({ 
    yesFn: Function, 
    yesMessage: String,
    noFn: Function,
    noMessage: String,
  })
  function defaultClose() {
    isShow.value = false
  }
  let yesClick = props.yesFn
  let yesMessage = props.yesMessage
  if (yesMessage && !yesClick) {
    yesClick = defaultClose
  } else if (!yesMessage && yesClick) {
    yesMessage = 'Save'
  }
  let noClick = props.noFn
  let noMessage = props.noMessage
  if (noMessage && !noClick) {
    noClick = defaultClose
  } else  if (!noMessage && noClick) {
    noMessage = 'Cancel'
  }
</script>

<template>
  <div v-if="isShow" tabindex="-1" 
    data-modal-backdrop="static"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-600/50">
    <div class="relative m-auto p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            <slot name="header"></slot>
          </h3>
          <button @click="defaultClose" type="button" 
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
            data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>  
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <slot name="body"></slot>
          </p>
        </div>
        <!-- Modal footer -->
        <div v-if="yesClick || noClick" class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Button v-if="yesClick" :color="'blue'" @click="yesClick">{{yesMessage}}</Button>
          <Button v-if="noClick" :color="'gray'" @click="noClick">{{noMessage}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>
