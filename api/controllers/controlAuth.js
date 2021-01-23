const db = require('../routes/forDB')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports.login  = async (req, res) => {
  const person = await db('users').where({email: req.body.email}).first()
  if (person) {
    const passwordResult = bcrypt.compareSync(req.body.password, person.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: person.email,
        userID: person.id
      }, process.env.JWT_KEY, {expiresIn: 3600})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Пароль не подходит'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользователь не найден'
    })
  }
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
