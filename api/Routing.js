let express = require('express');
let router = express.Router();

router.use( (req, res, next) => {
  console.log('We are in routing');
  next();
});

router.get('/posts', function(req, res) {
  //View all posts
});

router.get('/posts/:id', function(req, res) {
  //View one current post
});

router.post('/posts', function(req, res) {
  //Create new post
});

router.put('/posts/:id', function(req, res) {
  //Edit current post
});

router.delete('/posts/:id', function(req, res) {
  //Delete current post
});

module.exports = router;
