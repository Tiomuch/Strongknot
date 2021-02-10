import React, { useState } from 'react'
import Header from './Header'
import Middle from './Middle'
import Left from './Left'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle'
import Profile from './ForHeader/Profile'
import ForPath from './ForPath'
import ErrorBoundary from './ErrorBoundary'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' // eslint-disable-line no-unused-vars

function App () {
  const [name, setName] = useState('none') // eslint-disable-line no-unused-vars
  const [lastName, setLastName] = useState('none') // eslint-disable-line no-unused-vars
  const [profile, setProfile] = useState('User')

  const updateProfile = (userName, userLastName) => {
    setName(userName)
    setLastName(userLastName)
    setProfile(userName + ' ' + userLastName)
  }

  const checkData = (match) => {
    const alfa = match.params.action
    const full = alfa.split('-')
    const array = []
    array[0] = full[2] - 0
    array[1] = full[3] - 1
    array[2] = ((full[4][0]) + (full[4][1])) - 0
    const d = new Date()
    if (d.getFullYear() > array[0]) {
      return true
    } else if (d.getFullYear() === array[0]) {
      if (d.getMonth() > array[1]) {
        return true
      } else if (d.getMonth() === array[1]) {
        if (d.getDate() >= array[2]) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }

  return (
    <Router>
      <ErrorBoundary>
        <header><Header name={profile} /></header>
        </ErrorBoundary>
      <div className="main-part">
      <ErrorBoundary>
        <Left />
      </ErrorBoundary>
      <ErrorBoundary>
        <Middle />
      </ErrorBoundary>
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={Article} />
          <Route path="/add-article" exact component={AddArticle} />
          <Route path="/profile" exact render={props => <Profile updateProfile={updateProfile} />} />
          <Route path={['/users', '/users/:id([0-9]{1,8})', '/users/:id([0-9]{1,8})/:name(avatar|edit)', '/users/:id([0-9]{1,8})/:name(avatar)/:action(edit|delete)?', '/users/:id([0-9]{1,8})/:name(file)/:action([0-9]{1,8}-[A-Za-z]{1,10}-[0-9]{4}-[0-9]{2}-[0-9]{2}.docx)/:version(v.[0-9]{1,8}.[0-9]{1,8}.[0-9]{1,8})', '/users/:id([0-9]{1,8})/:name(file)/:action([0-9]{1,8}-[A-Za-z]{1,10}-[0-9]{4}-[0-9]{2}-[0-9]{2}.pdf)/:version(v.[0-9]{1,8}.[0-9]{1,8}.[0-9]{1,8})', '/users/:id([0-9]{1,8})/:name(file)/:action([0-9]{1,8}-[A-Za-z]{1,10}-[0-9]{4}-[0-9]{2}-[0-9]{2}.jpeg)/:version(v.[0-9]{1,8}.[0-9]{1,8}.[0-9]{1,8})', '/users/:id([0-9]{1,8})/:name(file)/:action([0-9]{1,8}-[A-Za-z]{1,10}-[0-9]{4}-[0-9]{2}-[0-9]{2}.txt)/:version(v.[0-9]{1,8}.[0-9]{1,8}.[0-9]{1,8})']} exact render={props => <ForPath checkData={checkData} {...props} />} />
        </Switch>
      </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
