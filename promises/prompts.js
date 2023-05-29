export const fetchPosts = async () => {
  const response = await fetch('/api/prompt')
  const data = await response.json()

  return data
}

export const getPrompt = async (promptId) => {
  const response = await fetch(`/api/prompt/${promptId}`)
  const data = await response.json()

  return data
}

export const createPrompt = async (post, userId) => {
  const response = await fetch('/api/prompt/new', {
    method: 'POST',
    body: JSON.stringify({
      ...post,
      userId,
    })
  })

  return response
}

export const editPrompt = async (post, promptId) => {
  const response = await fetch(`/api/prompt/${promptId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...post,
    })
  })

  return response
}

export const deletePrompt = async(promptId) => {
  const response = await fetch(`/api/prompt/${promptId.toString()}`, {
    method: 'DELETE'
  })

  return response
}