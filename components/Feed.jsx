"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { fetchPosts } from '@promises/prompts'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='met-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])

  const handleSearchText = (e) => {

  }

  useEffect(() => {
    fetchPosts().then(setPosts)
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchText}
          required
          className='search_input peer'
        />

      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}
