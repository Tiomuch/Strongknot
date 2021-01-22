require('dotenv').config()
const knex = require('knex')({client: 'pg'})

module.exports.login  = (req, res) => {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

module.exports.register = (req, res) => {
  // knex('users').where('email', '=', req.body.email)
  knex('users').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }).then(() => console.log('User in'))
}
