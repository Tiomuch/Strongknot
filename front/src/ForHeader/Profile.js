import React from 'react'
import { Link } from 'react-router-dom'

function profile () {
  const LogOut = () => {
    console.log(localStorage.getItem('token'))
    localStorage.setItem('token', '')
  }
  return (
    <div className="right-part">
      <Link to="/register">
        <button className="header-button">Registration</button>
      </Link>
      <Link to="/login">
        <button className="header-button">LogIn</button>
      </Link>
      { localStorage.getItem('token') !== '' ? <button className="header-button" onClick={LogOut}>LogOut</button> : <></> }
    </div>
  )
}

export default profile
