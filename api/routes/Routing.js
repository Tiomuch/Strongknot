const express = require('express')
const router = express.Router()
require('dotenv').config()
const authGetPost = require('../routes/userOwnPost')
const userID = 'id'
const table = 'posts'
const postID = 'userID'

router.get('/all', async (req, res) => {
  const posts = await db('posts').select('*')
  res.json(posts)
})

router.post('/create', (req, res) => {
  //Create new post
})

router.get('/:id', (req, res) => {
  //View one current post
})

// router.use(authGetPost)

router.put('/edit-post/:id', [authGetPost(userID, table, postID)], (req, res) => {
  //console.log(req.user[0])
  res.json({
    message: 'you can edit post'
  })
  //Edit current post
})

router.delete('/delete-post/:id', (req, res) => {
  //Delete current post
})

module.exports = router
