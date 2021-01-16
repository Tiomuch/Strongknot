import React from 'react'
import PropTypes from 'prop-types'

function profile (props) {
  const rename = (event) => {
    event.preventDefault()
    props.updateProfile(event.target.elements.name.value)
  }
  return (
    <div>
      <form onSubmit={rename}>
        <label>
          Имя и Фамилия:
          <input type="text" name="name" />
        </label>
        <button type="submit">Отправить</button>
      </form>
    </div>
  )
}

profile.propTypes = {
  updateProfile: PropTypes.func
}

export default profile
