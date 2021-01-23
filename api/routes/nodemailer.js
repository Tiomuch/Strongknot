const nodemailer = require('nodemailer')
require('dotenv').config()

const transported = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: '465',
  secure: true,
  auth: {
    user: 'nekryto@ukr.net',
    pass: 'nekryto123'
  }
})

const mailer = message => {
  transported.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent: ', info)
    }
  })
}

module.exports = mailer
