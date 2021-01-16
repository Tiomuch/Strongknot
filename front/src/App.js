import React from 'react'
import Header from './Header'
import Middle from './Middle'
import Left from './Left'

class App extends React.Component {
  /* state = {

  }; */
  render () {
    return (
      <div>
        <header><Header /></header>
        <div><Left /></div>
        <div><Middle /></div>
      </div>
    )
  }
}

export default App
