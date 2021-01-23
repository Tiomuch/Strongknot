const db = require('../routes/forDB')
const bcrypt = require('bcryptjs')

module.exports.login  = (req, res) => {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

module.exports.register = async (req, res) => {
  const person = await db('users').where({email: req.body.email}).first()
  if(person){
    res.status(409).json({
      message: 'email уже занят'
    })
  } else {
    try {
      const salt = bcrypt.genSaltSync(10)
      const pass = req.body.password
      await db('users').insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(pass, salt)
      })
      res.status(201).json(db.select('*').from('users'))
    } catch(e) {
      // error
    }
  }
}
