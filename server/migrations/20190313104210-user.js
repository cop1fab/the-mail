'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    } ,
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    isAdmin: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    }
  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};
