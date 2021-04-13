const express = require('express')
const router = express.Router()
require('dotenv').config()
const authGetEntity = require('../middleware/userOwnEntity')
const upload = require('../middleware/upload')
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
  if (posts.length !== 0) {
    res.json(posts)
  } else {
    res.status(422).json({
      message: 'Нету постов'
    })
  }
})

router.post('/create-post', upload.single('image'), async (req, res) => {
  const posts = await db('posts').select('*').groupBy("id")
  if (posts.length === 0) {
    req.body.id = 1
  } else {
    const newID = Number(posts[posts.length - 1].id) + 1
    req.body.id = newID
  }

  const v = new niv.Validator(req.body, {
    title: 'required|maxLength:50|minLength:1',
    description: 'required|minLength:1|maxLength:500',
    date: 'required|date'
  })

  const matched = await v.check()

  if (matched) {
    try {
      await db('posts').insert({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        userid: req.user[0].id,
        image: req.file ? req.file.path : ''
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

router.get('/own', async (req, res) => {// посты конкретного юзера
  const posts = await db('posts').select('*').where({userid: req.user[0].id})

  if (posts.length !== 0) {
    res.json(posts)
  } else {
    res.status(422).json({
      message: 'Нету постов'
    })
  }
})

router.post('/edit-post/:id',  upload.single('image'),[authGetEntity(userID, table, postID, userID)], async (req, res) => {
  const v = new niv.Validator(req.body, {
    title: 'required|maxLength:50|minLength:1',
    description: 'required|minLength:1|maxLength:500',
    date: 'required|date'
  })

  const matched = await v.check()

  if (matched) {
    try {
      await db('posts').where({id: req.params.id}).update({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        image: req.file ? req.file.path : ''
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

router.delete('/delete-post/:id',  [authGetEntity(userID, table, postID, userID)], async (req, res) => {
  try {
    const post = await db('posts').select('*').where({id: req.params.id}).first()

    if (post) {
      await db('posts').where({id: req.params.id}).del()

      res.status(201).json({
        message: 'Пост удален'
      })
    } else {
      res.status(422).json({
        message: 'Такого поста нет'
      })
    }

  } catch (e) {
    console.log(e)
  }
})

router.get('/likes/:id', async (req, res) => {
  const post = await db('posts').select('*').where({id: req.params.id}).first()

  if (post) {
    const likes = await db('likes').select('*').where({posts_id: req.params.id})

    if (likes.length !== 0) {
      res.json(likes)
    } else {
      res.status(422).json({
        message: 'Нету лайков'
      })
    }
  } else {
    res.status(422).json({
      message: 'Нету поста'
    })
  }
})

router.post('/add-like', async (req, res) => {
  const post = await db('posts').select('*').where({id: req.body.id}).first()
  if (!post) {
    res.status(422).json({
      message: 'Нету поста'
    })
  } else {
    const likes = await db('likes').select('*').groupBy("likes_id")
    if (likes.length === 0) {
      req.body.like_id = 1
    } else {
      const newID = Number(likes[likes.length - 1].likes_id) + 1
      req.body.like_id = newID
    }

    try {
      await db('likes').insert({
        likes_id: req.body.like_id,
        posts_id: req.body.id,
        users_id: req.user[0].id
      })

      res.status(201).json(req.body)
    } catch (e) {
      console.log(e)
    }
  }
})

router.delete('/del-like/:id', async (req, res) => {
  try {
    const like = await db('likes').select('*').where({likes_id: req.params.id}).first()

    if (like) {
      await db('likes').where({likes_id: req.params.id}).del()

      res.status(201).json({
        message: 'Лайк удален'
      })
    } else {
      res.status(422).json({
        message: 'Такого лайка нет'
      })
    }

  } catch (e) {
    console.log(e)
  }
})

module.exports = router
