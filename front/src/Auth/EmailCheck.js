import React, { useState } from 'react'
import emailFetch from './EmailFetch'

const emailCheck = () => {
  const [user, setUser] = useState({
    email: '',
    code: ''
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
    emailFetch(user)
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
        <input type="code"
               className="Field"
               id="code"
               placeholder="Enter Code"
               value={user.code}
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

export default emailCheck
