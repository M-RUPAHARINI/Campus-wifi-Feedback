import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaWifi, FaEye, FaEyeSlash, FaSpinner, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { FormSkeleton } from '../components/SkeletonLoaders';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setIsSubmitting(true);
        try {
            const user = await login(email, password);
            setSuccessMsg('Authentication successful! Redirecting...');
            setTimeout(() => {
                navigate(user.role === 'admin' ? '/admin' : '/dashboard');
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative">
            <button 
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-50 hover:scale-105 transition-all duration-300 z-[100] font-bold"
            >
                <FaArrowLeft /> Back to Home
            </button>

            {/* Left Side: Branding & Illustration */}
            <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-green-600 to-green-900 border-r border-green-800/30 items-center justify-center p-12 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/20 rounded-full blur-[100px]"></div>

                <div className="relative z-10 text-white max-w-xl animate-slide-up">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                        <FaWifi className="text-4xl text-white drop-shadow-lg" />
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                        Campus WiFi <br />
                        <span className="text-green-300">Feedback System</span>
                    </h1>
                    <p className="text-lg text-green-100/80 leading-relaxed max-w-md">
                        Report connectivity issues, map signal hotspots, and track resolution progress in real-time across the university campus.
                    </p>
                    
                    <div className="mt-12 flex items-center gap-4 text-sm font-semibold text-green-200 uppercase tracking-widest">
                        <span className="w-12 h-[2px] bg-green-400 rounded-full"></span>
                        Secure Access
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {successMsg && (
                <div className="fixed top-6 right-6 z-[100] animate-slide-up flex items-center gap-3 bg-white dark:bg-gray-900 border-l-4 border-green-500 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                    <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500">
                        <FaCheckCircle className="text-lg" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Success</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{successMsg}</p>
                    </div>
                </div>
            )}

            {/* Right Side: Authentication Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none hidden dark:block"></div>

                <div className="w-full max-w-lg glass-card p-6 sm:p-10 md:p-12 shadow-2xl animate-fade-in relative z-10 mx-auto m-4 sm:m-0 mt-16 sm:mt-0 rounded-2xl bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/30 dark:border-gray-700/50">
                    <div className="flex flex-col mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                            Log in to your account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm transition-colors duration-300">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    {loading ? (
                        <FormSkeleton />
                    ) : (
                        <div className="animate-fade-in space-y-6">

                            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                        <div className="space-y-5">
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    autoComplete="off"
                                    className="input-field pl-12 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    autoComplete="new-password"
                                    className="input-field pl-12 pr-12 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors z-10"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me and Forgot Password Link Removed */}

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2 animate-slide-up">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`btn-primary w-full py-3.5 text-base mt-2 shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin text-lg" />
                                    Authenticating...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-8">

                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8 transition-colors">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="ml-2 text-green-600 font-bold hover:text-green-500 transition-colors"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
