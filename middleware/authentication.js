const jwt = require('jwt-simple')
  , db = require('../models')
  , {passportSecret} = require('../secrets');

// Encode a token for the user
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, passportSecret);
};

// Middleware that sends the user their token and user id to sign them in
exports.signIn = (req, res, next) => {
  res.send({ 
    token: tokenForUser(req.user),
    UserId: req.user.id
  });
};

// Middleware that signs a user up and registers them in the database
exports.signUp = (req, res, next) => {
  const username = req.body.username
    , password = req.body.password;
  // Check and see if a user with the requested name already exists
  db.User.findOne({ where: { username: username } })
    .then(existingUser => {
      // If a user with the username does exist, return an error to the user
      if (existingUser) {
        return res.status(422).send({ error: 'Username is in use.' });
      }
      // If a user with username does not exist, create and save the user
      const user = {
        username: username,
        password: password
      };

      db.User.create(user)
        .then(created => {
          res.send({ 
            token: tokenForUser(user),
            UserId: created.dataValues.id
          });
        })
        .catch(error => {
          return next(error);
        });
    })
    .catch(error => {
      return next(error);
    });
};