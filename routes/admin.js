const express = require('express');
const { makeAdmin, revokeAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Make a user an admin
router.put('/make-admin/:id', authMiddleware, adminMiddleware, makeAdmin);

// Revoke admin privileges
router.put('/revoke-admin/:id', authMiddleware, adminMiddleware, revokeAdmin);

module.exports = router;
