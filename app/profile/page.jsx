"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { deletePrompt } from '@promises/prompts'

export default function MyProfile() {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }

    console.log("posts", posts)

    if (session?.user.id) {
      fetchPosts()
    }
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt")

    if(hasConfirmed) {
      try {
        const response = await deletePrompt(post._id.toString())
        if (response.ok) {
          setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
