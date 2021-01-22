let express = require('express');
let router = express.Router();
const db = require('./forDB.js');

/*router.get('/', async(rec, res)=> {
  const users = await db('users').select('*');
  res.json(users);
});*/

router.use( (req, res, next) => {
  console.log('We are in');
  next();
});

router.get('/', (req, res) => {
  res.send('Hello World!')
});

module.exports = router;
