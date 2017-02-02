const express = require('express')
  , router = express.Router()
  , models = require('../models');

// POST route to create a new user
router.post('/create', (req, res) => {
  // Sync the model with the database
  models.sequelize.sync().then(() => {
    // Create the user
    models.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(() => {
      // Return a success string if the user is created
      res.send({
        success: 'User ' + req.body.username + ' added.'
      });
    }).catch((error) => {
      // Return any errors that popped up
      res.send({
        error: error.message + ': ' + error.errors[0].message
      });
    });
  });
});

module.exports = router;