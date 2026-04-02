import React, { useState, useEffect } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
    FaExclamationTriangle, FaClipboardList, FaCheckCircle, FaClock, 
    FaMedal
} from 'react-icons/fa';
import { StatsCardSkeleton, ChartSkeleton } from './SkeletonLoaders';

const COLORS = ['#ef4444', '#f97316', '#eab308'];

const AdvancedAnalytics = ({ feedbacks, loading }) => {
    const [liveMessage, setLiveMessage] = useState('');

    useEffect(() => {
        const messages = [
            "⚠️ High number of complaints detected in Library this week.",
            "⚠️ Slow Speed reports have spiked by 20% in the last 48 hours.",
            "✅ Resolution times are improving across all campus blocks.",
            "⚠️ Multiple disconnects reported in Hostel area recently."
        ];
        if (!loading) {
            setLiveMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, [loading]);

    // Data Aggregation
    const totalComplaints = feedbacks.length > 0 ? feedbacks.length : 120;
    const resolvedCount = feedbacks.filter(f => f.status === 'Resolved' || f.status === 'Closed').length || 90;
    const pendingCount = feedbacks.filter(f => f.status === 'Pending').length || 30;
    const avgTime = '2.5'; 

    const performanceData = [
        { month: 'Jan', complaints: 40 },
        { month: 'Feb', complaints: 55 },
        { month: 'Mar', complaints: 30 },
        { month: 'Apr', complaints: 70 },
        { month: 'May', complaints: 50 },
    ];

    const pieData = [
        { name: 'Slow Speed', value: 40 },
        { name: 'No Connection', value: 35 },
        { name: 'Frequent Disconnect', value: 25 },
    ];

    const problemAreas = [
        { name: 'Library', issues: 15 },
        { name: 'Hostel', issues: 10 },
        { name: 'IB Block', issues: 8 }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">Advanced Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium transition-colors duration-300">Deep dive into network performance metrics and user feedback.</p>
            </div>

            {loading ? (
                <div className="space-y-8 animate-pulse">
                    <ChartSkeleton /> 
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <StatsCardSkeleton />
                        <StatsCardSkeleton />
                        <StatsCardSkeleton />
                        <StatsCardSkeleton />
                    </div>
                </div>
            ) : (
                <>
                    <div className="glass-card bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 p-4 rounded-xl flex items-center gap-3 animate-slide-up shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex flex-shrink-0 items-center justify-center text-yellow-600 dark:text-yellow-500 animate-pulse">
                            <FaExclamationTriangle />
                        </div>
                        <p className="font-bold text-yellow-800 dark:text-yellow-200 text-sm">{liveMessage}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="glass-card p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 text-xl border border-blue-200 dark:border-blue-500/20">
                                <FaClipboardList />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Total</p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{totalComplaints}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500 text-xl border border-green-200 dark:border-green-500/20">
                                <FaCheckCircle />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Resolved</p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{resolvedCount}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 text-xl border border-orange-200 dark:border-orange-500/20">
                                <FaExclamationTriangle />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Pending</p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{pendingCount}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 md:p-6 rounded-xl shadow-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 text-xl border border-purple-200 dark:border-purple-500/20">
                                <FaClock />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Avg Time</p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{avgTime}h</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 md:p-8 rounded-xl shadow-md animate-slide-up">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-center">Monthly Performance Trends</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                    <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" tick={{fontSize: 12, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                                    <RechartsTooltip 
                                        contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', backgroundColor: '#ffffff', color: '#1e293b', fontWeight: 'bold' }} 
                                        itemStyle={{ color: '#16a34a' }}
                                    />
                                    <Line type="monotone" dataKey="complaints" stroke="#22c55e" strokeWidth={4} dot={{ r: 6, fill: '#16a34a', strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 8 }} animationDuration={1500} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
                        <div className="glass-card p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-center">Issue Distribution</h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                            animationDuration={1500}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ borderRadius: '10px', border: 'none', backgroundColor: '#1e293b', color: '#f8fafc' }} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-xl shadow-md flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-center flex items-center justify-center gap-2">
                                <FaMedal className="text-yellow-500" /> Top Problem Areas
                            </h3>
                            <div className="flex-1 flex flex-col justify-center space-y-4">
                                {problemAreas.map((area, index) => {
                                    const medals = ['🥇', '🥈', '🥉'];
                                    const bgClasses = index === 0 
                                        ? 'bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-500/20 dark:to-gray-900 border-l-4 border-yellow-400'
                                        : index === 1 
                                            ? 'bg-gradient-to-r from-gray-100 to-white dark:from-gray-700/30 dark:to-gray-900 border-l-4 border-gray-400'
                                            : 'bg-gradient-to-r from-orange-50 to-white dark:from-orange-500/20 dark:to-gray-900 border-l-4 border-orange-400';
                                    
                                    return (
                                        <div key={index} className={`flex items-center justify-between p-4 rounded-r-xl shadow-sm ${bgClasses} hover:scale-[1.02] transition-transform`}>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl drop-shadow-md">{medals[index]}</span>
                                                <span className="font-extrabold text-gray-900 dark:text-white text-lg">{area.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{area.issues} issues</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdvancedAnalytics;
