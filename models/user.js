'use strict';

const bcrypt = require('bcrypt-nodejs');

/**
 *  USER table model
 *    id (primary key): The id of the user
 *    username: The user's username
 *    password: The user's hashed password
 */
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
        comparePasswords: (givenPassword, definedPassword, callback) => {
          bcrypt.compare(givenPassword, definedPassword, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch);
          });
        },
        associate: models => {
          User.hasMany(models.Poll);
        }
      }
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