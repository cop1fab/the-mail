'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};