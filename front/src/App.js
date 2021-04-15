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
import Register from './Auth/Registration'
import EmailCheck from './Auth/EmailCheck'
import Login from './Auth/Login'
import AddAvatar from './ForLeft/AddAvatar'

function App () {
  const [profile, setProfile] = useState('User') // eslint-disable-line no-unused-vars
  const [post, setPost] = useState()

  const checkProfile = (name, lastName) => {
    if (name && lastName && name !== '' && lastName !== '') {
      setProfile(name + ' ' + lastName)
    } else {
      setProfile('User')
    }
  }

  const updateProfile = (userName, userLastName) => {
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
        <Switch>
          <Route path={['/', '/add-article', '/profile', '/login']} exact component={Left}/>
          <Route exact path="/edit-post" render={props => <EditArticle post={post} />} />
          <Route path="/add-avatar" exact render={props => <AddAvatar />} />
          <Route path="/edit-profile" exact render={props => <EditProfile />} />
        </Switch>
      </ErrorBoundary>
      <ErrorBoundary>
        <Route path="/" render={props => <ForPosts updatePost={updatePost} checkProfile={checkProfile} />} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Switch>
          <Route path={['/', '/edit-post', '/edit-profile', '/add-avatar']} exact render={props => <Article updatePost={updatePost} />} />
          <Route path="/add-article" exact component={AddArticle} />
          <Route path="/register" exact component={Register} />
          <Route path="/check" exact component={EmailCheck} />
          <Route path="/login" exact render={props => <Login updateProfile={updateProfile} />} />
          <Route path="/profile" exact render={props => <Profile updateProfile={updateProfile} />} />
        </Switch>
      </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
