const express = require('express')
const router = express.Router()
require('dotenv').config()
const authGetEntity = require('../middleware/userOwnEntity')
const upload = require('../middleware/upload')
const userID = 'id'
const table = 'comments'
const commentID = 'user_id'
const ID = 'comment_id'
const db = require('../routes/forDB')
const niv  = require('node-input-validator')

niv.extend('unique', async ({ value, args }) => {
  let exist = false
  if (args[2]) {
    exist =  await db(args[0])
      .whereNot(args[1], '=', args[2])
      .where(args[1], '=', value)
      .first()
  } else {
    exist = await db(args[0]).where(args[1], '=', value).first()
  }

  return !exist
})

router.post('/create-comment',async (req, res) => {
  const comments = await db('comments').select('*').groupBy("comment_id")

  if (comments.length === 0) {
    req.body.comment_id = 1
  } else {
    const newID = Number(comments[comments.length - 1].comment_id) + 1
    req.body.comment_id = newID
  }

  const v = new niv.Validator(req.body, {
    text: 'required|maxLength:50|minLength:1',
    date: 'required|date'
  })

  const matched = await v.check()

  if (matched) {
    try {
      if (req.body.comment_under_id) {
        await db('comments').insert({
          comment_id: req.body.comment_id,
          text: req.body.text,
          date: req.body.date,
          user_id: req.user[0].id,
          post_id: req.body.post_id,
          comment_under_id: req.body.comment_under_id
        })
      } else {
        await db('comments').insert({
          comment_id: req.body.comment_id,
          text: req.body.text,
          date: req.body.date,
          user_id: req.user[0].id,
          post_id: req.body.post_id
        })
      }

      res.status(201).json(req.body)
    } catch (e) {
      console.log(e)
    }
  } else {
    req.body = v.errors
    res.status(422).json({
      message: 'Данные не верны'
    })
  }
})

router.get('/:id', async (req, res) => {// комменты к  одному посту
  const comments = await db('comments').select('*').where({post_id: req.params.id})

  if (comments.length !== 0) {
    res.json(comments)
  } else {
    res.status(422).json({
      message: 'Нету комментов'
    })
  }
})

router.post('/edit-comment/:id',[authGetEntity(userID, table, commentID, ID)], async (req, res) => {
  const v = new niv.Validator(req.body, {
    text: 'required|maxLength:50|minLength:1',
    date: 'required|date'
  })

  const matched = await v.check()

  if (matched) {
    try {
      await db('comments').where({comment_id: req.params.id}).update({
        text: req.body.text,
        date: req.body.date
      })

      res.status(201).json(req.body)
    } catch (e) {
      console.log(e)
    }
  } else {
    req.body = v.errors
    res.status(422).json({
      message: 'Данные не верны'
    })
  }
})

router.delete('/delete-comment/:id',  [authGetEntity(userID, table, commentID, ID)], async (req, res) => {
  try {
    const comment = await db('comments').select('*').where({comment_id: req.params.id})

    if (comment) {
      await db('comments').where({comment_id: req.params.id}).del()

      res.status(201).json({
        message: 'Коммент удален'
      })
    } else {
      res.status(422).json({
        message: 'Такого коментария нет'
      })
    }

  } catch (e) {
    console.log(e)
  }
})

module.exports = router
