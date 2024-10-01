const jwt = require('jsonwebtoken');

// Middleware to verify token
module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Ensure correct format "Bearer <token>"
    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(400).json({ message: 'Token format is incorrect' });
    }

    try {
        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
