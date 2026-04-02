import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaWifi, FaEye, FaEyeSlash, FaUser, FaShieldAlt, FaBuilding, FaIdCard, FaArrowLeft } from 'react-icons/fa';
import { FormSkeleton } from '../components/SkeletonLoaders';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [department, setDepartment] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // For smooth focus animations
    const [focusedInput, setFocusedInput] = useState(null);

    const { register } = useAuth();
    const navigate = useNavigate();

    const getPasswordStrength = (pass) => {
        let score = 0;
        if (!pass) return { score: 0, label: '', color: 'bg-gray-200 dark:bg-gray-800' };
        if (pass.length > 5) score += 1;
        if (pass.length > 7) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
        if (score <= 4) return { score, label: 'Good', color: 'bg-yellow-500' };
        return { score, label: 'Strong', color: 'bg-green-500' };
    };

    const strength = getPasswordStrength(password);
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            const user = await register({ name, email, password, role, department, rollNumber });
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                        Join the <br />
                        <span className="text-green-300">Smart Campus Network</span>
                    </h1>
                    <p className="text-lg text-green-100/80 leading-relaxed max-w-md">
                        Create an account to report and track WiFi issues. Join thousands of students improving connectivity across the campus.
                    </p>
                    
                    <div className="mt-12 flex items-center gap-4 text-sm font-semibold text-green-200 uppercase tracking-widest">
                        <span className="w-12 h-[2px] bg-green-400 rounded-full"></span>
                        Secure Registration
                    </div>
                </div>
            </div>

            {/* Right Side: Authentication Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none hidden dark:block"></div>

                <div className="w-full max-w-lg glass-card p-6 sm:p-10 md:p-12 shadow-xl animate-fade-in relative z-10 mx-auto m-4 sm:m-0 mt-16 sm:mt-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 dark:border-gray-800/50">
                    <div className="flex flex-col mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                            Create Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm transition-colors duration-300">
                            Fill in your details to get started.
                        </p>
                    </div>

                    {loading ? (
                        <FormSkeleton />
                    ) : (
                        <div className="animate-fade-in space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                                <div className="space-y-4">
                            {/* Full Name */}
                            <div className={`relative transition-all duration-300 ${focusedInput === 'name' ? 'scale-[1.02]' : ''}`}>
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    autoComplete="off"
                                    className="input-field pl-12"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={() => setFocusedInput('name')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </div>

                            {/* Email */}
                            <div className={`relative transition-all duration-300 ${focusedInput === 'email' ? 'scale-[1.02]' : ''}`}>
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    autoComplete="off"
                                    className="input-field pl-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </div>

                            {/* Role Selection */}
                            <div className={`relative transition-all duration-300 ${focusedInput === 'role' ? 'scale-[1.02]' : ''}`}>
                                <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    onFocus={() => setFocusedInput('role')}
                                    onBlur={() => setFocusedInput(null)}
                                    className="input-field pl-12 appearance-none cursor-pointer text-gray-900 dark:text-gray-100"
                                >
                                    <option value="user" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">Student</option>
                                    <option value="admin" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">Administrator</option>
                                </select>
                            </div>

                            {/* Department and Roll No (Only for Students) */}
                            {role === 'user' && (
                                <div className="grid grid-cols-2 gap-4 animate-slide-up">
                                    <div className={`relative transition-all duration-300 ${focusedInput === 'department' ? 'scale-[1.02]' : ''}`}>
                                        <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            onFocus={() => setFocusedInput('department')}
                                            onBlur={() => setFocusedInput(null)}
                                            className="input-field pl-12 appearance-none cursor-pointer text-gray-900 dark:text-gray-100"
                                            required={role === 'user'}
                                        >
                                            <option value="" disabled className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Department</option>
                                            <option value="CSE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">CSE</option>
                                            <option value="ECE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">ECE</option>
                                            <option value="EEE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">EEE</option>
                                            <option value="MECH" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">MECH</option>
                                            <option value="CIVIL" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">CIVIL</option>
                                        </select>
                                    </div>
                                    <div className={`relative transition-all duration-300 ${focusedInput === 'rollNumber' ? 'scale-[1.02]' : ''}`}>
                                        <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Roll No"
                                            required={role === 'user'}
                                            autoComplete="off"
                                            className="input-field pl-12"
                                            value={rollNumber}
                                            onChange={(e) => setRollNumber(e.target.value)}
                                            onFocus={() => setFocusedInput('rollNumber')}
                                            onBlur={() => setFocusedInput(null)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password */}
                            <div className="space-y-2">
                                <div className={`relative transition-all duration-300 ${focusedInput === 'password' ? 'scale-[1.02]' : ''}`}>
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        required
                                        autoComplete="new-password"
                                        className="input-field pl-12 pr-12"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors z-10"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {/* Password Strength UI */}
                                {password && (
                                    <div className="flex items-center gap-2 mt-2 px-1 animate-fade-in">
                                        <div className="flex-1 flex gap-1 h-1.5">
                                            {[1, 2, 3].map((step) => (
                                                <div 
                                                    key={step} 
                                                    className={`flex-1 rounded-full transition-colors duration-500 ${
                                                        strength.score >= step ? strength.color : 'bg-gray-200 dark:bg-gray-700'
                                                    }`}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                            strength.score <= 2 ? 'text-red-500' : strength.score <= 4 ? 'text-yellow-500' : 'text-green-500'
                                        }`}>
                                            {strength.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className={`relative transition-all duration-300 py-2 ${focusedInput === 'confirm' ? 'scale-[1.02]' : ''}`}>
                                <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${confirmPassword && !passwordsMatch ? 'text-red-500' : passwordsMatch ? 'text-green-500' : 'text-gray-400'}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    autoComplete="new-password"
                                    className={`input-field pl-12 ${confirmPassword && !passwordsMatch ? 'border-red-500 focus:ring-red-500' : passwordsMatch ? 'border-green-500 focus:ring-green-500' : ''}`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setFocusedInput('confirm')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                {confirmPassword && !passwordsMatch && (
                                    <p className="text-xs text-red-500 font-bold mt-2 ml-1 animate-fade-in">Passwords do not match</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2 animate-slide-up">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn-primary w-full py-3.5 text-base mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Register
                        </button>
                    </form>
                        </div>
                    )}

                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8 transition-colors">
                        Already have an account?
                        <Link
                            to="/login"
                            className="ml-2 text-green-600 font-bold hover:text-green-500 transition-colors"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
