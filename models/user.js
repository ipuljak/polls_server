'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
      classMethods: {
        associate: (models) => {
          User.hasMany(models.Poll)
        },
        validPassword: (password, passwd, done, user) => {
          bcrypt.compare(password, passwd, (err, isMatch) => {
            if (err) console.log(err);
            // If the passwords match, provide done callback with the user object
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        },
      }
    }, {
      dialect: 'mysql'
    });

  // Before the user is created, hash the password through the hook
  User.hook('beforeCreate', (user, {}, fn) => {
    let salt = bcrypt.genSalt(12, (err, salt) => {
      return salt;
    });
    // bcrypt to generate the hash
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return fn(null, user);
    })
  });
  return User;
};