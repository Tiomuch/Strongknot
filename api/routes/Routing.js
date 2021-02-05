const express = require('express')
const router = express.Router()
require('dotenv').config()
const authGetEntity = require('../middleware/userOwnEntity')
const authRole = require('../middleware/checkRole')
const userID = 'id'
const table = 'posts'
const postID = 'userid'
const db = require('../routes/forDB')

router.get('/all-posts', async (req, res) => {
  const posts = await db('posts').select('*')
  res.json(posts)
})

router.post('/create-post', (req, res) => {
  //Create new post
})

router.get('/:id', (req, res) => {
  //View one current post
})

router.put('/edit-any-post/:id', [authRole()], (req, res) => {
  res.json({
    message: 'you can edit any post'
  })
  //Edit any post
})

router.delete('/delete-any-post/:id', [authRole()], (req, res) => {
  res.json({
    message: 'you can delete any post'
  })
  //Delete any post
})

router.put('/edit-post/:id', [authGetEntity(userID, table, postID)], (req, res) => {
  res.json({
    message: 'you can edit post'
  })
  //Edit current post
})

router.delete('/delete-post/:id', [authGetEntity(userID, table, postID)], (req, res) => {
  res.json({
    message: 'you can delete post'
  })
  //Delete current post
})

module.exports = router
