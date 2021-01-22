// const User = require('../User')
const knex = require('../forDB')

module.exports.login  = (req, res) => {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

module.exports.register = (req, res) => {

  /*const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  })*/
  knex('users').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }).then(() => console.log('User'))

  // user.save().then(() => console.log('User was created'))
}
