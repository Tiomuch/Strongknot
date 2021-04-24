import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useState } from 'react'
import axios from 'axios'
/* import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios' */

const queryClient = new QueryClient()

export default function AllUsers () {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  )
}

const fetchUsers = async () => {
  const res = await fetch('http://localhost:3000/api/other/users', { method: 'GET', // eslint-disable-line object-curly-newline
    headers: { Authorization: localStorage.getItem('token') }
  })
  return res.json()
}

function Users () {
  const { isLoading, error, data } = useQuery('posts', fetchUsers)
  const [visible, setVisible] = useState(5)

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  const friend = async (e) => {
    try {
      let result
      await axios.get(`http://localhost:3000/api/other/check-friend/${Number(e.target.name)}`, { method: 'GET', // eslint-disable-line object-curly-newline
        headers: { Authorization: localStorage.getItem('token') } }).then(res => { // eslint-disable-line object-curly-newline
        result = res.data
      })

      if (result === false) {
        await axios(`http://localhost:3000/api/other/add-friend/${Number(e.target.name)}`, { method: 'POST', // eslint-disable-line object-curly-newline
          headers: { Authorization: localStorage.getItem('token') } }).then(res => { // eslint-disable-line object-curly-newline
          alert('You add new friend')
        })
      } else {
        alert('You already friends')
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) return <h1 className="content">Loading...</h1>

  if (error) return <h1 className="content">Log In please</h1>

  if (!data.length || data.length === 0) {
    return <h1>No users</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(user => <li key={user.id} className="for-li">
          <div className="post-top">{user.first_name}</div>
          <div className="post-down">{user.last_name}</div>
          { user.avatar ? <div className='post-top'><img className='image' src={'http://localhost:3000/' + user.avatar} alt='avatar' /></div> : <></> }
          <button className="sign" name={user.id} onClick={friend}>Add friend</button>
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
