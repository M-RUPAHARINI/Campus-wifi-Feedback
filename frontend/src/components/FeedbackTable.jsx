import React, { useState } from 'react';
import axios from 'axios';

const FeedbackTable = ({ feedbacks, onUpdate }) => {
    const [statusFilter, setStatusFilter] = useState('All');

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.put(`http://localhost:5000/api/feedback/${id}`, { status: newStatus }, config);
            onUpdate(data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleReplyChange = async (id, reply) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.put(`http://localhost:5000/api/feedback/${id}`, { adminReply: reply }, config);
            onUpdate(data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const filteredFeedbacks = statusFilter === 'All'
        ? feedbacks
        : feedbacks.filter(f => f.status === statusFilter);

    return (
        <div className="flex flex-col">
            <div className="mb-4">
                <label className="mr-2 font-medium">Filter by Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-1"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place/Signal</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Reply</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredFeedbacks.map((feedback) => (
                                    <tr key={feedback._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{feedback.name}</div>
                                            <div className="text-sm text-gray-500">{feedback.department}</div>
                                            <div className="text-sm text-gray-500">{feedback.rollNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{feedback.placeOfIssue}</div>
                                            <div className="text-sm text-gray-500">{feedback.signalStrength}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {feedback.rating}/5
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${feedback.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                    feedback.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {feedback.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <select
                                                value={feedback.status}
                                                onChange={(e) => handleStatusChange(feedback._id, e.target.value)}
                                                className="border border-gray-300 rounded-md text-sm p-1"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <input
                                                type="text"
                                                defaultValue={feedback.adminReply}
                                                onBlur={(e) => handleReplyChange(feedback._id, e.target.value)}
                                                placeholder="Reply..."
                                                className="border border-gray-300 rounded-md text-sm p-1 w-full"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackTable;
