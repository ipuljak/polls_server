'use strict';

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
        }
      }
    });
  return Poll;
};