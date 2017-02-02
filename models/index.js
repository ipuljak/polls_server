'use strict';

const fs = require('fs')
  , path = require('path')
  , Sequelize = require('sequelize')
  , lodash = require('lodash')
  , {dbUsername, dbPassword} = require('../secrets')
  , sequelize = new Sequelize('polling_app', dbUsername, dbPassword);

let db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);