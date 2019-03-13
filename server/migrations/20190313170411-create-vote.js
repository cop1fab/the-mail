'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vote: {
        type: Sequelize.BOOLEAN
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'users',
          key:'id',
          as:'id_user'
        }
      },
      id_article: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'articles',
          key:'id',
          as:'id_article'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('votes');
  }
};