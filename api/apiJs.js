let express = require('express');
let app = express();
const envy = require('./mainClass.js');

envy.get();

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err)
    } else {
      res.send(data)
    }
  })
});

app.get('/user/:id', async function (req, res, next) {
  let user = await getUserById(req.params.id);
  res.send(user)
});

app.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
function (req, res) {
  res.send('OK')
}
]);

app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', function (err, data) {
      res.locals.data = data;
      next(err)
    })
  },
function (req, res) {
  res.locals.data = res.locals.data.split(',')[1];
  res.send(res.locals.data)
}
]);

/*const db = require('db');
db.connect({
  port: process.env.PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});*/


app.listen(3000, () => {
console.log("App server started!");
});
