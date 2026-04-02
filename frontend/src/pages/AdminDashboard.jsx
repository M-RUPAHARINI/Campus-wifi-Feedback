import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FeedbackTable from '../components/FeedbackTable';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import { StatusPieChart, LocationBarChart } from '../components/AnalyticsCharts';
import axios from 'axios';
import {
    FaChartPie, FaChartBar, FaTable, FaClipboardList,
    FaUsers, FaCheckCircle, FaExclamationTriangle, FaClock,
    FaArrowRight, FaShieldAlt, FaSignal, FaTrash
} from 'react-icons/fa';
import ConfirmModal from '../components/ConfirmModal';
import { StatsCardSkeleton, ChartSkeleton, HeatmapSkeleton, TableSkeleton } from '../components/SkeletonLoaders';

const AdminDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'tickets', 'analytics'
    const [dataLoading, setDataLoading] = useState(true);
    const [artificialLoading, setArtificialLoading] = useState(true);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    const fetchFeedbacks = async () => {
        try {
            setDataLoading(true);
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/feedback', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
        const timer = setTimeout(() => setArtificialLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const loading = dataLoading || artificialLoading;

    const handleUpdate = (updatedFeedback) => {
        setFeedbacks(feedbacks.map(f => f._id === updatedFeedback._id ? updatedFeedback : f));
    };

    const handleClearResolved = async () => {
        setIsClearing(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:5000/api/feedback/clear-resolved', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(feedbacks.filter(f => f.status !== 'Resolved'));
            setIsClearModalOpen(false);
        } catch (error) {
            console.error('Error clearing history:', error);
        } finally {
            setIsClearing(false);
        }
    };

    const stats = {
        total: feedbacks.length,
        resolved: feedbacks.filter(f => f.status === 'Resolved' || f.status === 'Closed').length,
        pending: feedbacks.filter(f => f.status === 'Pending').length,
        avgResponse: '1.2' // Mock for now
    };

    const wifiHeatmapData = [
        { location: 'Learning Center', status: 'Weak', complaints: 12 },
        { location: 'Eastern Wing (AS Block)', status: 'Medium', complaints: 5 },
        { location: 'Western Wing (IB Block)', status: 'Strong', complaints: 1 },
        { location: 'Sunflower Block', status: 'Strong', complaints: 0 },
        { location: 'Hostel', status: 'Weak', complaints: 18 }
    ];

    const getHeatmapColor = (status) => {
        if (status === 'Strong') return 'text-green-500 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
        if (status === 'Medium') return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
        if (status === 'Weak') return 'text-red-500 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Admin Sidebar */}
                <aside className="w-64 h-screen sticky top-0 border-r border-green-700 dark:border-green-800 bg-green-600 dark:bg-green-900 transition-all duration-300 hidden md:flex flex-col p-4 gap-2 z-50 shadow-[4px_0_24px_rgba(22,163,74,0.15)]">
                    <div className="flex items-center gap-2 px-4 py-6 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 dark:bg-green-500/10 flex items-center justify-center text-white border border-white/30 dark:border-green-500/20 shadow-sm">
                            <FaShieldAlt />
                        </div>
                        <span className="text-sm font-bold text-white transition-colors duration-300 uppercase tracking-widest">Admin Control</span>
                    </div>

                    <p className="text-xs font-bold text-green-200 dark:text-green-400/80 uppercase tracking-wider ml-4 mt-6 mb-2">Management</p>
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'overview' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaChartPie className={`text-xl ${activeTab === 'overview' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">System Overview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('tickets')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'tickets' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaClipboardList className={`text-xl ${activeTab === 'tickets' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">Manage Tickets</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'analytics' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaChartBar className={`text-xl ${activeTab === 'analytics' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">Data Analytics</span>
                    </button>

                    <div className="mt-auto rounded-xl p-4 bg-green-700/50 dark:bg-green-800/50 border border-green-500/30 dark:border-green-600/30 shadow-inner">
                        <p className="text-xs font-bold text-white mb-2">System Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                            <span className="text-[10px] font-bold text-green-100 dark:text-green-400 uppercase tracking-wider">Operational</span>
                        </div>
                    </div>
                </aside>

                {/* Admin Main Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {activeTab === 'overview' && (
                        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">Administrator Dashboard</h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium transition-colors duration-300">Real-time overview of campus-wide network health and reports.</p>
                                </div>
                            </div>

                            {/* Admin Stats Grid */}
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                    <StatsCardSkeleton />
                                    <StatsCardSkeleton />
                                    <StatsCardSkeleton />
                                    <StatsCardSkeleton />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
                                    <div className="glass-card p-4 md:p-6 flex items-center gap-3 md:gap-4 group">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 text-xl md:text-2xl border border-blue-200 dark:border-blue-500/20 group-hover:scale-105 transition-transform shadow-sm">
                                            <FaTable />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">Total Tickets</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5 md:mt-1 transition-colors duration-300">{stats.total}</p>
                                        </div>
                                    </div>
                                    <div className="glass-card p-4 md:p-6 flex items-center gap-3 md:gap-4 group">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500 text-xl md:text-2xl border border-green-200 dark:border-green-500/20 group-hover:scale-105 transition-transform shadow-sm">
                                            <FaCheckCircle />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">Resolved</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5 md:mt-1 transition-colors duration-300">{stats.resolved}</p>
                                        </div>
                                    </div>
                                    <div className="glass-card p-4 md:p-6 flex items-center gap-3 md:gap-4 group">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-500 text-xl md:text-2xl border border-red-200 dark:border-red-500/20 group-hover:scale-105 transition-transform shadow-sm">
                                            <FaExclamationTriangle />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">High Priority</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5 md:mt-1 transition-colors duration-300">{feedbacks.filter(f => f.priority === 'High').length}</p>
                                        </div>
                                    </div>
                                    <div className="glass-card p-4 md:p-6 flex items-center gap-3 md:gap-4 group">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500 text-xl md:text-2xl border border-yellow-200 dark:border-yellow-500/20 group-hover:scale-105 transition-transform shadow-sm">
                                            <FaClock />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">Avg Response</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5 md:mt-1 transition-colors duration-300">{stats.avgResponse}h</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Live WiFi Heatmap */}
                            {loading ? (
                                <HeatmapSkeleton />
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">Live WiFi Heatmap</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {wifiHeatmapData.map((item, index) => {
                                            const colorClasses = getHeatmapColor(item.status);
                                            return (
                                                <div key={index} className="glass-card p-4 relative group hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
                                                    <div className="min-w-0 pr-2">
                                                        <p className="font-extrabold text-gray-900 dark:text-white truncate">{item.location}</p>
                                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-bold uppercase tracking-wider truncate">{item.status} Signal</p>
                                                    </div>
                                                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border shadow-sm transition-colors duration-300 ${colorClasses}`}>
                                                        <FaSignal className="text-lg" />
                                                    </div>
                                                    
                                                    {/* Tooltip */}
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                                                        {item.complaints} Active Complaints
                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45"></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {loading ? (
                                    <>
                                        <ChartSkeleton />
                                        <ChartSkeleton />
                                    </>
                                ) : (
                                    <>
                                        <div className="glass-card p-6 h-[320px] flex flex-col hover:border-green-500/30 transition-colors duration-300 animate-fade-in">
                                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Status Distribution</h3>
                                            <div className="flex-1 min-h-0 relative">
                                                <StatusPieChart feedbacks={feedbacks} />
                                            </div>
                                        </div>
                                        <div className="glass-card p-6 h-[320px] flex flex-col hover:border-green-500/30 transition-colors duration-300 animate-fade-in">
                                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Location Hotspots</h3>
                                            <div className="flex-1 min-h-0 relative">
                                                <LocationBarChart feedbacks={feedbacks} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tickets' && (
                        <div className="max-w-7xl mx-auto animate-slide-up">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">Ticket Management</h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium transition-colors duration-300">Review, assign, and resolve student connectivity reports.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 shadow-sm whitespace-nowrap">
                                        {feedbacks.length} ACTIVE REQUESTS
                                    </span>
                                    {feedbacks.filter(f => f.status === 'Resolved').length > 0 && (
                                        <button
                                            onClick={() => setIsClearModalOpen(true)}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all flex items-center gap-2 hover:scale-105"
                                        >
                                            <FaTrash /> Clear Resolved
                                        </button>
                                    )}
                                </div>
                            </div>
                            {loading ? <TableSkeleton /> : <div className="animate-fade-in"><FeedbackTable feedbacks={feedbacks} onUpdate={handleUpdate} /></div>}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <AdvancedAnalytics feedbacks={feedbacks} loading={loading} />
                    )}
                </main>
            </div>

            <ConfirmModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={handleClearResolved}
                title="Clear All Resolved Issues"
                message="Are you sure? This action will archive all globally resolved tickets. This cannot be undone."
                isLoading={isClearing}
            />
        </div>
    );
};

export default AdminDashboard;
