<!-- Form used for user create and update  -->
<script setup lang="ts">
import type { IUser } from '~/interfaces/User'

  const props = defineProps<{
    postUrl: string,
    fnAfterPost: Function,
    strSubmit: string,
    item?: IUser | null,
    method?: 'POST' | 'PUT',
  }>()
  const isPending = ref(false)
  
  const email = ref('')
  const password = ref('')
  const sex = ref('m')
  const lastName = ref('')
  const firstName = ref('')
  const error = ref('')

  // if we have item than prefill all input value
  if (props.item?.email) {
    email.value = props.item.email
    password.value = props.item.password
    sex.value = props.item.sex
    lastName.value = props.item.lastName
    firstName.value = props.item.firstName
  }
  
  async function asyncFnSubmit(): Promise<void> {
    isPending.value = true
    try {
      const { user, error: requestError } = await $fetch<{ user: IUser, error: Error }>(props.postUrl, {
        method: props.method || 'POST',
        body: {
          email: email.value,
          password: password.value,
          sex: sex.value,
          lastName: lastName.value,
          firstName: firstName.value,
        },
      })

      if (requestError) {
        error.value = requestError.message
      } else {
        await props.fnAfterPost(user)
      }
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    }
    isPending.value = false
  }
</script>

<template>
  <form @submit.prevent="asyncFnSubmit">
    <div class="mb-6">
      <Input v-model:value="email" id="email" label="Email" placeholder="sergey@mail.ru" type="email" />
    </div> 
    <div class="mb-6">
      <Input v-model:value="password" id="password" label="Password" placeholder="•••••••••" type="password" />
    </div>
    <div class="mb-6">
      <Input v-model:value="lastName" id="lastName" label="Last Name" placeholder="Smith" type="text" />
    </div> 
    <div class="mb-6">
      <Input v-model:value="firstName" id="firstName" label="First Name" placeholder="Vasya" type="text" />
    </div> 
    <!-- Sex choice radio buttons start -->
    <div class="mb-6">
      <div class="flex items-center mb-4">
        <input id="sex-radio-1" type="radio" value="m" name="sex-radio" v-model="sex"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <label for="sex-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Man</label>
      </div>
      <div class="flex items-center">
        <input id="sex-radio-2" type="radio" value="w" name="sex-radio" v-model="sex"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <label for="sex-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Woman</label>
      </div>
    </div>
    <!-- Sex choice radio buttons end -->
    <div class="mb-6" v-if="error">
      <p class="text-red-600 bg-gray-200 rounded-lg pb-1 px-4">{{ error }}</p>
    </div>
    <div class="mb-6 text-white animate-pulse" v-if="isPending">Loading...</div>
    <Button :color="'blue'" :type="'submit'">{{props.strSubmit}}</Button>
  </form>
</template>