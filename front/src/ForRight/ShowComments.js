import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import axios from 'axios'

const queryClient = new QueryClient()

export default function ShowComments ({ comment }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ForComment comment={comment} />
    </QueryClientProvider>
  )
}

const fetchComment = async (id) => {
  const res = await fetch(`http://localhost:3000/api/comments/${id}`, { method: 'GET', // eslint-disable-line object-curly-newline
    headers: { Authorization: localStorage.getItem('token') }
  })
  return res.json()
}

function ForComment ({ comment }) {
  const { isLoading, error, data } = useQuery('comments', async () => fetchComment(comment))
  const [visible, setVisible] = useState(5)

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  /* const infPost = (post) => {
    let one
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === post.target.name) {
        one = data[i]
      }
    }
    updatePost(one)
  } */

  /* const deletePost = async (post) => {
    await axios.delete(`http://localhost:3000/api/posts/delete-post/${post.target.name}`, { headers: { Authorization: localStorage.getItem('token') } }).then(res => console.log(res))
    alert('Post was deleted')
  } */

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Log In please</h1>

  if (!data.length || data.length === 0) {
    return <h1>You have not posts</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(comm => <li key={comm.comment_id} className="for-li">
          {/* <button className="delete" name={comm.id} onClick={deletePost}>Delete Post</button> */}
          <div className="post-top">{comm.user_id}</div>
          <div className="post-down">{comm.text}</div>
          <div className="post-down">{comm.date}</div>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}

ShowComments.propTypes = {
  comment: PropTypes.number
}

ForComment.propTypes = {
  comment: PropTypes.number
}
