const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const envy = require('./mainClass.js')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/Routing.js')
const other = require('./routes/otherAsks.js')

app.use(passport.initialize())
require('./forPassport/passport')(passport)

app.use(bodyParser.json())

envy.get()

app.use('/api/auth', authRoutes)

app.use(passport.authenticate('jwt', {session: false}))

app.use('/api/posts', postRoutes)

app.use('/api/other', other)

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

app.listen(3000, () => {
  console.log("App server started!")
})
