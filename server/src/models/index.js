const { sequelize } = require('../config/database');

// Import all models
const User = require('./User');
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
};

// Initialize associations
defineAssociations();

module.exports = {
  sequelize,
  User,
  House,
  HouseImage
};