import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { StatsCardSkeleton, ReportListSkeleton, TableSkeleton } from '../components/SkeletonLoaders';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackHistory from './FeedbackHistory'; // I will create this next
import CampusMap from '../components/CampusMap'; // I will create this later
import axios from 'axios';
import {
    FaEdit, FaHistory, FaSignal, FaMapMarkerAlt,
    FaCalendarAlt, FaTrash, FaThLarge, FaChartBar,
    FaClock, FaCheckCircle, FaExclamationCircle, FaPlus,
    FaExclamationTriangle, FaServer, FaWifi
} from 'react-icons/fa';
import ConfirmModal from '../components/ConfirmModal';

const UserDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'submit', 'history', 'map'
    const [dataLoading, setDataLoading] = useState(true);
    const [artificialLoading, setArtificialLoading] = useState(true);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const storedName = localStorage.getItem('userName');
    const userName = storedName && storedName !== 'undefined' ? storedName.split(' ')[0] : 'Student';

    const fetchFeedbacks = async () => {
        try {
            setDataLoading(true);
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/feedback/my', {
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

    const stats = {
        total: feedbacks.length,
        resolved: feedbacks.filter(f => f.status === 'Resolved' || f.status === 'Closed').length,
        pending: feedbacks.filter(f => f.status === 'Pending').length,
        avgTime: '2.4' // Placeholder for now
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

    const handleNewFeedback = (newFeedback) => {
        setFeedbacks([newFeedback, ...feedbacks]);
        setActiveTab('dashboard');
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-64 h-screen sticky top-0 border-r border-green-700 dark:border-green-800 bg-green-600 dark:bg-green-900 transition-all duration-300 hidden md:flex flex-col p-4 gap-2 z-50 shadow-[4px_0_24px_rgba(22,163,74,0.15)]">
                    <p className="text-xs font-bold text-green-200 dark:text-green-400/80 uppercase tracking-wider ml-4 mt-6 mb-2">Main Menu</p>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'dashboard' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaThLarge className={`text-xl ${activeTab === 'dashboard' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">Dashboard</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('submit')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'submit' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaEdit className={`text-xl ${activeTab === 'submit' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">Submit Issue</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'history' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaHistory className={`text-xl ${activeTab === 'history' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">Report History</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left border-l-4 ${activeTab === 'map' ? 'bg-green-700 dark:bg-green-800 text-white border-white shadow-inner' : 'border-transparent text-green-100 dark:text-green-100/70 hover:bg-green-500/50 dark:hover:bg-green-800/50 hover:text-white'}`}
                    >
                        <FaSignal className={`text-xl ${activeTab === 'map' ? 'text-white' : 'text-green-200 dark:text-green-500/80'}`} /> <span className="font-semibold">Network Map</span>
                    </button>

                    <div className="mt-auto p-4 rounded-xl bg-green-700/50 dark:bg-green-800/50 border border-green-500/30 dark:border-green-600/30 shadow-inner">
                        <p className="text-xs text-white font-bold mb-2">Need Help?</p>
                        <p className="text-[10px] text-green-100 font-medium leading-relaxed transition-colors duration-300">Contact campus IT support for urgent network criticalities.</p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {activeTab === 'dashboard' && (
                        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white transition-colors duration-300 tracking-tight">
                                        {getGreeting()}, {userName} 👋
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium transition-colors duration-300">
                                        Track and report your campus WiFi issues easily.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className="btn-primary"
                                >
                                    <FaHistory /> View Full History
                                </button>
                            </div>

                            {/* Stats Summary Cards */}
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
                                            <FaHistory />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">Total Reports</p>
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
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500 text-xl md:text-2xl border border-yellow-200 dark:border-yellow-500/20 group-hover:scale-105 transition-transform shadow-sm">
                                            <FaExclamationCircle />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">Pending</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5 md:mt-1 transition-colors duration-300">{stats.pending}</p>
                                        </div>
                                    </div>
                                    <div className="glass-card p-4 md:p-6 flex items-center gap-3 md:gap-4 group">
                                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 text-xl md:text-2xl border border-purple-200 dark:border-purple-500/20 group-hover:scale-105 transition-transform shadow-sm">
                                            <FaClock />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">Avg Resolution</p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-0.5 md:mt-1 transition-colors duration-300">{stats.avgTime}h</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* System Status Widgets */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                                {/* Smart Insight Warning Card */}
                                {loading ? (
                                    <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl border border-gray-100 dark:border-gray-800"></div>
                                ) : (
                                    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl p-6 relative overflow-hidden group shadow-sm animate-slide-up">
                                        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/30 transition-all duration-500"></div>
                                        <div className="relative z-10 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-500 shrink-0 shadow-sm mt-1">
                                                <FaExclamationTriangle className="animate-pulse" />
                                            </div>
                                            <div>
                                                <h3 className="font-extrabold text-yellow-800 dark:text-yellow-500 text-sm uppercase tracking-widest mb-1">Smart Insight</h3>
                                                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 leading-relaxed">
                                                    High congestion detected in the <strong className="font-bold">Learning Center Server</strong>. Expect intermittent drops for the next 45 minutes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Live Signal Status Panel */}
                                {loading ? (
                                    <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl border border-gray-100 dark:border-gray-800"></div>
                                ) : (
                                    <div className="glass-card p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-slide-up animation-delay-300">
                                        <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                                            <FaServer className="text-blue-500" /> Network Nodes
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                    <FaWifi className="text-gray-400" /> Main Backbone
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 uppercase tracking-widest">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                    <FaWifi className="text-gray-400" /> Learning Center AP
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-500 uppercase tracking-widest">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span> Congested
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                    <FaWifi className="text-gray-400" /> Hostel Block
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 uppercase tracking-widest">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Compact Recent Reports */}
                                {loading ? (
                                    <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl border border-gray-100 dark:border-gray-800"></div>
                                ) : (
                                    <div className="glass-card p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-slide-up animation-delay-500">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">Recent Activity</h3>
                                            <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-green-600 dark:text-green-500 hover:underline hover:text-green-700 transition">View All</button>
                                        </div>
                                        <div className="space-y-3">
                                            {feedbacks.slice(0, 3).map((f) => (
                                                <div key={f._id} className="p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-green-500/30 transition shadow-sm group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[120px]">{f.placeOfIssue}</span>
                                                        <StatusBadge status={f.status} />
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                                        <span className="flex items-center gap-1">
                                                            <FaSignal className={f.signalStrength === 'Poor' ? 'text-red-500' : f.signalStrength === 'Average' ? 'text-yellow-500' : 'text-green-500'} />
                                                            {f.signalStrength}
                                                        </span>
                                                        <span>{new Date(f.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {feedbacks.length === 0 && (
                                                <div className="text-center py-6 text-sm text-gray-400 font-medium">
                                                    No recent reports submitted.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}

                    {activeTab === 'submit' && (
                        <div className="max-w-4xl mx-auto animate-slide-up">
                            <div className="mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">Report WiFi Issue</h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium transition-colors duration-300">Provide details about the network problem you are facing to help IT resolve it faster.</p>
                            </div>
                            <FeedbackForm onFeedbackSubmit={handleNewFeedback} />
                        </div>
                    )}

                    {activeTab === 'history' && (
                        loading ? (
                            <div className="max-w-7xl mx-auto animate-slide-up">
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Report History</h1>
                                <TableSkeleton />
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <FeedbackHistory 
                                    feedbacks={feedbacks} 
                                    onBack={() => setActiveTab('dashboard')} 
                                    onClearRequest={() => setIsClearModalOpen(true)}
                                />
                            </div>
                        )
                    )}

                    {activeTab === 'map' && (
                        <div className="h-full min-h-[600px] animate-fade-in">
                            <CampusMap feedbacks={feedbacks} />
                        </div>
                    )}
                </main>
            </div>

            <ConfirmModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={handleClearResolved}
                title="Clear Resolved History"
                message="Are you sure? This action will archive all your resolved tickets from your view. This cannot be undone."
                isLoading={isClearing}
            />
        </div>
    );
};

export default UserDashboard;
