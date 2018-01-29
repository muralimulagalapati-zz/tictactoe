var express = require('express');
var router = express.Router();
var db = require('./models')

router.get('/state', function(req, res, next) {
  const state = res.app.locals.state;
  if (state) {
    return res.status(200).json(state);
  }
  res.sendStatus(404);

  // Using Mongo
  // db.getState()
  // .then(state => res.state(200).json(state))
  // .catch(error => {
  //   console.error(error);
  //   res.sendStatus(404);
  // })
});

router.post('/state', function(req, res, next) {
  const body = req.body;
  res.app.locals.state = body;
  return res.sendStatus(201);

  // Using Mongo
  // db.saveState(body)
  // .then(() => res.sendStatus(201))
  // .catch(err => {
  //   console.error(err);
  //   res.sendStatus(500);
  // })
})

module.exports = router;
