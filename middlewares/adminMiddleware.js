// Dummy middleware assuming you have a role-based system
module.exports = function (req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
