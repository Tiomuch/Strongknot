import React from 'react'
import { Link } from 'react-router-dom'

function Left () {
  return (
      <div className="left-part">
        <Link to="/edit-profile">
          <button className='sign'>Edit profile</button>
        </Link>
        <Link to="/add-avatar">
          <button className='sign'>Add avatar</button>
        </Link>
        <Link to="/own-comments">
          <button className='sign'>View my comments</button>
        </Link>
        <Link to="/users">
          <button className='sign'>View all users</button>
        </Link>
        <Link to="/friends">
          <button className='sign'>View your friend</button>
        </Link>
        <Link to="/req-friend">
          <button className='sign'>View request to you</button>
        </Link>
      </div>
  )
}

export default Left
