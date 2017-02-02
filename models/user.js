'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
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
        }
      }
      // instanceMethods: {
      //   generateHash: function (password) {
      //     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      //   },
      //   validPassword: function (password) {
      //     return bcrypt.compareSync(password, this.password);
      //   }
      // }
    });

  User.hook('beforeCreate', (user, fn) => {
    let salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      return salt;
    });
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return fn(null, user);
    })
  });
  return User;
};