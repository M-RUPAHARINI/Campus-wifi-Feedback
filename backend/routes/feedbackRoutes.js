const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Private (User)
router.post('/', protect, async (req, res) => {
    const { placeOfIssue, signalStrength, weakHours, rating, comments } = req.body;

    try {
        const feedback = new Feedback({
            userId: req.user._id,
            name: req.user.name,
            rollNumber: req.user.rollNumber,
            department: req.user.department,
            placeOfIssue,
            signalStrength,
            weakHours,
            rating,
            comments
        });

        const createdFeedback = await feedback.save();
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
        const feedbacks = await Feedback.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/feedback
// @desc    Get all feedbacks
// @access  Private (Admin)
router.get('/', protect, admin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/feedback/:id
// @desc    Update feedback status/reply
// @access  Private (Admin)
router.put('/:id', protect, admin, async (req, res) => {
    const { status, adminReply } = req.body;

    try {
        const feedback = await Feedback.findById(req.params.id);

        if (feedback) {
            if (status) feedback.status = status;
            if (adminReply) feedback.adminReply = adminReply;

            const updatedFeedback = await feedback.save();
            res.json(updatedFeedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
