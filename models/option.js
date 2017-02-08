'use strict';

/**
 *  OPTION table model
 *    id (primary key): The id of the option
 *    option: The full description of a poll's option
 *    votes: The number of votes an option has
 *    color: A randomized RGB color to use to display on the client side
 *    PollId (foreign key): The poll id that this option is associated with
 */
module.exports = (sequelize, DataTypes) => {
  let Option = sequelize.define('Option', {
    option: {
      type: DataTypes.STRING,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      classMethods: {
        associate: models => {
          Option.belongsTo(models.Poll, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });
  return Option;
};