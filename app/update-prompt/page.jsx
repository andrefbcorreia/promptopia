"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams} from 'next/navigation'

import Form from '@components/Form'
import { editPrompt, getPrompt } from '@promises/prompts'

export default function UpdatePrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    if (promptId) {
      getPrompt(promptId).then((data) => {
        setPost({ 
          prompt: data.prompt,
          tag: data.tag,
        })
      })
    }
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert("Prompt ID not found")

    try {
      editPrompt(post, promptId).then((response) => {  
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
