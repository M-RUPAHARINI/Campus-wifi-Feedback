import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import {
    FaSearch, FaFilter, FaUserPlus, FaReply,
    FaCheckCircle, FaExclamationCircle, FaSignal,
    FaRegEye, FaChevronDown, FaTicketAlt, FaTable
} from 'react-icons/fa';

const FeedbackTable = ({ feedbacks, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [expandedRow, setExpandedRow] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage, setTicketsPerPage] = useState(5);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus]);

    const handleUpdateField = async (id, field, value) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.put(`${API_URL}/api/feedback/${id}`, { [field]: value }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onUpdate(data);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };

    const filteredFeedbacks = feedbacks.filter(f => {
        const matchesSearch = f.placeOfIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (f.ticketId && f.ticketId.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || f.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredFeedbacks.slice(indexOfFirstTicket, indexOfLastTicket);
    const totalPages = Math.ceil(filteredFeedbacks.length / ticketsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
            default: return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20';
        }
    };

    const StatusBadge = ({ status }) => {
        const badgeClassMap = {
            'Resolved': 'status-resolved',
            'Pending': 'status-pending',
            'In Progress': 'status-in-progress',
            'Assigned': 'status-assigned',
            'Closed': 'status-closed'
        };
        const badgeClass = badgeClassMap[status] || 'status-pending';
        return (
            <span className={`status-badge ${badgeClass}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Search and Quick Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by Ticket ID, Name, or Place..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-12"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Pending', 'In Progress', 'Resolved'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${filterStatus === s ? 'bg-green-600 dark:bg-green-500 text-white border-green-600 dark:border-green-500 shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modern Table Card */}
            <div className="glass-card">
                <div className="w-full overflow-x-auto md:overflow-visible min-h-[160px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Ticket / User</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Issue Details</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Priority</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Assignment</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {currentTickets.map((f) => (
                                <React.Fragment key={f._id}>
                                    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group ${expandedRow === f._id ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 border border-gray-200 dark:border-gray-700">
                                                    <FaTicketAlt className="text-sm" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-extrabold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors capitalize">{f.ticketId || '#TICKET'}</p>
                                                    <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">{f.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-gray-800 dark:text-gray-200 capitalize">{f.issueType || 'WiFi Issue'}</span>
                                                <span className="text-[10px] font-semibold text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
                                                    <FaSignal className="text-green-500/70" /> {f.placeOfIssue}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${getPriorityColor(f.priority)}`}>
                                                {f.priority || 'Low'}
                                            </span>
                                        </td>
                                        <td className="p-5 relative">
                                            <select
                                                value={f.assignedTechnician || ''}
                                                onChange={(e) => handleUpdateField(f._id, 'assignedTechnician', e.target.value)}
                                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px] font-bold text-gray-700 dark:text-gray-300 px-3 py-1.5 focus:outline-none focus:border-green-500 uppercase tracking-widest cursor-pointer relative z-40"
                                            >
                                                <option value="" className="bg-white dark:bg-gray-900">UNASSIGNED</option>
                                                <option value="Admin Team" className="bg-white dark:bg-gray-900">ADMIN TEAM</option>
                                                <option value="Network Unit A" className="bg-white dark:bg-gray-900">UNIT A</option>
                                                <option value="Tech Support B" className="bg-white dark:bg-gray-900">UNIT B</option>
                                            </select>
                                        </td>
                                        <td className="p-5 relative">
                                            <div className="flex items-center gap-2">
                                                <StatusBadge status={f.status} />
                                                <div className="relative">
                                                    <button 
                                                        onClick={() => setExpandedRow(expandedRow === `status-${f._id}` ? null : `status-${f._id}`)}
                                                        className="p-1 focus:outline-none"
                                                    >
                                                        <FaChevronDown className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer transition-colors" />
                                                    </button>
                                                    {expandedRow === `status-${f._id}` && (
                                                        <>
                                                            <div 
                                                                className="fixed inset-0 z-40"
                                                                onClick={() => setExpandedRow(null)}
                                                            ></div>
                                                            <div className="absolute top-full mt-1 left-0 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 shadow-2xl rounded-xl py-1 overflow-hidden">
                                                                {['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'].map(s => (
                                                                    <button
                                                                        key={s}
                                                                        onClick={() => {
                                                                            handleUpdateField(f._id, 'status', s);
                                                                            setExpandedRow(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-none"
                                                                    >
                                                                        {s}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right relative">
                                            <button
                                                onClick={() => setExpandedRow(expandedRow === f._id ? null : f._id)}
                                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all shadow-sm"
                                            >
                                                <FaRegEye />
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Expanded Row Content */}
                                    {expandedRow === f._id && (
                                        <tr className="bg-gray-50/50 dark:bg-gray-900/40">
                                            <td colSpan="6" className="p-8 border-b border-gray-200 dark:border-gray-800">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Problem Description</h4>
                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm leading-relaxed italic">
                                                            "{f.comments || 'No description provided.'}"
                                                        </p>
                                                        <div className="flex items-center gap-6 mt-4">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Signal strength</p>
                                                                <p className="text-xs font-bold text-gray-900 dark:text-white">{f.signalStrength}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Duration</p>
                                                                <p className="text-xs font-bold text-gray-900 dark:text-white">{f.issueDuration || f.weakHours} Hours</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Rating</p>
                                                                <p className="text-xs font-bold text-green-600 dark:text-green-500">{f.rating}/5</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest flex items-center gap-2">
                                                            <FaReply /> Official Response
                                                        </h4>
                                                        <textarea
                                                            className="input-field py-3 min-h-[100px] resize-none text-sm font-medium"
                                                            placeholder="Initial response to student..."
                                                            defaultValue={f.adminReply || ''}
                                                            onBlur={(e) => handleUpdateField(f._id, 'adminReply', e.target.value)}
                                                        ></textarea>
                                                        <div className="flex justify-end gap-3 mt-4">
                                                            <button className="px-6 py-2.5 bg-green-600 dark:bg-green-500 text-white dark:text-black text-[10px] font-extrabold uppercase tracking-widest rounded-xl shadow-md hover:-translate-y-0.5 transition-all">
                                                                Save & Notify
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {filteredFeedbacks.length > 0 && totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 glass-card border-t border-gray-200 dark:border-gray-800">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Showing {indexOfFirstTicket + 1}-{Math.min(indexOfLastTicket, filteredFeedbacks.length)} of {filteredFeedbacks.length} tickets
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rows per page:</span>
                            <select 
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 px-2 py-1.5 focus:outline-none focus:border-green-500 transition-colors cursor-pointer shadow-sm"
                                value={ticketsPerPage}
                                onChange={(e) => {
                                    setTicketsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button 
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 border-transparent' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm'}`}
                            >
                                Prev
                            </button>
                            
                            <div className="hidden sm:flex items-center gap-1.5 mx-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${currentPage === i + 1 ? 'bg-green-600 text-white shadow-[0_4px_12px_rgba(22,163,74,0.3)] border-transparent' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 border-transparent' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {filteredFeedbacks.length === 0 && (
                <div className="glass-card p-20 text-center border-dashed border-2">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                        <FaTable className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Reports Found</h3>
                    <p className="text-gray-500 font-medium">No matching tickets align with your current filters.</p>
                </div>
            )}
        </div>
    );
};

export default FeedbackTable;
