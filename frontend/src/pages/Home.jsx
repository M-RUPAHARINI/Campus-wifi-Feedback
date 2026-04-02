import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardSkeleton } from '../components/SkeletonLoaders';
import { 
    FaWifi, FaMapMarkedAlt, FaChartLine, FaLaptopMedical, 
    FaEdit, FaCogs, FaDesktop, FaCheckCircle, FaArrowRight,
    FaUserGraduate, FaChartPie
} from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
            
            {/* Navbar Placeholder for Home (Optional, keeping it simple as per request or just letting hero be full screen) */}
            <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <FaWifi className="text-xl" />
                    </div>
                    <span className="text-xl font-extrabold text-white tracking-widest uppercase">Smart Campus</span>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-br from-green-600 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    
                    {/* Left Text */}
                    <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Smart Campus <br className="hidden md:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-yellow-200">
                                WiFi Monitoring System
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-green-50 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-90">
                            Report issues, visualize connectivity, and improve network performance in real-time. A unified platform for students and technicians.
                        </p>
                        <div className="flex gap-4 mt-6 items-center justify-center lg:justify-start">
                            <button 
                                onClick={() => navigate('/register')}
                                className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
                            >
                                Get Started
                            </button>
                            <button 
                                onClick={() => navigate('/login')}
                                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-700 transition"
                            >
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="flex-1 w-full max-w-lg animate-slide-up relative">
                        <div className="absolute inset-0 bg-green-500 blur-[100px] opacity-20 rounded-full"></div>
                        <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative">
                            <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/30 rounded-2xl relative overflow-hidden group">
                                <FaWifi className="text-9xl text-white/80 group-hover:scale-110 group-hover:text-green-300 transition-all duration-500" />
                                <div className="absolute w-2 h-2 bg-green-400 rounded-full top-10 left-10 animate-ping"></div>
                                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full bottom-20 right-12 animate-ping animation-delay-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Project Section */}
            <section className="py-24 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative z-20">
                <div className="max-w-7xl mx-auto px-6 text-center animate-fade-in">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Why This Project?</h2>
                    <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full mb-12"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {loading ? (
                            <>
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </>
                        ) : (
                            <>
                                <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <FaMapMarkedAlt className="text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Identify Weak Zones</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Pinpoint exact campus locations suffering from dead spots or recurrent drops in signal.</p>
                                </div>
                                
                                <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <FaUserGraduate className="text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Improve Student Experience</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Deliver a seamless, uninterrupted learning environment for all students and faculty.</p>
                                </div>

                                <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <FaChartPie className="text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data-Driven Decisions</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Empower IT administrators with accurate metrics to justify infrastructure upgrades.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-950 relative z-20 -mt-8 rounded-t-3xl">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Core Features</h2>
                        <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <>
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </>
                        ) : (
                            <>
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group cursor-default">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 text-3xl mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                <FaEdit />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report WiFi Issues</h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                Quickly log network complaints with specific locations and signal weakness hours.
                            </p>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group cursor-default">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500 text-3xl mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                <FaMapMarkedAlt />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Live Heatmap Visualization</h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                See real-time signal strength density across different campus blocks visually.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group cursor-default">
                            <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 text-3xl mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                                <FaChartLine />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Real-Time Tracking</h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                Track the exact status of your complaint from submission to final resolution.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group cursor-default">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 text-3xl mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                <FaLaptopMedical />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Priority Detection</h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                Automated ticket prioritization ensures critical areas get fixed immediately.
                            </p>
                        </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mb-4">How It Works</h2>
                        <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto font-medium">A streamlined process from reporting a connection issue to experiencing seamless WiFi.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {loading ? (
                            <>
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </>
                        ) : (
                            <>
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-100 dark:bg-gray-800 z-10"></div>
                        
                        {/* Step 1 */}
                        <div className="relative z-20 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-lg mb-6 group-hover:border-green-500 transition-colors duration-300">
                                <FaEdit className="text-3xl text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                            </div>
                            <div className="text-xs font-black text-green-500 uppercase tracking-widest mb-2">Step 1</div>
                            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">Submit Feedback</h4>
                            <p className="text-sm font-medium text-gray-500 px-4">Student notes a dead zone and logs a quick complaint.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-20 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-lg mb-6 group-hover:border-blue-500 transition-colors duration-300">
                                <FaCogs className="text-3xl text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                            </div>
                            <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">Step 2</div>
                            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">System Analyzes</h4>
                            <p className="text-sm font-medium text-gray-500 px-4">Our algorithm calculates priority based on impact density.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-20 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-lg mb-6 group-hover:border-yellow-500 transition-colors duration-300">
                                <FaDesktop className="text-3xl text-gray-400 group-hover:text-yellow-500 transition-colors duration-300" />
                            </div>
                            <div className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-2">Step 3</div>
                            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">Admin Monitors</h4>
                            <p className="text-sm font-medium text-gray-500 px-4">IT team tracks real-time hotspots and dispatches technicians.</p>
                        </div>

                        {/* Step 4 */}
                        <div className="relative z-20 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-lg mb-6 group-hover:border-green-600 transition-colors duration-300">
                                <FaCheckCircle className="text-3xl text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                            </div>
                            <div className="text-xs font-black text-green-600 uppercase tracking-widest mb-2">Step 4</div>
                            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">Problem Resolved</h4>
                            <p className="text-sm font-medium text-gray-500 px-4">The issue is fixed and the student is instantly notified.</p>
                        </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-8 bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <FaWifi className="text-green-500" />
                        <span className="font-extrabold uppercase tracking-widest text-sm">Smart Campus WiFi</span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 tracking-wider">BUILT FOR SMART CAMPUS</p>
                    <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
