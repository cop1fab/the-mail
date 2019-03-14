export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
