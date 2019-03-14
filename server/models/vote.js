'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('vote', {
    vote: DataTypes.BOOLEAN
  }, {});
  Vote.associate = function(models) {
    // Association with the user model

    Vote.belongsTo(models.user, {
      foreignKey:'id_user',
      onDelete:'CASCADE'
    })
  };
  return Vote;
};