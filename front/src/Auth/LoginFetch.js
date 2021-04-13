import React from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios'

const userFetch = user => {
  if (user.email.length && user.password.length) {
    const payload = {
      email: user.email,
      password: user.password
    }
    axios.post('http://localhost:3000/api/auth/login', payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          alert('You are in social net, congratulation')
        } else {
          alert('Some error ocurred')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    alert('Please enter valid email and password')
  }
}

export default userFetch
