const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isVerified: { type: Boolean, default: false },
    available: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    completedDeliveries: { type: Number, default: 0 },
    verificationDocuments: { type: String, required: true }, // Path to verification documents
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
