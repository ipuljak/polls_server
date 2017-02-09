// Root URL: http://localhost:3010:/api/polls'

const express = require('express')
  , router = express.Router()
  , db = require('../models');

// POST route to create a new poll
router.post('/create', (req, res) => {
  db.Poll.create({
    question: req.body.question,
    UserId: req.body.UserId
  }).then(response => {
    res.send({
      success: 'Poll created.',
      id: response.dataValues.id
    });
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

// GET route to obtain a list of polls and their id's
router.get('/fetch_all', (req, res) => {
  db.Poll.findAll()
    .then(result => {
      res.send(result.reverse());
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

// GET route to read a poll and it's options
router.get('/:poll_id/read', (req, res) => {
  db.Poll.find({
    where: {
      id: req.params.poll_id
    },
    include: [db.Option, db.User]
  }).then(results => {
    res.send({
      createdBy: results.dataValues.User.username,
      created: results.dataValues.createdAt,
      question: results.dataValues.question,
      options: results.dataValues.Options
    });
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

// DELETE route to delete a poll
router.post('/:poll_id/delete', (req, res) => {
  db.Poll.destroy({
    where: {
      id: req.params.poll_id
    }
  }).then(() => {
    res.send({ 
      success: 'Poll with id ' + req.params.user_id + ' was deleted.' 
    });
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

module.exports = router;