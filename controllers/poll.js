// Root URL: http://localhost:3010/api/polls

const express = require('express')
  , router = express.Router()
  , db = require('../models');

/**
 *  POST route /create
 *    Creates a poll
 *    -> http://localhost:3010/api/polls/create
 *    Requirements
 *      body.question -> The poll's question
 *      body.UserId -> The id of the user to associate the poll with
 *    Returns a success string if created
 */
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

/**
 *  GET route /fetch_all
 *    Obtains a list of polls and their id's
 *    -> http://localhost:3010/api/polls/fetch_all
 *    Sends the list of polls in inverse chronological order
 */
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

/**
 *  GET route /:poll_id/read
 *    Read a poll and it's options
 *    -> http://localhost:3010/api/polls/:poll_id/read
 *    Requirements
 *      params.poll_id -> The id of the poll
 *    Send a poll's information along with who created 
 *    it, date created, question, and it's options
 */
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

/**
 *  DELETE route /:poll_id/delete
 *    Deletes a poll
 *    -> http://localhost:3010/api/polls/:poll_id/delete
 *    Requirements
 *      params.poll_id -> The id of the poll
 *    Returns a sucess string if deleted
 */
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