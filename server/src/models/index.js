const { sequelize } = require('../config/database');

// Import all models
const User = require('./User');
const Project = require('./Project');
const House = require('./House');
const HouseImage = require('./HouseImage');

// Define associations
const defineAssociations = () => {
  // House and HouseImage associations
  House.hasMany(HouseImage, {
    foreignKey: 'houseId',
    as: 'images'
  });
  
  HouseImage.belongsTo(House, {
    foreignKey: 'houseId',
    as: 'house'
  });

  // Projects don't have images associations for now
  // If you add ProjectImage model later, add associations here
};

// Initialize associations
defineAssociations();

module.exports = {
  sequelize,
  User,
  Project,
  House,
  HouseImage
};