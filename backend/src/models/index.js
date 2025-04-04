const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import models
const User = require('./user.model')(sequelize, Sequelize.DataTypes);
const MedicalProfile = require('./medicalProfile.model')(sequelize, Sequelize.DataTypes);
const EmergencyRequest = require('./emergencyRequest.model')(sequelize, Sequelize.DataTypes);
const CommunityPost = require('./communityPost.model')(sequelize, Sequelize.DataTypes);
const Reminder = require('./reminder.model')(sequelize, Sequelize.DataTypes);

// Add models to db object
db.User = User;
db.MedicalProfile = MedicalProfile;
db.EmergencyRequest = EmergencyRequest;
db.CommunityPost = CommunityPost;
db.Reminder = Reminder;

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
