import React from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios'

const userFetch = user => {
  if (user.email.length && user.code.length) {
    const payload = {
      email: user.email,
      code: user.code
    }
    axios.post('http://localhost:3000/api/auth/check', payload)
      .then(function (response) {
        if (response.status === 202) {
          alert('Your account has been activated')
        } else {
          alert('Some error ocurred')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    alert('Please enter valid email and code')
  }
}

export default userFetch
