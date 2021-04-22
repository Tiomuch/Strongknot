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
      </div>
  )
}

export default Left
