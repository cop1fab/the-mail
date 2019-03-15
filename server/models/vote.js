'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    vote: DataTypes.BOOLEAN,
    id_article: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Article',
        key: 'id',
        as: 'id_article'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'id_user'
      }
    }
  }, {});
  Vote.associate = function(models) {
    // Association with the user model

    Vote.belongsTo(models.user, {
      foreignKey:'id_user',
      onDelete:'CASCADE'
    })
    Vote.belongsTo(models.Article, {
      foreignKey: 'id_article',
      onDelete: 'CASCADE'
    })
  };
  return Vote;
};