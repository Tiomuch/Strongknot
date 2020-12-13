class Main {
  function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
  }

  app.get('/', function (req, res) {
    throw new Error('BROKEN')
  })

  app.get('/', function (req, res, next) {
    fs.readFile('/file-does-not-exist', function (err, data) {
      if (err) {
        next(err) // Pass errors to Express.
      } else {
        res.send(data)
      }
    })
  })

  app.get('/user/:id', async function (req, res, next) {
    let user = await getUserById(req.params.id);
    res.send(user)
  })

  app.get('/', [
    function (req, res, next) {
      fs.writeFile('/inaccessible-path', 'data', next)
    },
  function (req, res) {
    res.send('OK')
  }
])

  app.get('/', function (req, res, next) {
    setTimeout(function () {
      try {
        throw new Error('BROKEN')
      } catch (err) {
        next(err)
      }
    }, 100)
  })

  app.get('/', function (req, res, next) {
    Promise.resolve().then(function () {
      throw new Error('BROKEN')
    }).catch(next)
  })

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
])

  const result = require('dotenv').config();

  if (result.error) {
  throw result.error
}

const db = require('db');
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});

app.listen( localhost)( () => {
  console.log("App server started!");
});

}

new Main();
