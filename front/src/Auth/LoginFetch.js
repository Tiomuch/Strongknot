import React from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios'
import PropTypes from 'prop-types'

const userFetch = (user, updateProfile) => {
  if (user.email.length && user.password.length) {
    const payload = {
      email: user.email,
      password: user.password
    }
    axios.post('http://localhost:3000/api/auth/login', payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          updateProfile(response.data.user.first_name, response.data.user.last_name)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('first_name', response.data.user.first_name)
          localStorage.setItem('last_name', response.data.user.last_name)
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

userFetch.propTypes = {
  updateProfile: PropTypes.func
}

export default userFetch
