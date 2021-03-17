import React from 'react'
import Article from './ForHeader/Article' // eslint-disable-line no-unused-vars
import AddArticle from './ForHeader/AddArticle' // eslint-disable-line no-unused-vars
import Profile from './ForHeader/Profile' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 80,
    fontSize: 30,
    textDecoration: 'none',
    padding: '0 30px'
  }
})

function Header ({ name }) {
  const classes = useStyles()

  return (
    <div className="header">
      <div className="logo">Strongknot</div>
      <div className="all-header-button">
        <Link to="/">
          <Button className={classes.root}>Article</Button>
          { /* <button className="header-button">Article</button> */ }
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
