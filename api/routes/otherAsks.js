const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
require('dotenv').config()
const db = require('./forDB.js')
const passport = require('passport')

router.get('/', async (rec, res)=> {
  const users = await db('users').select('*')
  res.json(users)
})

router.post('/avatar', upload.single('avatar'), async (req, res) => {
  const avatar = req.file ? req.file.path : ''

  if (avatar === '') {
    res.status(400).json({
      message: 'Нету аватарки'
    })
  } else {
    try {
      await db('users').where({id: req.user[0].id}).update({avatar: avatar})

      res.status(202).json({
        message: 'Аватар добавлен'
      })
    } catch (e) {
      console.log(e)
    }
  }
})

router.get('/get-avatar', async (req, res) => {
  try {
    const personAvatar = await db('users').where({id: req.user[0].id}).select('avatar').first()

    res.status(202).json(personAvatar)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
