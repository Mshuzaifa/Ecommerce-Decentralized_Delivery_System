const express = require('express');
const { register, login, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authMiddleware, getUserProfile);  // Protected
router.put('/profile', authMiddleware, updateUserProfile); // Protected
router.delete('/profile', authMiddleware, deleteUser); // Protected

module.exports = router;
