import React, { useState } from 'react'
import Header from './Header'
import Middle from './Middle'
import Left from './Left'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle' // eslint-disable-line no-unused-vars
import Profile from './ForHeader/Profile' // eslint-disable-line no-unused-vars
import ErrorBoundary from './ErrorBoundary'

function App () {
  const [headersElement, setHeadersElement] = useState(<Article />)
  const [name, setName] = useState('none') // eslint-disable-line no-unused-vars
  const [lastName, setLastName] = useState('none') // eslint-disable-line no-unused-vars
  const [profile, setProfile] = useState('User')

  const updateData = (value) => {
    setHeadersElement(value)
  }

  const updateProfile = (userName, userLastName) => {
    setName(userName)
    setLastName(userLastName)
    setProfile(userName + ' ' + userLastName)
  }

  return (
    <>
      <ErrorBoundary>
      <header><Header updateData={updateData} name={profile} updateProfile={updateProfile} /></header>
      </ErrorBoundary>
    <div className="main-part">
    <ErrorBoundary>
      <Left />
    </ErrorBoundary>
    <ErrorBoundary>
      <Middle />
    </ErrorBoundary>
    <ErrorBoundary>
      {headersElement}
    </ErrorBoundary>
    </div>
    </>
  )
}

export default App
