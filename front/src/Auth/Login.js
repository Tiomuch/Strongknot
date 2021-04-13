import React, { useState } from 'react'
import LoginFetch from './LoginFetch'

const Login = () => {
  const [user, setUser] = useState({
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
    LoginFetch(user)
  }

  return (
    <div className="right-part">
      <form>
        <input type="email"
               className="Field"
               id="email"
               placeholder="Enter Email"
               value={user.email}
               onChange={handleChange}
        />
        <input type="password"
               className="Field"
               id="password"
               placeholder="Enter Password"
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

export default Login
