const User = require('../models/user');

// Allow admin to promote a user to admin
exports.makeAdmin = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only admins can make other users admins
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Promote the user to admin
        user.isAdmin = true;
        await user.save();

        res.json({ message: `${user.name} is now an admin` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Allow admin to revoke admin privileges
exports.revokeAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Revoke admin privileges
        user.isAdmin = false;
        await user.save();

        res.json({ message: `${user.name} is no longer an admin` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
