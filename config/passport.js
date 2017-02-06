const passport = require('passport')
  , JwtStrategy = require('passport-jwt').Strategy
  , ExtractJwt = require('passport-jwt').ExtractJwt
  , LocalStrategy = require('passport-local')
  , db = require('../models')
  , {passportSecret} = require('../secrets');

// Create local Strategy
const localOptions = { usernameField: 'username' };

const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  // Verify the username and password, callback done with the user info
  db.User.findOne({ where: { username: username } })
    .then(existingUser => {
      if (!existingUser) return done(null, false);
      // Compare the passwords
      const userPassword = existingUser.dataValues.password;
      existingUser.comparePasswords(password, userPassword, (err, isMatch) => {
        if (err) return done(err);
        isMatch ? done(null, existingUser) : done(null, false);
      });
    }).catch(err => {
      return done(err);
    });
});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: passportSecret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  db.User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    user ? done(null, user) : done(null, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);