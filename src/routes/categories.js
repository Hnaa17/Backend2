const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categories');
const {protect} = require('../middleware/auth');
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router.get('/search', protect, categoriesController.search);
router.get('/:id', protect, hitCacheProductDetail,categoriesController.getCategories);
router.get('/', protect, categoriesController.getAllCategories);
router.post('/', protect, categoriesController.insertCategories);
router.put('/:id', protect, clearCacheProductDetail,categoriesController.updateCategories);
router.delete('/:id', protect, clearCacheProductDetail,categoriesController.deleteCategory);

module.exports = router