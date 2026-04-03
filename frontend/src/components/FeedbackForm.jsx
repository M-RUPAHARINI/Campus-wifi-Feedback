import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { FaPaperPlane, FaMapMarkerAlt, FaExclamationTriangle, FaSignal, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';
import CustomSelect from './CustomSelect';
import { FormSkeleton } from '../components/SkeletonLoaders';

const FeedbackForm = ({ onFeedbackSubmit }) => {
    const [locationState, setLocationState] = useState({
        main: '',
        hostelType: '',
        block: ''
    });
    
    const [formData, setFormData] = useState({
        issueType: '',
        signalStrength: '',
        issueDuration: '',
        rating: 3,
        comments: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setInitialLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSeverityChange = (e) => {
        setFormData({ ...formData, rating: parseInt(e.target.value) });
    };

    const getPriority = (severity) => {
        if (severity >= 4) return 'High';
        if (severity === 3) return 'Medium';
        return 'Low';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        if (!locationState.main) {
            setLoading(false);
            return alert('Please select a main location.');
        }
        
        let finalLocation = locationState.main;
        if (locationState.main === 'Hostel') {
            if (!locationState.hostelType || !locationState.block) {
                setLoading(false);
                return alert('Please complete the hostel location details.');
            }
            finalLocation = `Hostel > ${locationState.hostelType} > ${locationState.block}`;
        }

        if (!formData.issueType) {
            setLoading(false);
            return alert('Please select an issue type.');
        }

        if (!formData.signalStrength) {
            setLoading(false);
            return alert('Please indicate the signal status.');
        }

        if (!formData.issueDuration || formData.issueDuration < 1) {
            setLoading(false);
            return alert('Please enter a valid issue duration.');
        }

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const payload = {
                ...formData,
                placeOfIssue: finalLocation,
                priority: getPriority(formData.rating),
                issueDate: new Date().toISOString().split('T')[0]
            };

            const response = await axios.post(`${API_URL}/api/feedback`, payload, config);
            
            if (onFeedbackSubmit) {
                onFeedbackSubmit(response.data);
            }
            
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            
            // Reset
            setFormData({
                issueType: '',
                signalStrength: '',
                issueDuration: '',
                rating: 3,
                comments: ''
            });
            setLocationState({ main: '', hostelType: '', block: '' });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error submitting feedback');
        } finally {
            setLoading(false);
        }
    };

    const signalOptions = ['Good', 'Average', 'Poor'];

    const mainLocations = [
        { value: '', label: 'Choose an option' },
        { value: 'Eastern Wing (AS Block)', label: 'Eastern Wing (AS Block)' },
        { value: 'Western Wing (IB Block)', label: 'Western Wing (IB Block)' },
        { value: 'Sunflower Block', label: 'Sunflower Block' },
        { value: 'Mechanical Block', label: 'Mechanical Block' },
        { value: 'BIT Auditorium', label: 'BIT Auditorium' },
        { value: 'Learning Center', label: 'Learning Center' },
        { value: 'Hostel', label: 'Hostel' }
    ];

    const hostelTypes = [
        { value: '', label: 'Choose an option' },
        { value: 'Girls Hostel', label: 'Girls Hostel' },
        { value: 'Boys Hostel', label: 'Boys Hostel' }
    ];

    const girlsBlocks = [
        { value: '', label: 'Choose an option' },
        { value: 'Yamuna', label: 'Yamuna' },
        { value: 'Ganga', label: 'Ganga' },
        { value: 'Narmadha', label: 'Narmadha' },
        { value: 'Cauvery', label: 'Cauvery' },
        { value: 'North Bavani', label: 'North Bavani' },
        { value: 'South Bavani', label: 'South Bavani' }
    ];

    const boysBlocks = [
        { value: '', label: 'Choose an option' },
        { value: 'Sapphire', label: 'Sapphire' },
        { value: 'Emerald', label: 'Emerald' },
        { value: 'Ruby', label: 'Ruby' },
        { value: 'Diamond', label: 'Diamond' },
        { value: 'Pearl', label: 'Pearl' }
    ];

    if (initialLoading) {
        return <FormSkeleton />;
    }

    return (
        <div className="glass-card rounded-xl shadow-lg p-6 relative overflow-hidden group border border-gray-100 dark:border-gray-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none transition-all duration-500 group-hover:bg-green-500/10"></div>

            {success ? (
                <div className="p-12 text-center animate-fade-in relative z-10 border border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10 rounded-2xl shadow-inner">
                    <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl mb-4 animate-slide-up">
                        <FaCheckCircle className="text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400">Report Submitted!</h3>
                    <p className="text-sm font-medium text-green-600/80 dark:text-green-500/80 mt-2">Your IT ticket has been successfully created.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 animate-fade-in">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <FaMapMarkerAlt className="text-green-500" /> Select Location
                            </label>
                            <CustomSelect
                                name="mainLocation"
                                value={locationState.main}
                                onChange={(e) => setLocationState({ main: e.target.value, hostelType: '', block: '' })}
                                options={mainLocations}
                            />
                        </div>

                        {/* Dynamic Hostel Type */}
                        {locationState.main === 'Hostel' && (
                            <div className="space-y-2 animate-fade-in">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-green-500" /> Select Hostel Type
                                </label>
                                <CustomSelect
                                    name="hostelType"
                                    value={locationState.hostelType}
                                    onChange={(e) => setLocationState({ ...locationState, hostelType: e.target.value, block: '' })}
                                    options={hostelTypes}
                                />
                            </div>
                        )}

                        {/* Dynamic Block */}
                        {locationState.main === 'Hostel' && locationState.hostelType && (
                            <div className="space-y-2 animate-fade-in">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-green-500" /> Select Block
                                </label>
                                <CustomSelect
                                    name="hostelBlock"
                                    value={locationState.block}
                                    onChange={(e) => setLocationState({ ...locationState, block: e.target.value })}
                                    options={locationState.hostelType === 'Girls Hostel' ? girlsBlocks : boysBlocks}
                                />
                            </div>
                        )}

                        {/* Issue Type */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <FaExclamationTriangle className="text-green-500" /> Issue Type
                            </label>
                            <CustomSelect
                                name="issueType"
                                value={formData.issueType}
                                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                                options={[
                                    { value: '', label: 'Choose an option' },
                                    { value: 'No Connection', label: 'No Connection' },
                                    { value: 'Slow Internet', label: 'Slow Internet / Lag' },
                                    { value: 'Frequent Disconnection', label: 'Frequent Drops' },
                                    { value: 'Weak Signal', label: 'Weak Signal Area' },
                                    { value: 'Login Issue', label: 'Login Portal Fail' }
                                ]}
                            />
                        </div>

                        {/* Signal Badge */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <FaSignal className="text-green-500" /> Signal Status
                            </label>
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700">
                                {signalOptions.map(option => (
                                    <button
                                        type="button"
                                        key={option}
                                        onClick={() => setFormData({ ...formData, signalStrength: option })}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                                            formData.signalStrength === option 
                                                ? option === 'Poor' ? 'bg-red-500 text-white shadow-md scale-[1.02]' 
                                                : option === 'Average' ? 'bg-yellow-500 text-white shadow-md scale-[1.02]' 
                                                : 'bg-green-500 text-white shadow-md scale-[1.02]'
                                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Issue Duration */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <FaClock className="text-green-500" /> Duration (Hours)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="72"
                                required
                                value={formData.issueDuration}
                                onChange={(e) => setFormData({ ...formData, issueDuration: parseInt(e.target.value) })}
                                className="input-field"
                            />
                        </div>

                        {/* Severity Slider (Full Width) */}
                        <div className="space-y-3 col-span-1 md:col-span-2 mt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Severity: <span className="text-gray-900 dark:text-white ml-1 text-sm">{formData.rating}/5</span>
                                </label>
                                <span className={`text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-md ${
                                    formData.rating >= 4 ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' 
                                    : formData.rating === 3 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400' 
                                    : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                                }`}>
                                    Priority: {getPriority(formData.rating)} (Auto-detected)
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min="1" max="5" 
                                value={formData.rating} 
                                onChange={handleSeverityChange}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all shadow-inner"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 col-span-1 md:col-span-2 pt-2">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                                    Description
                                </label>
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${formData.comments.length >= 300 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {formData.comments.length} / 300
                                </span>
                            </div>
                            <textarea
                                maxLength="300"
                                rows="3"
                                placeholder="Describe your WiFi issue clearly..."
                                value={formData.comments}
                                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                className="input-field py-3 resize-none focus:ring-2 focus:ring-green-500/50"
                            ></textarea>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 font-bold ${loading ? 'opacity-80 cursor-wait' : ''}`}
                    >
                        {loading ? (
                            <><FaSpinner className="animate-spin text-lg" /> Submitting...</>
                        ) : (
                            <><FaPaperPlane /> Submit Technical Report</>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default FeedbackForm;
