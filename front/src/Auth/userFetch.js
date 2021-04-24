import React from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios'

const userFetch = user => {
  if (user.email.length && user.password.length && user.first_name.length && user.last_name.length) {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    }
    axios.post('http://localhost:3000/api/auth/register', payload)
      .then(function (response) {
        if (response.status === 201) {
          alert('You has been registered')
        } else {
          alert('Some error ocurred')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    alert('Please enter valid data')
  }
}

export default userFetch
