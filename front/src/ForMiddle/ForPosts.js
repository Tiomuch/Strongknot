import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const queryClient = new QueryClient()

export default function ForPosts ({ checkProfile, updateComment }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AllPosts checkProfile={checkProfile} updateComment={updateComment} />
    </QueryClientProvider>
  )
}

const fetchPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts/all-posts', { method: 'GET', // eslint-disable-line object-curly-newline
    headers: { Authorization: localStorage.getItem('token') }
  })
  return res.json()
}

function AllPosts ({ checkProfile, updateComment }) {
  const { isLoading, error, data } = useQuery('posts', fetchPosts)
  const [visible, setVisible] = useState(5)

  checkProfile(localStorage.getItem('first_name'), localStorage.getItem('last_name'))

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  const findComment = async (e) => {
    updateComment(Number(e.target.name))
  }

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Log In please</h1>

  if (!data.length || data.length === 0) {
    return <h1>No posts</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(post => <li key={post.id} className="for-li">
          <div className="post-top">{post.title}</div>
          { post.image ? <div className='post-top'><img className='image' src={'http://localhost:3000/' + post.image} alt='image' /></div> : <></> }
          <div className="post-down">{post.description}</div>
          <Link to="/comments">
            <button className="sign" name={post.id} onClick={findComment}>Show comments</button>
          </Link>
          <Link to="/add-comment">
            <button className="sign" name={post.id} onClick={findComment}>Add comment</button>
          </Link>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}

ForPosts.propTypes = {
  checkProfile: PropTypes.func,
  updateComment: PropTypes.func
}

AllPosts.propTypes = {
  checkProfile: PropTypes.func,
  updateComment: PropTypes.func
}
