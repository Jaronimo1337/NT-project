const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { House, HouseImage } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

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

// GET /api/houses - Get all houses with images (public)
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

// GET /api/houses/all - Get all houses including inactive (admin only)
router.get('/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const houses = await House.findAll({
      include: [{
        model: HouseImage,
        as: 'images',
        required: false,
        order: [['sortOrder', 'ASC']]
      }],
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: houses,
      count: houses.length
    });
  } catch (error) {
    console.error('Error fetching all houses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch houses'
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

// POST /api/houses - Create new house with images (admin only)
router.post('/', authenticateToken, requireAdmin, upload.array('images', 10), async (req, res) => {
  try {
    console.log('📝 Creating house with data:', req.body);
    console.log('📷 Files received:', req.files?.length || 0);

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

    // Create house data object
    const houseData = {
      title,
      address: req.body.address || '',
      price: parseFloat(req.body.price),
      area: req.body.area ? parseInt(req.body.area) : null,
      rooms: req.body.rooms ? parseInt(req.body.rooms) : null,
      bedrooms: req.body.bedrooms ? parseInt(req.body.bedrooms) : null,
      bathrooms: req.body.bathrooms ? parseInt(req.body.bathrooms) : null,
      floor: req.body.floor ? parseInt(req.body.floor) : null,
      totalFloors: req.body.totalFloors ? parseInt(req.body.totalFloors) : null,
      yearBuilt: req.body.yearBuilt ? parseInt(req.body.yearBuilt) : null,
      houseType: req.body.houseType || 'namas',
      status: req.body.status || 'parduodamas',
      description: req.body.description || '',
      sortOrder: req.body.sortOrder ? parseInt(req.body.sortOrder) : 0,
      isActive: true
    };

    // Create the house
    const house = await House.create(houseData);
    console.log('✅ House created with ID:', house.id);

    // Handle image uploads if any
    if (req.files && req.files.length > 0) {
      console.log('📷 Processing images...');
      
      const imagePromises = req.files.map((file, index) => {
        return HouseImage.create({
          houseId: house.id,
          imageUrl: `/uploads/houses/${file.filename}`,
          caption: `Namo nuotrauka ${index + 1}`,
          imageType: 'kita',
          sortOrder: index,
          isActive: true
        });
      });

      await Promise.all(imagePromises);
      console.log(`✅ Created ${req.files.length} images for house ${house.id}`);
    }

    // Fetch the complete house with images for response
    const completeHouse = await House.findByPk(house.id, {
      include: [{
        model: HouseImage,
        as: 'images',
        where: { isActive: true },
        required: false,
        order: [['sortOrder', 'ASC']]
      }]
    });

    res.status(201).json({
      success: true,
      message: 'House created successfully',
      data: completeHouse
    });
  } catch (error) {
    console.error('Error creating house:', error);
    
    // Clean up uploaded files if house creation failed
    if (req.files) {
      req.files.forEach(file => {
        const filePath = path.join(__dirname, '../../uploads/houses', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

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

// PUT /api/houses/:id - Update house (admin only)
router.put('/:id(\\d+)', authenticateToken, requireAdmin, upload.array('images', 10), async (req, res) => {
  try {
    const house = await House.findByPk(req.params.id);
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found'
      });
    }

    // Update house data
    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.address !== undefined) updateData.address = req.body.address;
    if (req.body.price) updateData.price = parseFloat(req.body.price);
    if (req.body.area !== undefined) updateData.area = req.body.area ? parseInt(req.body.area) : null;
    if (req.body.rooms !== undefined) updateData.rooms = req.body.rooms ? parseInt(req.body.rooms) : null;
    if (req.body.bedrooms !== undefined) updateData.bedrooms = req.body.bedrooms ? parseInt(req.body.bedrooms) : null;
    if (req.body.bathrooms !== undefined) updateData.bathrooms = req.body.bathrooms ? parseInt(req.body.bathrooms) : null;
    if (req.body.floor !== undefined) updateData.floor = req.body.floor ? parseInt(req.body.floor) : null;
    if (req.body.totalFloors !== undefined) updateData.totalFloors = req.body.totalFloors ? parseInt(req.body.totalFloors) : null;
    if (req.body.yearBuilt !== undefined) updateData.yearBuilt = req.body.yearBuilt ? parseInt(req.body.yearBuilt) : null;
    if (req.body.houseType) updateData.houseType = req.body.houseType;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.sortOrder !== undefined) updateData.sortOrder = parseInt(req.body.sortOrder);
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true';

    await house.update(updateData);

    // Handle new image uploads if any
    if (req.files && req.files.length > 0) {
      // Get current max sort order
      const existingImages = await HouseImage.findAll({
        where: { houseId: house.id, isActive: true },
        order: [['sortOrder', 'DESC']],
        limit: 1
      });
      
      const startSortOrder = existingImages.length > 0 ? existingImages[0].sortOrder + 1 : 0;

      const imagePromises = req.files.map((file, index) => {
        return HouseImage.create({
          houseId: house.id,
          imageUrl: `/uploads/houses/${file.filename}`,
          caption: `Namo nuotrauka ${startSortOrder + index + 1}`,
          imageType: 'kita',
          sortOrder: startSortOrder + index,
          isActive: true
        });
      });

      await Promise.all(imagePromises);
    }

    // Fetch updated house with images
    const updatedHouse = await House.findByPk(house.id, {
      include: [{
        model: HouseImage,
        as: 'images',
        where: { isActive: true },
        required: false,
        order: [['sortOrder', 'ASC']]
      }]
    });
    
    res.json({
      success: true,
      message: 'House updated successfully',
      data: updatedHouse
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

// DELETE /api/houses/:id - Delete house (soft delete, admin only)
router.delete('/:id(\\d+)', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const house = await House.findByPk(req.params.id);
    
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found'
      });
    }

    // Soft delete house and its images
    await house.update({ isActive: false });
    await HouseImage.update(
      { isActive: false },
      { where: { houseId: house.id } }
    );
    
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

// DELETE /api/houses/:id/images/:imageId - Delete specific image (admin only)
router.delete('/:id(\\d+)/images/:imageId(\\d+)', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const image = await HouseImage.findOne({
      where: {
        id: req.params.imageId,
        houseId: req.params.id
      }
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete physical file
    const imagePath = path.join(__dirname, '../../', image.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete from database
    await image.destroy();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image'
    });
  }
});

module.exports = router;