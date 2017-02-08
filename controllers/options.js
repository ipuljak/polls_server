// Root URL: http://localhost:3010:/api/options'

const express = require('express')
  , router = express.Router()
  , db = require('../models');

// Returns a random integer between 0 and 255
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns a random color in rgba string format
//  Example: 'rgba(54, 185, 93, 1)'
const getRandomColor = () => {
  return 'rgba('
    + getRandomInt(0, 255) + ','
    + getRandomInt(0, 255) + ','
    + getRandomInt(0, 255) + ',1)';
};

// POST route to create a new poll option
router.post('/create', (req, res) => {
  db.Option.create({
    option: req.body.option,
    color: getRandomColor(),
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
    res.send({
      success: 'Incremented ' + req.params.option_id + ' by 1.'
    });
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