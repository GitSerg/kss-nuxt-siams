<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="container mx-auto flex items-center justify-between">
      <ul class="flex space-x-4">
        <li class="hover:underline"><NuxtLink to="/">Users</NuxtLink></li>
        <li class="hover:underline"><NuxtLink to="/create">Create</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <div class="container mx-auto pt-4 pb-40">
    <NuxtPage />
  </div>
  <MessageModal />
</template>
