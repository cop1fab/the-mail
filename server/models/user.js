'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // Association with the vote model

    User.hasMany(models.Vote, {
      foreignKey: 'id_user',
      as: 'votes'
    });

    User.hasMany(models.Comment, {
      foreignKey: 'id_comment',
      as: 'comments'
    })
  };
  return User;
};