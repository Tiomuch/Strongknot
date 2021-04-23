import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header ({ name }) {
  const [img, setImg] = useState()

  useEffect(async () => {
    try {
      await axios.get('http://localhost:3000/api/other/get-avatar', { method: 'GET', // eslint-disable-line object-curly-newline
        headers: { Authorization: localStorage.getItem('token') }
      }).then(res => {
        setImg(res.data.avatar)
        localStorage.setItem('avatar', res.data.avatar)
      })
    } catch (e) {
      console.log(e)
      setImg('')
      localStorage.setItem('avatar', '')
    }
  })

  return (
    <div className="header">
      <div className="logo">Strongknot</div>
      <div className="all-header-button">
        <Link to="/">
          <button className="header-button">Article</button>
        </Link>
        <Link to="/add-article">
          <button className="header-button">Add Article</button>
        </Link>
        <Link to="/profile">
         <button className="header-button">Profile</button>
        </Link>
      </div>
      <div className="user">{img && img !== '' ? <img className='header-img' src={'http://localhost:3000/' + localStorage.getItem('avatar')} alt="avatar"/> : <></>}
        {name}</div>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string
}

export default Header
