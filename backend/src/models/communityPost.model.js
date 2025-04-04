const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommunityPost extends Model {
    static associate(models) {
      CommunityPost.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author'
      });
    }
  }

  CommunityPost.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  }, {
    sequelize,
    modelName: 'CommunityPost',
  });

  return CommunityPost;
};
