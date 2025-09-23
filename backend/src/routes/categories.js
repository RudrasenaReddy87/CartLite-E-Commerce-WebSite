const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// GET /api/categories - Get all categories
router.get('/', categoriesController.getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', categoriesController.getCategoryById);

// POST /api/categories - Create new category (admin)
router.post('/', categoriesController.createCategory);

// PUT /api/categories/:id - Update category (admin)
router.put('/:id', categoriesController.updateCategory);

// DELETE /api/categories/:id - Delete category (admin)
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
