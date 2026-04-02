import React, { useState, useEffect } from 'react';
import {
    FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt,
    FaSignal, FaChevronLeft, FaTicketAlt, FaClock, FaTrash
} from 'react-icons/fa';

const FeedbackHistory = ({ feedbacks, onBack, onClearRequest }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState('All');

    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage, setReportsPerPage] = useState(3);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, locationFilter]);

    const locations = [
        'All',
        'Hostel',
        'Western Wing (IB Block)',
        'Eastern Wing (AS Block)',
        'Learning Center',
        'Sunflower Block',
        'Mechanical Block',
        'BIT Auditorium'
    ];
    
    const statuses = ['All', 'Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

    const filteredFeedbacks = feedbacks.filter(f => {
        const matchesSearch = f.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.comments?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
        
        let matchesLocation = locationFilter === 'All';
        if (!matchesLocation) {
            if (locationFilter === 'Hostel') {
                matchesLocation = f.placeOfIssue?.startsWith('Hostel');
            } else if (locationFilter === 'Western Wing (IB Block)') {
                matchesLocation = f.placeOfIssue === 'Western Wing (IB Block)' || f.placeOfIssue === 'IB Block';
            } else if (locationFilter === 'Eastern Wing (AS Block)') {
                matchesLocation = f.placeOfIssue === 'Eastern Wing (AS Block)' || f.placeOfIssue === 'AS Block';
            } else if (locationFilter === 'Learning Center') {
                matchesLocation = f.placeOfIssue === 'Learning Center' || f.placeOfIssue === 'Library';
            } else {
                matchesLocation = f.placeOfIssue === locationFilter;
            }
        }

        return matchesSearch && matchesStatus && matchesLocation;
    });

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredFeedbacks.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredFeedbacks.length / reportsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                        <FaChevronLeft />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Feedback History</h1>
                        <p className="text-gray-500 mt-1 font-medium">Full archive of your submitted reports and their status.</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {feedbacks.filter(f => f.status === 'Resolved').length > 0 && (
                        <button
                            onClick={onClearRequest}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all flex items-center gap-2 hover:scale-105"
                        >
                            <FaTrash /> Clear Resolved History
                        </button>
                    )}
                    <div className="relative flex-grow md:flex-grow-0 md:w-64">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search ticket ID or comments..."
                            className="input-field pl-12 pr-4 py-2 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status:</span>
                    <div className="flex gap-2">
                        {statuses.map(s => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === s ? 'bg-green-600 dark:bg-green-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden md:block"></div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location:</span>
                    <select
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs text-gray-700 dark:text-gray-300 px-3 py-1.5 focus:outline-none focus:border-green-500 font-medium"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    >
                        {locations.map(l => <option key={l} value={l} className="bg-white dark:bg-gray-900">{l}</option>)}
                    </select>
                </div>
                <div className="ml-auto text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Showing {filteredFeedbacks.length} reports
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentReports.map((f) => (
                    <div key={f._id} className="glass-card flex flex-col hover:border-green-500/40 group overflow-hidden">
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between bg-gray-50/50 dark:bg-gray-900/50 group-hover:bg-green-50/30 dark:group-hover:bg-green-500/5 transition-colors duration-300">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 text-sm border border-green-200 dark:border-green-500/20 shadow-sm">
                                    <FaTicketAlt />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1.5">{f.ticketId || '#TICKET'}</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-none capitalize">{f.issueType || 'WiFi Issue'}</p>
                                </div>
                            </div>
                            <StatusBadge status={f.status} />
                        </div>

                        <div className="p-5 space-y-4 flex-grow">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-2"><FaMapMarkerAlt /> Location</span>
                                <span className="text-xs font-bold text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">{f.placeOfIssue}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-2"><FaSignal /> Signal Strength</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md border ${f.signalStrength === 'Poor' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' : f.signalStrength === 'Average' ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20' : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20'}`}>
                                    {f.signalStrength}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-2"><FaClock /> Duration</span>
                                <span className="text-xs font-bold text-gray-900 dark:text-gray-200">{f.issueDuration || f.weakHours} Hours</span>
                            </div>

                            {f.comments && (
                                <div className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">User Comments</p>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">"{f.comments}"</p>
                                </div>
                            )}

                            {f.adminReply && (
                                <div className="p-3 bg-green-50 dark:bg-green-500/5 rounded-xl border border-green-200 dark:border-green-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                                    <p className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest mb-1.5 ml-1">Admin Response</p>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 ml-1 italic leading-relaxed font-medium">"{f.adminReply}"</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                            <span className="text-[10px] font-bold text-gray-500 flex items-center gap-2 tracking-wider">
                                <FaCalendarAlt /> {new Date(f.createdAt).toLocaleDateString()}
                            </span>
                            <button className="text-[10px] text-green-600 dark:text-green-500 font-bold uppercase tracking-widest hover:text-green-700 dark:hover:text-green-400 transition-colors">
                                View Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {filteredFeedbacks.length > 0 && totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Showing {indexOfFirstReport + 1}-{Math.min(indexOfLastReport, filteredFeedbacks.length)} of {filteredFeedbacks.length} reports
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Rows per page:</span>
                            <select 
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 px-2 py-1.5 focus:outline-none focus:border-green-500 transition-colors cursor-pointer"
                                value={reportsPerPage}
                                onChange={(e) => {
                                    setReportsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button 
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm'}`}
                            >
                                Previous
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
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm'}`}
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
                        <FaSearch className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Reports Found</h3>
                    <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </div>
    );
};

export default FeedbackHistory;
