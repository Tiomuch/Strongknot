const express = require('express')
const app = express()

const envy = require('./mainClass.js')
envy.get()

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const postRoutes = require('./routes/Routing.js')
app.use(express.static('/public'), postRoutes)

const other = require('./routes/otherAsks.js')
app.use(express.static('/public'), other)

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

app.listen(3000, () => {
  console.log("App server started!")
});
