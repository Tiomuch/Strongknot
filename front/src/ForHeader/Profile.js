import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function profile ({ updateProfile }) {
  const LogOut = () => {
    console.log(localStorage.getItem('token'))
    localStorage.setItem('token', '')
    localStorage.setItem('first_name', '')
    localStorage.setItem('last_name', '')
    updateProfile('User', '')
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

profile.propTypes = {
  updateProfile: PropTypes.func
}

export default profile
