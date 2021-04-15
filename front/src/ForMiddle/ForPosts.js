import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()

export default function ForPosts ({ updatePost }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AllPosts updatePost={updatePost} />
    </QueryClientProvider>
  )
}

const fetchPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts/all-posts')
  return res.json()
}

function AllPosts ({ updatePost }) {
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

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (!data.length || data.length === 0) {
    return <h1>No posts</h1>
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

AllPosts.propTypes = {
  updatePost: PropTypes.func
}

ForPosts.propTypes = {
  updatePost: PropTypes.func
}
