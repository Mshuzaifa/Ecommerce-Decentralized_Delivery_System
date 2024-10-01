const express = require('express');
const { registerVolunteer, setAvailability, verifyVolunteer, rateVolunteer } = require('../controllers/volunteerController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/register', authMiddleware, registerVolunteer);
router.post('/availability', authMiddleware, setAvailability);

router.put('/verify/:id', authMiddleware, adminMiddleware, verifyVolunteer);

router.post('/rate/:id', authMiddleware, rateVolunteer);

module.exports = router;
