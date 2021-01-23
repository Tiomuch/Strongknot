const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')

app.use(passport.initialize())
require('./forPassport/passport')(passport)

app.use(bodyParser.json())

const envy = require('./mainClass.js')
envy.get()

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const postRoutes = require('./routes/Routing.js')
app.use('/api/posts', postRoutes)

const other = require('./routes/otherAsks.js')
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
