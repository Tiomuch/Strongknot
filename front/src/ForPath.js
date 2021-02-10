import React from 'react'
import PropTypes from 'prop-types'

function forPath ({ checkData, match }) {
  const draw = () => {
    if (match.params.action && match.params.action !== 'edit' && match.params.action !== 'delete') {
      if (checkData(match) === true) {
        return <div><h1>OK</h1></div>
      } else {
        return <div><h1>Неверная дата</h1></div>
      }
    } else {
      return <div><h1>Normal</h1></div>
    }
  }

  return (
    <div className="right-part">
      { draw() }
    </div>
  )
}

forPath.propTypes = {
  checkData: PropTypes.func
}

export default forPath
