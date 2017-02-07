// Root URL: http://localhost:3010:/api/users'

const express = require('express')
  , router = express.Router()
  , db = require('../models')
  , authentication = require('../middleware/authentication');

// POST route to create a new user
// Obsolete with tokens -> Use /api/auth/register instead
router.post('/create', (req, res) => {
  // Create the user
  db.User.create({
    username: req.body.username,
    password: req.body.password
  }).then(() => {
    // Return a success string if the user is created
    res.send({
      success: 'User ' + req.body.username + ' added.'
    });
  }).catch(error => {
    // Return any errors that popped up
    res.send({
      error: error.message + ': ' + error.errors[0].message
    });
  });
});

// DELETE route to delete a user
router.delete('/:user_id/delete', (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(() => {
    res.send({ 
      success: 'User with id ' + req.params.user_id + ' was deleted.' 
    });
  }).catch(error => {
    res.send({
      error: error.message
    });
  });
});

module.exports = router;