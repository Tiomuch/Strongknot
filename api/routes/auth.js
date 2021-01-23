const express = require('express')
const controller = require('../controllers/controlAuth')
const router = express.Router()

router.post('/login', controller.login)

router.post('/register', controller.register)

router.post('/check', controller.check)

module.exports = router
