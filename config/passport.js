const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , db = require('../models');

// Serialize Sessions - Create the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize Sessions - Read the cookie
passport.deserializeUser((user, done) => {
  db.User.find({
    where: { id: user.id }
  })
    .then((user) => {
      done(null, user);
    })
    .error((err) => {
      done(err, null);
    })
});

// For authentication purposes
passport.use(new LocalStrategy((username, password, done) => {
  db.User.find({ where: { username: username } })
    .then((user) => {
      let passwd = user ? user.password : '';
      let isMatch = db.User.validPassword(password, passwd, done, user);
    })
}));