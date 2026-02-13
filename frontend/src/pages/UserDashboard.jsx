import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FeedbackForm from '../components/FeedbackForm';
import axios from 'axios';

const UserDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get('http://localhost:5000/api/feedback/my', config);
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleNewFeedback = (newFeedback) => {
        setFeedbacks([newFeedback, ...feedbacks]);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side: Submit Feedback */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
                        <FeedbackForm onFeedbackSubmit={handleNewFeedback} />
                    </div>

                    {/* Right Side: Feedback History */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Your Feedback History</h2>
                        <div className="space-y-4">
                            {feedbacks.map((feedback) => (
                                <div key={feedback._id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${feedback.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {feedback.status}
                                        </span>
                                        <span className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm font-bold">{feedback.placeOfIssue} - {feedback.signalStrength} Signal</p>
                                    <p className="text-sm text-gray-700 mt-1">Rating: {feedback.rating}/5</p>
                                    {feedback.comments && <p className="text-sm text-gray-600 mt-2">"{feedback.comments}"</p>}
                                    {feedback.adminReply && (
                                        <div className="mt-2 bg-gray-50 p-2 rounded text-sm text-gray-800">
                                            <strong>Admin Reply:</strong> {feedback.adminReply}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {feedbacks.length === 0 && <p className="text-gray-500">No feedback submitted yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
