let express = require('express');
let router = express.Router();
const db = require('./forDB.js');

router.get('/', async(rec, res)=> {
  res.send(db.select().from('./db/users'));
});

router.use( (req, res, next) => {
  console.log('We are in');
  next();
});

router.get('/', (req, res) => {
  res.send('Hello World!')
});

router.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err)
    } else {
      res.send(data)
    }
  })
});

router.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
  function (req, res) {
    res.send('OK')
  }
]);

router.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', function (err, data) {
      res.locals.data = data;
      next(err)
    })
  }]);

module.exports = router;
