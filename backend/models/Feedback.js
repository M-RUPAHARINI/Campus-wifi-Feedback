const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    placeOfIssue: {
        type: String,
        required: true,
        enum: ['Library', 'AS Block', 'IB Block', 'Sunflower Block', 'Hostel']
    },
    signalStrength: {
        type: String,
        required: true,
        enum: ['Poor', 'Average', 'Good', 'Excellent']
    },
    weakHours: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    adminReply: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
