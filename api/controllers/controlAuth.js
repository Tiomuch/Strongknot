const db = require('../routes/forDB')
const mailer = require('../routes/nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
let number

module.exports.login  = async (req, res) => {
  const person = await db('users').where({email: req.body.email}).first()
  if (person) {
    if (person.activated){
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
      res.status(401).json({
        message: 'Почта не подтверждена'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользователь не найден'
    })
  }
}

module.exports.check  = async (req, res) => {
  const person = await db('users').where({email: req.body.email}).first()
  if (person) {
    if(Number(req.body.code) === number){
      await db('users').where({email: req.body.email}).update({activated: true})

      res.status(202).json({
        message: 'Почта подтверждена'
      })
    } else {
      res.status(400).json({
        message: 'Неверный код'
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

      number = Math.floor(Math.random() * (9999 - 1000)) + 1000

      const message = {
        from: 'nekryto@ukr.net',
        to: req.body.email,
        subject: 'Congratulation! This is the next step for your registration',
        text: `Поздравляем, Вы прошли первый этап регистрации на нашем сайте
        
        Данные для следующего этапа:
        email: ${req.body.email}
        code: ${number}
        
        Вот ссылка: http://${process.env.HOST}:${process.env.PORT}/api/auth/check`
      }

      mailer(message)
      res.status(201).json(req.body)
    } catch(e) {
      console.log(e)
    }
  }
}
