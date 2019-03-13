'use strict';
module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
    vote: DataTypes.BOOLEAN
  }, {});
  vote.associate = function(models) {
    // Association with the user model

    vote.belongsTo(models.user, {
      foreignKey:'id_user',
      onDelete:'CASCADE'
    })
  };
  return vote;
};