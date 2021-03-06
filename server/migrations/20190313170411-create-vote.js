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
      //foreign key from users table
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
      // Foreign key from articles table
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