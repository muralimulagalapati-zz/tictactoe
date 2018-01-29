var express = require('express');
var router = express.Router();
var db = require('./models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tictactoe', {state: res.app.locals.state});

  // Using Mongo
  // db.getState()
  // .then(state => res.render('tictactoe', {state: state}))
  // .catch(err => {
  //   console.error(err);
  //   res.render('tictactoe', {state: null});
  // })
});

module.exports = router;
