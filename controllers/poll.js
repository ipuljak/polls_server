const express = require('express')
  , router = express.Router()
  , db = require('../models');

router.post('/new_poll', (req, res) => {
  db.Poll.create({
    question: req.body.question
  }).then(() => {
    res.send({
      success: 'Poll created.'
    });
  }).catch(error => {
    res.send({
      error: error.message + ': ' + error.errors[0].message
    });
  });
});

module.exports = router;