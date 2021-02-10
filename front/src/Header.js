import React from 'react'
import Article from './ForHeader/Article' // eslint-disable-line no-unused-vars
import AddArticle from './ForHeader/AddArticle' // eslint-disable-line no-unused-vars
import Profile from './ForHeader/Profile' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header ({ name }) {
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
      <div className="user">{name}</div>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string
}

export default Header
