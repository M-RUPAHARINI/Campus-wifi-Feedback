import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ onFeedbackSubmit }) => {
    const [formData, setFormData] = useState({
        placeOfIssue: 'Library',
        signalStrength: 'Poor',
        weakHours: 1,
        rating: 1,
        comments: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://localhost:5000/api/feedback', formData, config);
            onFeedbackSubmit(response.data);
            alert('Feedback submitted successfully!');
            setFormData({
                placeOfIssue: 'Library',
                signalStrength: 'Poor',
                weakHours: 1,
                rating: 1,
                comments: ''
            });
        } catch (error) {
            console.error(error);
            alert('Error submitting feedback');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Submit Feedback</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">Place of Issue</label>
                <select name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Library</option>
                    <option>AS Block</option>
                    <option>IB Block</option>
                    <option>Sunflower Block</option>
                    <option>Hostel</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Signal Strength</label>
                <select name="signalStrength" value={formData.signalStrength} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Poor</option>
                    <option>Average</option>
                    <option>Good</option>
                    <option>Excellent</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Number of Hours WiFi is Weak</label>
                <input type="number" name="weakHours" min="1" max="24" value={formData.weakHours} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
                <textarea name="comments" rows="3" value={formData.comments} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Feedback
            </button>
        </form>
    );
};

export default FeedbackForm;
