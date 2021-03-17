const express = require('express')
const router = express.Router()
require('dotenv').config()
const authGetEntity = require('../middleware/userOwnEntity')
const userID = 'id'
const table = 'posts'
const postID = 'userid'
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

router.get('/all-posts', async (req, res) => {
  const posts = await db('posts').select('*')
  res.json(posts)
})

router.post('/create-post', async (req, res) => {
  /* const posts = await db('posts').select('*')
  const newID = Number(posts[posts.length - 1].id) + 1 */

  const v = new niv.Validator(req.body, {
    id: 'required|unique:posts, id',
    title: 'required|maxLength:50|minLength:1',
    description: 'required|minLength:1|maxLength:500',
    date: 'required|date',
    userid: 'required|integer'
  })

  const matched = await v.check()

  if (matched) {
    try {
      await db('posts').insert({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        userid: req.body.userid
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

router.get('/:id', (req, res) => {
  //View one current post
})

router.put('/edit-post/:id',  [authGetEntity(userID, table, postID)], (req, res) => {
  res.json({
    message: 'you can edit post'
  })
  //В разработке
})

router.delete('/delete-post/:id',  [authGetEntity(userID, table, postID)], (req, res) => {
  res.json({
    message: 'you can delete post'
  })
  //Delete current post
})

module.exports = router
