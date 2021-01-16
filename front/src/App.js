import React from 'react'
import Header from './Header'
import Middle from './Middle'
import Left from './Left'
import Article from './ForHeader/Article'
import AddArticle from './ForHeader/AddArticle'
import Profile from './ForHeader/Profile'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'

class App extends React.Component {
  state = {
    headersElement: Article,
    temporaryAdd: AddArticle, // это для того что бы Eslint не ругался и дал запустить страничку
    temporaryP: Profile, // это тоже для ESlint
    fullName: 'Profile'
  };

  updateData = (value) => {
    this.setState({ headersElement: value })
  }

  updateProfile = (value) => {
    this.setState({ fullName: 'Profile (' + value + ')' })
  }

  render () {
    return (
      <>
        <ErrorBoundary>
        <header><Header updateData={this.updateData} name={this.state.fullName} /></header>
        </ErrorBoundary>
      <ErrorBoundary>
        <div className="component"><Left /></div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="component"><Middle /></div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div className="component"><this.state.headersElement updateProfile={this.updateProfile} /></div>
      </ErrorBoundary>
      </>
    )
  }
}

App.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol
}

export default App
