'use strict';

/**
 *  POLL table model
 *    id (primary key): The id of the poll
 *    question: The full description of a poll's question
 *    UserId (foreign key): The user id that that created this poll
 */
module.exports = (sequelize, DataTypes) => {
  let Poll = sequelize.define('Poll', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      classMethods: {
        associate: models => {
          Poll.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
          Poll.hasMany(models.Option);
        }
      }
    });
  return Poll;
};