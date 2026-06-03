const express = require('express');
const router = express.Router();
const { SiteContent } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const defaultSiteContent = require('../data/defaultSiteContent');

const seedSiteContent = async () => {
  for (const item of defaultSiteContent) {
    const existing = await SiteContent.findByPk(item.key);
    if (!existing) {
      await SiteContent.create(item);
    }
  }
};

router.get('/', async (req, res) => {
  try {
    const rows = await SiteContent.findAll({ order: [['content_group', 'ASC'], ['key', 'ASC']] });
    const data = {};
    rows.forEach((row) => {
      data[row.key] = row.value;
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch site content' });
  }
});

router.get('/admin', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const rows = await SiteContent.findAll({ order: [['content_group', 'ASC'], ['key', 'ASC']] });
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching admin site content:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch site content' });
  }
});

router.put('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Items array is required' });
    }

    for (const item of items) {
      if (!item.key) continue;
      const [row] = await SiteContent.findOrCreate({
        where: { key: item.key },
        defaults: {
          key: item.key,
          value: item.value ?? '',
          group: item.group || 'general',
          label: item.label || item.key
        }
      });
      await row.update({
        value: item.value ?? '',
        ...(item.group ? { group: item.group } : {}),
        ...(item.label ? { label: item.label } : {})
      });
    }

    const rows = await SiteContent.findAll();
    const data = {};
    rows.forEach((row) => {
      data[row.key] = row.value;
    });

    res.json({ success: true, message: 'Site content updated', data });
  } catch (error) {
    console.error('Error updating site content:', error);
    res.status(500).json({ success: false, message: 'Failed to update site content' });
  }
});

module.exports = router;
module.exports.seedSiteContent = seedSiteContent;
