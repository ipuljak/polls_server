// Root URL: http://localhost:3010/api/options

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

/**
 *  POST route /create
 *    Creates a new poll option
 *    -> http://localhost:3010/api/options/create
 *    Requirements
 *      body.option -> The question string of the poll option
 *      body.PollId -> The id of the poll this option is associated with
 *    Returns a success string if created
 */
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

/**
 *  GET route /:option_id/vote
 *    Increment's an option's votes by one
 *    -> http://localhost:3010/api/options/:option_id/vote
 *    Requirements
 *      params.option_id -> The id of the option to be incremented
 *    Returns a success string if voted
 */
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

/**
 *  DELETE route /:option_id/delete
 *    Deletes an option
 *    -> http://localhost:3010/api/options/:option_id/delete
 *    Requirements
 *      params.option_id -> The id of the option to be deleted
 *    Returns a success string if deleted
 */
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