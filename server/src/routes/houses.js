const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { House, HouseImage } = require('../models');

// Configure multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/houses';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// GET /api/houses - Get all houses with images
router.get('/', async (req, res) => {
  const requestId = Date.now();
  console.log(`🔍 [${requestId}] GET /api/houses - Request received`);
  
  try {
    const houses = await House.findAll({
      include: [{
        model: HouseImage,
        as: 'images',
        where: { isActive: true },
        required: false,
        order: [['sortOrder', 'ASC']]
      }],
      where: { isActive: true },
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    console.log(`✅ [${requestId}] Houses fetched: ${houses.length} houses`);

    res.json({
      success: true,
      data: houses,
      count: houses.length
    });
  } catch (error) {
    console.error(`❌ [${requestId}] Error fetching houses:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch houses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/houses/:id - Get single house with images (only for numeric IDs)
router.get('/:id(\\d+)', async (req, res) => {
  try {
    const house = await House.findByPk(req.params.id, {
      include: [{
        model: HouseImage,
        as: 'images',
        where: { isActive: true },
        required: false,
        order: [['sortOrder', 'ASC']]
      }]
    });

    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found'
      });
    }

    res.json({
      success: true,
      data: house
    });
  } catch (error) {
    console.error('Error fetching house:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch house'
    });
  }
});

// POST /api/houses - Create new house
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { title, price } = req.body;
    
    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: 'Title and price are required fields',
        missingFields: {
          title: !title ? 'Title is required' : null,
          price: !price ? 'Price is required' : null
        }
      });
    }

    const house = await House.create(req.body);
    res.status(201).json({
      success: true,
      data: house
    });
  } catch (error) {
    console.error('Error creating house:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create house',
      error: error.message,
      details: error.errors ? error.errors.map(e => ({
        field: e.path,
        message: e.message
      })) : null
    });
  }
});

// PUT /api/houses/:id - Update house
router.put('/:id(\\d+)', async (req, res) => {
  try {
    const house = await House.findByPk(req.params.id);
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found'
      });
    }

    await house.update(req.body);
    
    res.json({
      success: true,
      data: house
    });
  } catch (error) {
    console.error('Error updating house:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update house',
      error: error.message
    });
  }
});

// DELETE /api/houses/:id - Delete house (soft delete)
router.delete('/:id(\\d+)', async (req, res) => {
  try {
    const house = await House.findByPk(req.params.id);
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found'
      });
    }

    await house.update({ isActive: false });
    
    res.json({
      success: true,
      message: 'House deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting house:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete house'
    });
  }
});

module.exports = router;