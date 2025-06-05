const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project'); // Fixed: was importing House
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/projects';
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

// GET /api/projects - Get all active projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/projects/all - Get all projects including inactive (admin only)
router.get('/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['sort_order', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id(\\d+)', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

// POST /api/projects - Create new project with image (admin only)
router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, category, return_rate, description, sort_order } = req.body;

    if (!title || !category || !return_rate) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and return rate are required',
        missingFields: {
          title: !title ? 'Title is required' : null,
          category: !category ? 'Category is required' : null,
          return_rate: !return_rate ? 'Return rate is required' : null
        }
      });
    }

    const projectData = {
      title,
      category,
      return_rate,
      description,
      sort_order: sort_order ? parseInt(sort_order) : 0
    };

    // Add image URL if file was uploaded
    if (req.file) {
      projectData.image_url = `/uploads/projects/${req.file.filename}`;
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project: ' + error.message
    });
  }
});

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id(\\d+)', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const { title, category, return_rate, description, sort_order, is_active } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (return_rate) updateData.return_rate = return_rate;
    if (description !== undefined) updateData.description = description;
    if (sort_order !== undefined) updateData.sort_order = parseInt(sort_order);
    if (is_active !== undefined) updateData.is_active = is_active === 'true';

    if (req.file) {
      // Delete old image if exists
      if (project.image_url) {
        const oldImagePath = path.join(__dirname, '../../', project.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image_url = `/uploads/projects/${req.file.filename}`;
    }

    await project.update(updateData);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id(\\d+)', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete image file if exists
    if (project.image_url) {
      const imagePath = path.join(__dirname, '../../', project.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

module.exports = router;