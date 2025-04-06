const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations
      User.hasOne(models.MedicalProfile, {
        foreignKey: 'userId',
        as: 'medicalProfile'
      });
      User.hasMany(models.EmergencyRequest, {
        foreignKey: 'userId',
        as: 'emergencyRequests'
      });
      User.hasMany(models.CommunityPost, {
        foreignKey: 'userId',
        as: 'posts'
      });
      User.hasMany(models.Reminder, {
        foreignKey: 'userId',
        as: 'reminders'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'doctor', 'patient'),
      defaultValue: 'patient',
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {
        notifications: true,
        theme: 'light',
        language: 'en',
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
