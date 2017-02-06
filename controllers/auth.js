const express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , Authentication = require('../middleware/authentication')
  , passportService = require('../config/passport');

// Set session to false as we are using tokens, not cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/secret', requireAuth, (req, res) => {
  res.send({ message: 'Super secret code is ABC123' });
});

router.get('/test', (req, res) => {
  res.send("Hello!");
});

router.post('/login', requireSignin, Authentication.signIn);

router.post('/register', Authentication.signUp);

module.exports = router;