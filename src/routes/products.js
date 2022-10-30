const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload')
const productController = require('../controller/products');
const {protect} = require('../middleware/auth');
// const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router.get('/search/', productController.searchProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProducts);
router.post('/', upload, productController.insertProducts);
router.put('/:id', upload, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// router.get('/search', protect, productController.search);
// router.get('/', protect, productController.getAllProducts);
// router.get('/:id', protect, hitCacheProductDetail, productController.getProducts);
// router.post('/', protect, upload.single('photo'), productController.insertProducts);
// router.put('/:id',protect, clearCacheProductDetail, upload.single('photo'), productController.updateProduct);
// router.delete('/:id', protect, clearCacheProductDetail, productController.deleteProduct);

module.exports = router