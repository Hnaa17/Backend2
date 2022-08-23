const express = require('express');
const router = express.Router();
const sellerController = require('../controller/seller');
const {protect} = require('../middleware/auth');

router.get('/search', protect, sellerController.search);
router.get('/', protect, sellerController.getAllSeller);
router.get('/:id', protect, sellerController.getSeller);
router.post('/', protect, sellerController.insertSeller);
router.put('/:id', protect, sellerController.updateSeller);
router.delete('/:id', protect, sellerController.deleteSeller);

module.exports = router