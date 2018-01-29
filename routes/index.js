var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res, next) {
  // Uncomment below line to use app state instead of Mongodb
  // return res.render('tictactoe', {state: res.app.locals.state});

  // Using Mongo
  db.getState()
  .then(result => res.render('tictactoe', {state: result}))
  .catch(err => {
    console.error(err);
    res.render('tictactoe', {state: null});
  })
});

module.exports = router;
