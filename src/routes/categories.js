const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categories');
const {protect} = require('../middleware/auth');

// router.get('/search', protect, categoriesController.search);
router.get('/:id', protect, categoriesController.getCategories);
router.get('/', protect, categoriesController.getAllCategories);
router.post('/', protect, categoriesController.insertCategories);
router.put('/:id', protect, categoriesController.updateCategories);
router.delete('/:id', protect, categoriesController.deleteCategory);

module.exports = router