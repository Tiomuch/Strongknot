const express = require('express')
const passport = require('passport')
const controller = require('../controllers/controlAuth')
const router = express.Router()
require('../controllers/googleAuth')
require('../controllers/facebookAuth')

router.post('/login', controller.login)

router.post('/register', controller.register)

router.post('/check', controller.check)

router.get('/failed', (req, res) => res.send('You failed to log in'))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}

router.get('/good', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.first_name} ${req.user.last_name}`)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/failed' }), (req, res) => {
  res.redirect('/api/auth/good')
})

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/auth/failed' }), (req, res) => {
  res.redirect('/api/auth/good')
})

router.get('/logout', (req, res) => {
  req.session = null
  req.logout()
  res.redirect('/')
})

module.exports = router
