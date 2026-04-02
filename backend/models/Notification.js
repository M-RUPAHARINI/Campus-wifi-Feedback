const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['StatusUpdate', 'AdminReply', 'General'],
        default: 'General'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    feedbackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    },
    redirectUrl: {
        type: String,
        default: '/'
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
