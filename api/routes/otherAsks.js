const express = require('express')
const router = express.Router()
require('dotenv').config()
const db = require('./forDB.js')
const passport = require('passport')

router.get('/', async (rec, res)=> {
  const users = await db('users').select('*')
  res.json(users)
})

router.use( (req, res, next) => {
  console.log('We are in')
  next()
})

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router
