'use strict';
module.exports = (sequelize, DataTypes) => {
  const Try = sequelize.define('Try', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Try.associate = function(models) {
    // associations can be defined here
  };
  return Try;
};