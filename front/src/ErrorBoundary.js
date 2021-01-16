import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    console.log(error)
    return { hasError: true }
  }

  static componentDidCatch (error, errorInfo) {
    console.log(error)
    console.log(errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  updateProfile: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default ErrorBoundary
