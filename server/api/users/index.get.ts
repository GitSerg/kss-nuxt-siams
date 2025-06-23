export default defineEventHandler(async (event) => {
  const { page = 0, limit = 25 } = await getQuery(event)
  
  try {
    const users = await $fetch(`http://localhost:3001/users?_page=${page}&_per_page=${limit}`)
    
    return {
      ...users,
      error: '',
    }
  } catch (error) {
    return {
      data: [], 
      error,
    }
  }
})
