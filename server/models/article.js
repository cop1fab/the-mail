'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Article.associate = function(models) {
    // Association with the vote model

    Article.hasMany(models.vote, {
      foreignKey:'id_article',
      as:'votes'
    })
  };
  return Article;
};