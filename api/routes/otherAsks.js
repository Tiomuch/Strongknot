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

router.post('/add-friend', async (req, res) => {
  const friends = await db('friend').select('*').groupBy("friend_id")
  if (friends.length === 0) {
    req.body.friend_id = 1
  } else {
    const newID = Number(friends[friends.length - 1].friend_id) + 1
    req.body.friend_id = newID
  }

  try {
    await db('friend').insert({
      friend_id: req.body.friend_id,
      user_id: req.user[0].id,
      with_user_id: req.body.id
    })

    res.status(201).json(req.body)
  } catch (e) {
    console.log(e)
  }
})

router.delete('/delete-friend/:id', async (req, res) => {
  try {
    const friend = await db('friend').select('*').where({friend_id: req.params.id}).first()

    if (friend) {
      await db('friend').where({friend_id: req.params.id}).del()

      res.status(201).json({
        message: 'Друг удалён'
      })
    } else {
      res.status(422).json({
        message: 'Такого друга нет'
      })
    }

  } catch (e) {
    console.log(e)
  }
})

module.exports = router
