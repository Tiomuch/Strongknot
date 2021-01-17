import React from 'react'
import PropTypes from 'prop-types'

function profile ({ updateProfile }) {
  const rename = (event) => {
    event.preventDefault()
    updateProfile(event.target.elements.name.value, event.target.elements.secondName.value)
  }

  return (
    <div>
      <form onSubmit={rename}>
        <label>
          Имя:
          <input type="text" name="name" />
          Фамилия:
          <input type="text" name="secondName" />
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
