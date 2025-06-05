const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HouseImage = sequelize.define('HouseImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  houseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'house_id',
    references: {
      model: 'houses',
      key: 'id'
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'image_url'
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'kita',
    field: 'image_type'
    // Removed the ENUM to avoid conflicts - will use simple string validation
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'sort_order'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'house_images',
  underscored: true
});

module.exports = HouseImage;