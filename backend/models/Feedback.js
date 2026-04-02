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
        required: true
    },
    issueType: {
        type: String,
        required: true,
        enum: ['Slow Internet', 'No Connection', 'Weak Signal', 'Frequent Disconnection', 'Login Issue']
    },
    signalStrength: {
        type: String,
        required: true,
        enum: ['Poor', 'Average', 'Good']
    },
    issueDuration: {
        type: Number,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    ticketId: {
        type: String,
        unique: true
    },
    assignedTechnician: {
        type: String
    },
    comments: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
        default: 'Pending'
    },
    adminReply: {
        type: String
    },
    archived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Generate Ticket ID before saving
feedbackSchema.pre('save', async function () {
    if (!this.ticketId) {
        const count = await mongoose.model('Feedback').countDocuments();
        this.ticketId = `WIFI-${1000 + count + 1}`;
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
