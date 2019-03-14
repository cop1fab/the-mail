'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    tags: DataTypes.ARRAY(DataTypes.STRING),
  }, {});
  Article.associate = function(models) {
    // Association with the vote model

    Article.hasMany(models.Vote, {
      foreignKey: 'id_article',
      as: 'votes'
    });

    Article.hasMany(models.Comment, {
      foreignKey: 'id_comment',
      as: 'comments'
    });
  };
  return Article;
};
