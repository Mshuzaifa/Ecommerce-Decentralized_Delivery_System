const Volunteer = require('../models/volunteer');
const User = require('../models/user');

// Register as a delivery volunteer
exports.registerVolunteer = async (req, res) => {
    const { verificationDocuments } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingVolunteer = await Volunteer.findOne({ userId: req.user.id });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Already registered as a volunteer' });
        }

        const newVolunteer = new Volunteer({
            userId: req.user.id,
            verificationDocuments,
        });

        await newVolunteer.save();
        res.status(201).json({ message: 'Registered as a delivery volunteer. Pending verification.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Set availability for volunteer
exports.setAvailability = async (req, res) => {
    try {
        const volunteer = await Volunteer.findOne({ userId: req.user.id });
        if (!volunteer || !volunteer.isVerified) {
            return res.status(400).json({ message: 'You are not a verified delivery volunteer.' });
        }

        volunteer.available = req.body.available;
        await volunteer.save();

        res.status(200).json({ message: `Availability set to ${volunteer.available}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Verify a volunteer (Admin only)
exports.verifyVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        volunteer.isVerified = true;
        await volunteer.save();
        res.status(200).json({ message: 'Volunteer verified successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Rate a delivery volunteer
exports.rateVolunteer = async (req, res) => {
    const { rating } = req.body;
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        // Update rating based on previous ratings and total deliveries
        volunteer.rating = ((volunteer.rating * volunteer.completedDeliveries) + rating) / (volunteer.completedDeliveries + 1);
        volunteer.completedDeliveries += 1;
        await volunteer.save();

        res.status(200).json({ message: 'Volunteer rated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
