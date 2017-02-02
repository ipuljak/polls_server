'use strict';

module.exports = (sequelize, DataTypes) => {
  let Poll = sequelize.define('Poll', {
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
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