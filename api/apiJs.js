const express = require('express');
const app = express();

const envy = require('./mainClass.js');
envy.get();

const postRoutes = require('./Routing.js');
app.use(express.static('/public'), postRoutes);

const other = require('./otherAsks.js');
app.use(express.static('/public'), other);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

app.listen(3000, () => {
  console.log("App server started!");
});
