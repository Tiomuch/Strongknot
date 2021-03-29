import React from 'react'
import { Link } from 'react-router-dom'

function Left () {
  return (
      <div className="left-part">
        <Link to="/edit-profile">
          <button className='sign'>Edit profile</button>
        </Link>
      </div>
  )
}

export default Left
