const jwt = require('jwt-simple')
  , db = require('../models')
  , {passportSecret} = require('../secrets');

// Encode a token for the user
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, passportSecret);
};

// Middleware that sends the user their token to sign them in
exports.signIn = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// Mideelware that signs a user up and registers them in the database
exports.signUp = (req, res, next) => {
  // Check and see if a user with the requested name already exists
  db.User.findOne({ username: username }, (err, existingUser) => {
    if (err) return next(err);
    // If a user with the username does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Username is in use.' });
    }
    // If a user with username does not exist, create and save the user
    const user = {
      username: username,
      password: password
    };
    db.User.create(user)
      .then(() => {
        res.json( {token: tokenForUser(user) });
      })
      .catch((error) => {
        return next(error);
      });
  });
};