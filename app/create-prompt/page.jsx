"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { createPrompt } from '@promises/prompts'

import Form from '@components/Form'

export default function CreatePrompt() {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const handleCreatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      createPrompt(post, session?.user.id)
        .then((response) => {
          console.log(response)
          if (response.ok) {
            router.push('/')
          }
        })
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleCreatePrompt}
    />
  )
}
