const express = require('express');
const { assignDelivery } = require('../controllers/deliveryController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/assign/:orderId', authMiddleware, adminMiddleware, assignDelivery);

module.exports = router;
