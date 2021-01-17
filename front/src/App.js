import React, { useState } from 'react'
import Header from './Header'
import Middle from './Middle'
import Left from './Left'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle' // eslint-disable-line no-unused-vars
import Profile from './ForHeader/Profile' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'

function App () {
  const [headersElement, setHeadersElement] = useState(<Article />)
  const [name, setName] = useState('none') // eslint-disable-line no-unused-vars
  const [secondName, setSecondName] = useState('none') // eslint-disable-line no-unused-vars
  const [profile, setProfile] = useState('Profile')

  const updateData = (value) => {
    setHeadersElement(value)
  }

  const updateProfile = (userName, userSecondName) => {
    setName(userName)
    setSecondName(userSecondName)
    setProfile('Profile (' + userName + ' ' + userSecondName + ')')
  }

  return (
    <>
      <ErrorBoundary>
      <header><Header updateData={updateData} name={profile} updateProfile={updateProfile} /></header>
      </ErrorBoundary>
    <ErrorBoundary>
      <div className="component"><Left /></div>
    </ErrorBoundary>
    <ErrorBoundary>
      <div className="component"><Middle /></div>
    </ErrorBoundary>
    <ErrorBoundary>
      <div className="component">{headersElement}</div>
    </ErrorBoundary>
    </>
  )
}

App.propTypes = {
  optionalFunc: PropTypes.func,
  optionalString: PropTypes.string
}

App.defaultProps = {
  profile: 'Profile',
  headersElement: <Article />
}

export default App
