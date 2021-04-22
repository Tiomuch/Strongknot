import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

const queryClient = new QueryClient()

export default function OwnComments ({ updateComment }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Comments updateComment={updateComment} />
    </QueryClientProvider>
  )
}

const fetchComments = async () => {
  const res = await fetch('http://localhost:3000/api/comments/own', { method: 'GET', // eslint-disable-line object-curly-newline
    headers: { Authorization: localStorage.getItem('token') }
  })
  return res.json()
}

function Comments ({ updateComment }) {
  const { isLoading, error, data } = useQuery('comments', fetchComments)
  const [visible, setVisible] = useState(5)

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  const infComment = (comm) => {
    let one
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === comm.target.name) {
        one = data[i]
      }
    }
    updateComment(one)
  }

  const deleteComment = async (comm) => {
    await axios.delete(`http://localhost:3000/api/comments/delete-comment/${comm.target.name}`, { headers: { Authorization: localStorage.getItem('token') } }).then(res => console.log(res))
    alert('Post was deleted')
  }

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Log In please</h1>

  if (!data.length || data.length === 0) {
    return <h1>You have not posts</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(comm => <li key={comm.id} className="for-li">
          <Link to="/edit-comment">
            <button className="edit" name={comm.id} onClick={infComment}>Edit Comment</button>
          </Link>
          <button className="delete" name={comm.id} onClick={deleteComment}>Delete Comment</button>
          <div className="post-top">{comm.text}</div>
          <div className="post-down">{comm.data}</div>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}

OwnComments.propTypes = {
  updateComment: PropTypes.func
}

Comments.propTypes = {
  updateComment: PropTypes.func
}
