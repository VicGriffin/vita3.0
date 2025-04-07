const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmergencyRequest extends Model {
    static associate(models) {
      EmergencyRequest.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  EmergencyRequest.init({
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    recommendation: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Stores the AI model recommendation including severity, emergency level, and first aid instructions'
    }
  }, {
    sequelize,
    modelName: 'EmergencyRequest',
  });

  return EmergencyRequest;
};
