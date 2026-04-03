import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token); // Store token separately for easier access
            localStorage.setItem('userName', data.name || data.user?.name);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/register`, userData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name || data.user?.name);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
