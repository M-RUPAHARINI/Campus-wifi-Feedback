const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Private (User)
router.post('/', protect, async (req, res) => {
    const { placeOfIssue, signalStrength, issueType, issueDuration, priority, issueDate, comments } = req.body;

    try {
        const feedback = new Feedback({
            userId: req.user._id,
            name: req.user.name,
            rollNumber: req.user.rollNumber,
            department: req.user.department,
            placeOfIssue,
            issueType,
            signalStrength,
            issueDuration,
            priority,
            issueDate,
            comments
        });

        const createdFeedback = await feedback.save();

        // Notify Admins
        const admins = await User.find({ role: 'admin' });
        if (admins.length > 0) {
            const notifications = admins.map(adminUser => ({
                userId: adminUser._id,
                message: `New ticket #${createdFeedback.ticketId} reported at ${placeOfIssue}.`,
                type: 'General',
                feedbackId: createdFeedback._id,
                redirectUrl: '/admin'
            }));
            await Notification.insertMany(notifications);
        }

        res.status(201).json(createdFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/feedback/my
// @desc    Get logged in user's feedback
// @access  Private (User)
router.get('/my', protect, async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ userId: req.user._id, archived: { $ne: true } }).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/feedback/my
// @desc    Clear user's feedback history
// @access  Private (User)
router.delete('/my', protect, async (req, res) => {
    try {
        await Feedback.deleteMany({ userId: req.user._id });
        res.json({ message: 'Feedback history cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/feedback
// @desc    Get all feedbacks
// @access  Private (Admin)
router.get('/', protect, admin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ archived: { $ne: true } }).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/feedback/clear-resolved
// @desc    Archive resolved feedback natively
// @access  Private
router.delete('/clear-resolved', protect, async (req, res) => {
    try {
        let condition = { status: 'Resolved' };
        if (req.user.role !== 'admin') {
            condition.userId = req.user._id;
        }
        
        const result = await Feedback.updateMany(condition, { $set: { archived: true } });
        res.json({ message: 'Resolved issues successfully archived.', count: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/feedback/:id
// @desc    Update feedback status/reply
// @access  Private (Admin)
router.put('/:id', protect, admin, async (req, res) => {
    const { status, adminReply, assignedTechnician } = req.body;

    try {
        const feedback = await Feedback.findById(req.params.id);

        if (feedback) {
            let notificationMessage = '';
            let notificationType = 'General';

            if (status && status !== feedback.status) {
                feedback.status = status;
                notificationMessage = `Your ticket #${feedback.ticketId} status has been updated to ${status}.`;
                notificationType = 'StatusUpdate';
            }
            if (adminReply) {
                feedback.adminReply = adminReply;
                notificationMessage = `Admin has replied to your ticket #${feedback.ticketId}.`;
                notificationType = 'AdminReply';
            }
            if (assignedTechnician) {
                feedback.assignedTechnician = assignedTechnician;
            }

            const updatedFeedback = await feedback.save();

            // Create notification for the user
            if (notificationMessage) {
                await Notification.create({
                    userId: feedback.userId,
                    message: notificationMessage,
                    type: notificationType,
                    feedbackId: feedback._id,
                    redirectUrl: '/dashboard'
                });
            }

            res.json(updatedFeedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
