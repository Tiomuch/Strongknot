import React from 'react'
import PropTypes from 'prop-types'

function profile ({ updateProfile }) {
  const rename = (event) => {
    event.preventDefault()
    updateProfile(event.target.elements.name.value, event.target.elements.lastName.value)
  }

  return (
    <div className="right-part">
      <form onSubmit={rename}>
        <label><b>Имя</b></label>
        <input type="text" placeholder="Enter Name" name="name" required />
          <label><b>Фамилия</b></label>
          <input type="text" placeholder="Enter Last Name" name="lastName" required />
        <button type="submit" className="sign">Отправить</button>
      </form>
    </div>
  )
}

profile.propTypes = {
  updateProfile: PropTypes.func
}

export default profile
