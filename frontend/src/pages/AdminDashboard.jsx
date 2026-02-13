import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FeedbackTable from '../components/FeedbackTable';
import AnalyticsCharts from '../components/AnalyticsCharts';
import axios from 'axios';

const AdminDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get('http://localhost:5000/api/feedback', config);
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleUpdate = (updatedFeedback) => {
        setFeedbacks(feedbacks.map(f => f._id === updatedFeedback._id ? updatedFeedback : f));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h2>

                {/* Analytics Section */}
                <AnalyticsCharts feedbacks={feedbacks} />

                {/* Feedback Management Section */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback Management</h3>
                <FeedbackTable feedbacks={feedbacks} onUpdate={handleUpdate} />
            </div>
        </div>
    );
};

export default AdminDashboard;
