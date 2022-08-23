const express = require('express');
const router = express.Router();
const detailController = require('../controller/transaction_detail');
const {protect} = require('../middleware/auth');

router.get('/', protect, detailController.getAllDetail);
router.get('/:id', protect, detailController.getDetail);
router.post('/', protect, detailController.insert);
router.put('/:id',protect, detailController.updateDetail);
router.delete('/:id', protect, detailController.delete);

module.exports = router