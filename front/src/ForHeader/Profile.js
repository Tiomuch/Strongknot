import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

function profile ({ updateProfile }) {
  const LogOut = async () => {
    console.log(localStorage.getItem('token'))
    localStorage.setItem('token', '')
    localStorage.setItem('first_name', '')
    localStorage.setItem('last_name', '')
    localStorage.setItem('avatar', '')
    updateProfile('User', '')
    await axios.get('http://localhost:3000/api/auth/logout', { method: 'GET', // eslint-disable-line object-curly-newline
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => {
      console.log(res)
    })
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
