const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Log the email being used for login
        console.log('Login attempt with email:', email);

        // Find the user by email
        const user = await User.findOne({ email });
        
        // Log the user object (or null if not found)
        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials - User not found' });
        }

        // Compare the provided password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);

        // Log whether the password matches
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials - Password mismatch' });
        }

        // Generate a JWT token if authentication is successful
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Log the token
        console.log('Generated JWT token:', token);

        // Send the token as the response
        res.json({ token });
    } catch (err) {
        // Log the error for debugging
        console.error('Login error:', err);
        res.status(500).json({ message: err.message });
    }
};


// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update user profile
// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use deleteOne or findByIdAndDelete to remove the user
        await User.deleteOne({ _id: req.user.id });
        // Alternatively, you can use:
        // await User.findByIdAndDelete(req.user.id);

        res.json({ message: 'User removed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


