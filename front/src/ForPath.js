import React from 'react'
import PropTypes from 'prop-types'

function forPath ({ checkData, match }) {
  return (
    <div className="right-part">
      <div>{checkData(match)}</div>
      <div><h1>Normal</h1></div>
    </div>
  )
}

forPath.propTypes = {
  checkData: PropTypes.func
}

export default forPath
