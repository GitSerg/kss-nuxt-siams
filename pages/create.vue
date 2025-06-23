<!-- Create user -->
<script setup lang="ts">
import type { IUser } from '~/interfaces/User'

  const messageModal = useMessageModalStore()
  
  async function afterCreate(user: IUser): Promise<void> {
    messageModal.show("User registered:" + user.email)
    navigateTo('/')
  }
  // Generate test data start
  async function postUser(plainUser: IUser): Promise<void> {
    await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plainUser),
    })
  }
  async function generate() {
    const MAX_LENGTH = 12
    for (let i=0; i < 10; i++) {
      await postUser({
        email: `${generateRandomString(4 + Math.floor(Math.random() * MAX_LENGTH))}@mail.ru`,
        password: '12345',
        sex: i % 2 ? 'w' : 'm',
        lastName: `${generateRandomString(4 + Math.floor(Math.random() * 5))}`,
        firstName: `${generateRandomString(4 + Math.floor(Math.random() * 2))}`
      })
    }
  }
  // Generate test data end
</script>

<template>
  <div class="p-4 font-bold">
    Create user
  </div>
  <div class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
    <UserForm :strSubmit="'Create'" :fnAfterPost="afterCreate" postUrl="/api/users/create"></UserForm>
  </div>
  <!-- Generate test data start -->
  <div v-if="false">
    <button @click="generate">Generate test users</button>
  </div>
  <!-- Generate test data end -->
</template>


