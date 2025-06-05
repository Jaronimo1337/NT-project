const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const House = sequelize.define('House', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  area: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  totalFloors: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'total_floors'
  },
  yearBuilt: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'year_built'
  },
  houseType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'namas',
    field: 'house_type'
    // Values: 'namas', 'butas', 'vila', 'kotedžas', 'dupleksas', 'kita'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'parduodamas'
    // Values: 'parduodamas', 'rezervuotas', 'parduotas'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'sort_order'
  }
}, {
  tableName: 'houses',
  underscored: true
});

module.exports = House;