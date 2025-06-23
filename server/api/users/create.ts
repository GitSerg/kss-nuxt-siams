export default defineEventHandler(async (event) => {
  const a = await readBody(event)

  try {
    const user = await $fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(a),
    })
    return {
      user, 
      error: '',
    }
  
  } catch (e) {
    const err = e as Error
    return {
      user: null, 
      error: err.message || err,
      stack: err.stack,
    }
  }
})
