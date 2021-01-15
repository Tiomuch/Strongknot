import React from 'react'
import article from './ForHeader/article'
import addArticle from './ForHeader/addArticle'
import profile from './ForHeader/profile'

function Header () {
  return (
    <div>
      <div>Strongknot</div>
      <div><article /><addArticle /><profile /></div>
    </div>
  )
}

export default Header
