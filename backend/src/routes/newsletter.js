const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// POST /api/newsletter - Subscribe to newsletter
router.post('/', newsletterController.subscribeNewsletter);

// GET /api/newsletter - Get all subscribers (admin)
router.get('/', newsletterController.getSubscribers);

// DELETE /api/newsletter/:id - Unsubscribe from newsletter
router.delete('/:id', newsletterController.unsubscribeNewsletter);

module.exports = router;
