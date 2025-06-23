export default defineEventHandler(async (event) => {
  try {
    if (!event?.context?.params?.slug) {
      throw new Error('event?.context?.params?.slug is undefined')
    }
    const a = await readBody(event)
    const answer = await $fetch(`http://localhost:3001/users/${event?.context?.params?.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(a),
    })
    return {
      answer, 
      error: '',
    }
  } catch (e) {
    const err = e as Error
    return {
      answer: 'error', 
      error: err.message || err,
      stack: err.stack,
    }
  }
})
