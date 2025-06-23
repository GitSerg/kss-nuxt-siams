<!-- Users list -->

<script setup lang="ts">
  import { ref, type Ref } from '#imports'
  import { useQuery } from '@tanstack/vue-query' 
  import Modal from '~/components/Modal.vue'
  import type { IUser, TSortParam } from '~/interfaces/User'
  import type { IDeleteResponse } from '~/interfaces/request'

  type TSort = 'asc' | 'desc' | ''

  const SELECT_LIMIT_OPTION = [10, 25, 50, 100]
  const modalRef: Ref<boolean> = ref(false)
  const editUserRef: Ref<null | IUser> = ref(null)
  const pageRef: Ref<number> = ref(1)
  const limitRef: Ref<number> = ref(SELECT_LIMIT_OPTION[1])
  const searchRef: Ref<string> = ref('')
  const sortRef: Ref<TSort> = ref('')
  const sortByRef: Ref<TSortParam> = ref('email')
  const deleteRequestErrorRef: Ref<string> = ref('')
  const cachedPagesRef: Ref<number> = ref(1)
  const messageModal = useMessageModalStore()

  const { isPending, data: refUsersArr, error, refetch } = useQuery({ 
    queryKey: ['users', { pageRef, limitRef }], 
    queryFn: async () => {
      const result = await $fetch(`/api/users?page=${pageRef.value}&limit=${limitRef.value}`)
      if (result.error) {
        throw new Error(result.error)
      }
      return result
    } 
  })
  async function deleteUser(item: IUser, i: number, event: MouseEvent): Promise<void> {
    if (!confirm(`Are you sure you want delete user ${item.email}`)) {
      return
    }
    try {
      const result = await $fetch<IDeleteResponse>(`/api/users/${item.id}`, {
        method: 'DELETE',
      })
      const requestError = result.error

      if (requestError) {
        if (requestError instanceof Error) {
          deleteRequestErrorRef.value = requestError.message
        } else {
          deleteRequestErrorRef.value = String(requestError)
        }
      } else {
        refetch()
        messageModal.show(`User ${item.id} deleted`)
      }
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        deleteRequestErrorRef.value = e.message
      } else {
        deleteRequestErrorRef.value = String(e)
      }
    }
  } 
  function editUser(item: IUser, i: number, event: Event): void {
    editUserRef.value = item
    modalRef.value = true
  } 
  function saveUser(): void {
    messageModal.show('Saved')
    modalRef.value = false
    refetch()
  } 
  function sortUsersFn(items: IUser[], sort: TSort) {
    if (!sort) {
      return items
    }
    const result = [...toRaw(items)].sort((a, b) => {
      const nameA = a[sortByRef.value]?.toLowerCase()
      const nameB = b[sortByRef.value]?.toLowerCase()
      if (!nameA || nameA < nameB) {
        return sort === 'asc' ? -1 : 1
      }
      if (!nameB || nameA > nameB) {
        return sort === 'asc' ? 1 : -1
      }
      return 0
    })
    return result
  }
  const sortedUsersComputed = computed(() => {
    return sortUsersFn(refUsersArr?.value?.data, sortRef.value)
  })
  watch(refUsersArr, (newArr) => {
    if (newArr?.pages) {
      cachedPagesRef.value = newArr?.pages
    }
    searchRef.value = ''
  })
</script>

<template>
  <div v-if="error && !isPending">
    <p style="color: red;">{{ error }}</p>
  </div>
  <PaginationNav v-model:limit-ref="limitRef" :pages="cachedPagesRef" v-model:page-ref="pageRef" :selectLimitOptions="SELECT_LIMIT_OPTION"></PaginationNav>
  <div class="animate-pulse" v-if="isPending">Loading...</div>
  <div class="p-4 border-1 rounded-md border-slate-600" v-if="!isPending">
    <div 
      class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 p-2"
    >
      <div class="col-span-2">   
        <SearchInput v-model:value-ref="searchRef" placeholder="Search by email..."></SearchInput>
      </div>
    </div>
    <!-- User list header start -->
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <div class="col-span-1 px-6 py-3">   
        Id
      </div>
      <SortableHeaderCell 
        v-model:sort-ref="sortRef" 
        :col=2 
        param="email" 
        v-model:sort-by-ref="sortByRef"
      >
        Email
      </SortableHeaderCell>
      <SortableHeaderCell 
        v-model:sort-ref="sortRef" 
        :col=1 
        param="sex" 
        v-model:sort-by-ref="sortByRef"
      >
        Sex
      </SortableHeaderCell>
      <SortableHeaderCell 
        v-model:sort-ref="sortRef" 
        :col=1 
        param="lastName" 
        v-model:sort-by-ref="sortByRef"
      >
        Last Name
      </SortableHeaderCell>
      <SortableHeaderCell 
        v-model:sort-ref="sortRef" 
        :col=1 
        param="firstName" 
        v-model:sort-by-ref="sortByRef"
      >
        First Name
      </SortableHeaderCell>
    </div>
    <!-- User list header end -->
    <!-- User list body start -->
    <template v-for="(item, i) in sortedUsersComputed">
      <div 
        :key="item.id"
        class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 p-2"
        v-if="!searchRef || RegExp(searchRef, 'ig').test(item.email)"
      >
        <div class="text-slate-600">id: {{item.id}}</div>
        <div class="text-teal-700 col-span-2">{{item.email}}</div>
        <div class="col-span-1">{{item.sex}}</div>
        <div class="col-span-1">{{item.lastName}}</div>
        <div class="col-span-1">{{item.firstName}}</div>
        <div>
          <a class="text-blue-600 cursor-pointer hover:underline pr-4 hover:opacity-80" @click="editUser(item, i, $event)">Edit</a>
          <a class="text-red-800 cursor-pointer hover:underline hover:opacity-80" @click="deleteUser(item, i, $event)">Delete</a>
        </div>
      </div>
    </template>
    <!-- User list body end -->
    <!-- User edit modal window start -->
    <Modal v-model:isShow="modalRef">
      <template #header>
        {{editUserRef?.id}}
      </template>
      <template #body>
        <UserForm :item="editUserRef" :strSubmit="'Update'" :fnAfterPost="saveUser" :postUrl="`/api/users/${editUserRef?.id}`" :method="'PUT'"></UserForm>
      </template>
    </Modal>
    <!-- User edit modal window end -->
  </div>
</template>