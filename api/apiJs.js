const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const envy = require('./mainClass.js')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/Routing.js')
const other = require('./routes/otherAsks.js')
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'first-session',
  keys: ['key1', 'key2']
}))

app.use((req, res, next) => {
  let origin = 'http://localhost:3001'
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(passport.initialize())
app.use(passport.session())
require('./forPassport/passport')(passport)

app.use(bodyParser.json())

envy.get()

app.get('/', (req, res) => res.send('Hello'))

app.use('/api/auth', authRoutes)

//app.use(passport.authenticate('jwt', {session: false}))

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
