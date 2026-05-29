const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SiteContent = sequelize.define('SiteContent', {
  key: {
    type: DataTypes.STRING(120),
    primaryKey: true,
    allowNull: false
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  group: {
    type: DataTypes.STRING(60),
    allowNull: false,
    defaultValue: 'general',
    field: 'content_group'
  },
  label: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: ''
  }
}, {
  tableName: 'site_content',
  timestamps: true
});

module.exports = SiteContent;
