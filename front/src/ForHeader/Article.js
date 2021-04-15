import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

const queryClient = new QueryClient()

export default function Article ({ updatePost }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ForUser updatePost={updatePost} />
    </QueryClientProvider>
  )
}

const fetchPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts/own', { method: 'GET', // eslint-disable-line object-curly-newline
    headers: { Authorization: localStorage.getItem('token') }
  })
  return res.json()
}

function ForUser ({ updatePost }) {
  const { isLoading, error, data } = useQuery('posts', fetchPosts)
  const [visible, setVisible] = useState(5)

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  const infPost = (post) => {
    let one
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === post.target.name) {
        one = data[i]
      }
    }
    updatePost(one)
  }

  const deletePost = async (post) => {
    await axios.delete(`http://localhost:3000/api/posts/delete-post/${post.target.name}`, { headers: { Authorization: localStorage.getItem('token') } }).then(res => console.log(res))
    alert('Post was deleted')
  }

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Log In please</h1>

  if (!data.length || data.length === 0) {
    return <h1>You have not posts</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(post => <li key={post.id} className="for-li">
          <Link to="/edit-post">
            <button className="edit" name={post.id} onClick={infPost}>Edit Post</button>
          </Link>
          <button className="delete" name={post.id} onClick={deletePost}>Delete Post</button>
          <div className="post-top">{post.title}</div>
          <div className="post-down">{post.description}</div>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}

Article.propTypes = {
  updatePost: PropTypes.func
}

ForUser.propTypes = {
  updatePost: PropTypes.func
}
