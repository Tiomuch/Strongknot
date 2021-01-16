import React from 'react'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle'
import Profile from './ForHeader/Profile'
import PropTypes from 'prop-types'

function Header (props) {
  const showComponent = (event) => {
    if (event.target.innerText === 'Article') {
      props.updateData(Article)
    } else if (event.target.innerText === 'Add Article') {
      props.updateData(AddArticle)
    } else {
      props.updateData(Profile)
    }
  }
  return (
    <div>
      <div>Strongknot</div>
      <div>
        <button className="header-button" onClick={showComponent}>Article</button>
        <button className="header-button" onClick={showComponent}>Add Article</button>
        <button className="header-button" onClick={showComponent}>{props.name}</button>
      </div>
    </div>
  )
}

Header.propTypes = {
  updateData: PropTypes.func,
  name: PropTypes.string
}

export default Header
