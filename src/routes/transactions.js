const express = require('express');
const router = express.Router();
const transactionsController = require('../controller/transactions');
const {protect} = require('../middleware/auth');

router.get('/', protect, transactionsController.getAllTransactions);
router.get('/:id', protect, transactionsController.getTransactions);
router.post('/', protect, transactionsController.insert);
router.put('/:id',protect, transactionsController.updateTransactions);
router.delete('/:id', protect, transactionsController.delete);

module.exports = router