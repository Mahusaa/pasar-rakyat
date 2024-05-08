const express = require('express');
const router = express.Router();
const { updateStockController } = require('../controller/controllers');

router.post('/update-stock', updateStockController);

module.exports = router;
