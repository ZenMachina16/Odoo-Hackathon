const express = require('express');
const Tag = require('../models/Tag');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tags
// @desc    List all tags
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });

    res.json({
      success: true,
      tags
    });
  } catch (error) {
    console.error('Get tags error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tags'
    });
  }
});

// @route   POST /api/tags
// @desc    Create a new tag
// @access  Admin only
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Tag name is required'
      });
    }

    // Check if tag already exists
    const existingTag = await Tag.findOne({ name: name.toLowerCase().trim() });
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: 'Tag already exists'
      });
    }

    // Create new tag
    const tag = await Tag.create({
      name: name.toLowerCase().trim()
    });

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      tag
    });
  } catch (error) {
    console.error('Create tag error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while creating tag'
    });
  }
});

module.exports = router; 