import React, { useState } from 'react'
import Header from './MainComponents/Header'
import ForPosts from './ForMiddle/ForPosts'
import Left from './MainComponents/Left'
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
import ShowComments from './ForRight/ShowComments'
import AddComment from './ForRight/AddComment'
import OwnComments from './ForLeft/OwnComments'
import EditComment from './ForRight/EditComment'
import AllUsers from './ForMiddle/AllUsers'
import Friends from './ForRight/Friends'
import RequestToFriend from './ForRight/RequestToFriend'

function App () {
  const [profile, setProfile] = useState('User') // eslint-disable-line no-unused-vars
  const [post, setPost] = useState()
  const [comment, setComment] = useState()

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

  const updateComment = (data) => {
    setComment(data)
  }

  return (
    <Router>
      <ErrorBoundary>
        <header><Header name={profile} /></header>
        </ErrorBoundary>
      <div className="main-part">
      <ErrorBoundary>
        <Switch>
          <Route path={['/', '/add-article', '/profile', '/login', '/comments', '/add-comment', '/edit-comment', '/users', '/friends', '/req-friend']} exact component={Left}/>
          <Route exact path="/edit-post" render={props => <EditArticle post={post} />} />
          <Route path="/add-avatar" exact render={props => <AddAvatar />} />
          <Route path="/edit-profile" exact render={props => <EditProfile />} />
          <Route path="/own-comments" exact render={props => <OwnComments updateComment={updateComment} />} />
        </Switch>
      </ErrorBoundary>
      <ErrorBoundary>
        <Switch>
          <Route path={['/', '/friends', '/req-friend', '/add-article', '/profile']} exact render={props => <ForPosts checkProfile={checkProfile} updateComment={updateComment} />} />
          <Route path="/users" exact render={props => <AllUsers />} />
        </Switch>
      </ErrorBoundary>
      <ErrorBoundary>
        <Switch>
          <Route path={['/', '/edit-post', '/edit-profile', '/add-avatar', '/own-comments', '/users']} exact render={props => <Article updatePost={updatePost} />} />
          <Route path="/add-article" exact component={AddArticle} />
          <Route path="/register" exact component={Register} />
          <Route path="/check" exact component={EmailCheck} />
          <Route path="/login" exact render={props => <Login updateProfile={updateProfile} />} />
          <Route path="/profile" exact render={props => <Profile updateProfile={updateProfile} />} />
          <Route exact path="/comments" render={props => <ShowComments comment={comment} />} />
          <Route exact path="/add-comment" render={props => <AddComment comment={comment} />} />
          <Route exact path="/edit-comment" render={props => <EditComment comment={comment} />} />
          <Route path="/friends" exact render={props => <Friends />} />
          <Route path="/req-friend" exact render={props => <RequestToFriend />} />
        </Switch>
      </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
