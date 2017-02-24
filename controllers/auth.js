// Root URL: http://localhost:3010/api/auth

const express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , Authentication = require('../middleware/authentication')
  , passportService = require('../config/passport');

// Set session to false as we are using tokens, not cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// A secret page to test authentication
router.get('/secret', requireAuth, (req, res) => {
  res.send({ message: 'Super secret code is ABC123' });
});

/**
 *  POST route /login
 *    Logs the user in
 *    Requirements
 *      body.username -> The username of the account you wish to authenticate
 *      body.password -> The password of the account you wish to authenticate
 *    Returns a JWT token upon a successful login, otherwise an error
 */
router.post('/login', requireSignin, Authentication.signIn);

/**
 *  POST route /register
 *    Creates a user
 *    Requirements
 *      body.username -> The username of the new account you wish to register
 *      body.password -> The password of the new account you wish to reigster
 *    Returns a JWT token upon a successful register, otherwise an error
 */
router.post('/register', Authentication.signUp);

module.exports = router;