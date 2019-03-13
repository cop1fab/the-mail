'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // Association with the vote model

    user.hasMany(models.vote, {
      foreignKey:'id_user',
      as:'votes'
    })
  };
  return user;
};