import React, { useState } from 'react'
import Header from './Header'
import ForPosts from './ForMiddle/ForPosts'
import Left from './Left'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle'
import Profile from './ForHeader/Profile'
import EditArticle from './ForHeader/EditArticle'
import ErrorBoundary from './ErrorBoundary'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EditProfile from './ForLeft/EditProfile'

function App () {
  const [name, setName] = useState('none') // eslint-disable-line no-unused-vars
  const [lastName, setLastName] = useState('none') // eslint-disable-line no-unused-vars
  const [profile, setProfile] = useState('User')
  const [post, setPost] = useState()

  const updateProfile = (userName, userLastName) => {
    setName(userName)
    setLastName(userLastName)
    setProfile(userName + ' ' + userLastName)
  }

  const updatePost = (data) => {
    setPost(data)
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
        <Route path="/" render={props => <ForPosts updatePost={updatePost} />} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={Article} />
          <Route path="/add-article" exact component={AddArticle} />
          <Route path="/profile" exact render={props => <Profile updateProfile={updateProfile} />} />
          <Route path="/edit-post" exact render={props => <EditArticle post={post} />} />
          <Route path="/edit-profile" exact render={props => <EditProfile name={name} secondName={lastName} updatePost={updatePost} />} />
        </Switch>
      </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
