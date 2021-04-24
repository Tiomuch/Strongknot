import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useState } from 'react'
import axios from 'axios'
/* import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios' */

const queryClient = new QueryClient()

export default function Friends () {
  return (
    <QueryClientProvider client={queryClient}>
      <AllFriends />
    </QueryClientProvider>
  )
}

const fetchFriends = async () => {
  const res = await fetch('http://localhost:3000/api/other/friends', { method: 'GET', // eslint-disable-line object-curly-newline
    headers: { Authorization: localStorage.getItem('token') }
  })
  return res.json()
}

function AllFriends () {
  const { isLoading, error, data } = useQuery('posts', fetchFriends)
  const [visible, setVisible] = useState(5)

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  const deleteFriend = async (e) => {
    try {
      let result
      await axios.get(`http://localhost:3000/api/other/check-friend/${Number(e.target.name)}`, { method: 'GET', // eslint-disable-line object-curly-newline
        headers: { Authorization: localStorage.getItem('token') } }).then(res => { // eslint-disable-line object-curly-newline
        result = res.data
      })

      if (result === true) {
        await axios(`http://localhost:3000/api/other/delete-friend/${Number(e.target.name)}`, { method: 'DELETE', // eslint-disable-line object-curly-newline
          headers: { Authorization: localStorage.getItem('token') } }).then(res => { // eslint-disable-line object-curly-newline
          alert('You deleted friend')
        })
      } else {
        alert('You are not friend')
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Add friends please</h1>

  if (!data.length || data.length === 0) {
    return <h1>No friends</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(user => <li key={user.friend_id} className="for-li">
          <div className="post-top">{user.user_id}</div>
          <button className="sign" name={user.user_id} onClick={deleteFriend}>Delete friend</button>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}

/* ForPosts.propTypes = {
  checkProfile: PropTypes.func,
  updateComment: PropTypes.func
}

AllPosts.propTypes = {
  checkProfile: PropTypes.func,
  updateComment: PropTypes.func
} */
