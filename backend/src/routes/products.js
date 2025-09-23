const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET /api/products - Get all products
router.get('/', productsController.getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', productsController.getProductById);

// GET /api/products/category/:categoryId - Get products by category
router.get('/category/:categoryId', productsController.getProductsByCategory);

// POST /api/products - Create new product (admin)
router.post('/', productsController.createProduct);

// PUT /api/products/:id - Update product (admin)
router.put('/:id', productsController.updateProduct);

// DELETE /api/products/:id - Delete product (admin)
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
