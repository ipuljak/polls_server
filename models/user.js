'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
      classMethods: {
        associate: (models) => {
          User.hasMany(models.Poll)
        }
      },
      instanceMethods: {
        generateHash: function (password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validPassword: function (password) {
          return bcrypt.compareSync(password, this.password);
        },
      }
    });
  return User;
};