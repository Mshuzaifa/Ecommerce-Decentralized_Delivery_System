const Volunteer = require('../models/volunteer');
const Order = require('../models/order');  // Assuming you have an order model

// Match available volunteers for a delivery
exports.assignDelivery = async (req, res) => {
    try {
        const availableVolunteers = await Volunteer.find({ available: true, isVerified: true });

        if (availableVolunteers.length === 0) {
            return res.status(400).json({ message: 'No available volunteers for delivery' });
        }

        const selectedVolunteer = availableVolunteers[0];  // You can implement more sophisticated matching logic here

        // Update the order to assign this volunteer
        const order = await Order.findById(req.params.orderId);
        order.assignedVolunteer = selectedVolunteer.userId;
        await order.save();

        selectedVolunteer.available = false;  // Mark volunteer as unavailable
        await selectedVolunteer.save();

        res.status(200).json({ message: 'Volunteer assigned to the delivery', volunteer: selectedVolunteer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
