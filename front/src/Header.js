import React from 'react'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle'
import Profile from './ForHeader/Profile'
import PropTypes from 'prop-types'

function Header ({ updateData, name, updateProfile }) {
  const showComponent = (event) => {
    if (event.target.name === 'Article') {
      updateData(<Article />)
    } else if (event.target.name === 'AddArticle') {
      updateData(<AddArticle />)
    } else if (event.target.name === 'Profile') {
      updateData(<Profile updateProfile={updateProfile} />)
    }
  }

  return (
    <div className="header">
      <div className="logo">Strongknot</div>
      <div className="all-header-button">
        <button className="header-button" name="Article" onClick={showComponent}>Article</button>
        <button className="header-button" name="AddArticle" onClick={showComponent}>Add Article</button>
        <button className="header-button" name="Profile" onClick={showComponent}>Profile</button>
      </div>
      <div className="user">{name}</div>
    </div>
  )
}

Header.propTypes = {
  updateData: PropTypes.func,
  name: PropTypes.string,
  updateProfile: PropTypes.func
}

export default Header
