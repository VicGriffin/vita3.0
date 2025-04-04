const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MedicalProfile extends Model {
    static associate(models) {
      MedicalProfile.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  MedicalProfile.init({
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
    bloodType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    medications: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    chronicConditions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    emergencyContacts: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'MedicalProfile',
  });

  return MedicalProfile;
};
