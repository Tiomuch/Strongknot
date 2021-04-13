import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()

export default function UserArticle ({ updatePost }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ForUser updatePost={updatePost} />
    </QueryClientProvider>
  )
}

const fetchPosts = async () => {
  const id = 48
  const res = await fetch(`http://localhost:3000/api/posts/user/${id}`)
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
    updatePost(data[post.target.name - 1])
  }

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Log In please</h1>

  if (!data.length || data.length === 0) {
    return <h1>You have no posts</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(post => <li key={post.id} className="for-li">
          <Link to="/edit-post">
            <button className="edit" name={post.id} onClick={infPost}>Edit Post</button>
          </Link>
          <div className="post-top">{post.title}</div>
          <div className="post-down">{post.description}</div>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}

UserArticle.propTypes = {
  updatePost: PropTypes.func
}

ForUser.propTypes = {
  updatePost: PropTypes.func
}
