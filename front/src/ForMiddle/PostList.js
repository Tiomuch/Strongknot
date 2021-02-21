import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PostList () {
  const [posts, setPosts] = useState()

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/api/posts/all-posts'
    axios.get(apiUrl).then((resp) => {
      const allPosts = resp.data
      setPosts(allPosts)
    })
  }, [setPosts])

  if (!posts || posts.length === 0) return <p>Нет постов</p>

  return (
    <ul className="content">
      { posts.map(post => <li key={post.id}><div className="post-top">{post.title}</div><div className="post-down">{post.description}</div></li>)}
    </ul>
  )
}
