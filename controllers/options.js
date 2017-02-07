// Root URL: http://localhost:3010:/api/options'

const express = require('express')
  , router = express.Router()
  , db = require('../models');

// POST route to create a new poll option
router.post('/create', (req, res) => {
  db.Option.create({
    option: req.body.option,
    PollId: req.body.PollId
  }).then(() => {
    res.send({
      success: 'Option created.'
    });
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

// GET route to increment an option's votes by one
router.get('/:option_id/vote', (req, res) => {
  db.Option.findOne({
    where: {
      id: req.params.option_id
    }
  }).then(result => {
    result.increment('votes');
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

// DELETE route to delete an option
router.post('/:option_id/delete', (req, res) => {
  db.Option.destroy({
    where: {
      id: req.params.option_id
    }
  }).then(() => {
    res.send({
      success: 'Option with id ' + req.params.user_id + ' was deleted.'
    });
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

module.exports = router;