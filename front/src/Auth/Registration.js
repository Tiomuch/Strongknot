import React, { useState } from 'react'
import userFetch from './userFetch'

export default function Register () {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
    userFetch(user)
  }

  return (
    <div className="right-part">
      <form>
        <input type="first_name"
               className="Field"
               id="first_name"
               placeholder="Enter Name"
               value={user.first_name}
               onChange={handleChange}
        />
        <input type="last_name"
               className="Field"
               id="last_name"
               placeholder="Enter Last Name"
               value={user.last_name}
               onChange={handleChange}
        />
        <input type="email"
               className="Field"
               id="email"
               placeholder="Enter email"
               value={user.email}
               onChange={handleChange}
        />
        <input type="password"
               className="Field"
               id="password"
               placeholder="Enter password"
               value={user.password}
               onChange={handleChange}
        />
        <button
          type="submit"
          className="sign"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
    </div>
  )
}
