'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      articleId: {
        type: Sequelize.INTEGER,
        OnDelete: 'CASCADE',
        references: {
          model: 'articles',
          key: 'id',
          as: 'id_article'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        OnDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'id_user'
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
    return queryInterface.dropTable('comments');
  }
};