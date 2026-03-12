"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

import { fetchAuthUser, loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const user = await fetchAuthUser();
            setUser(user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        const result = await loginUser(username, password);
        if (result.success) {
            setUser(result.user);
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const register = async (username, email, password) => {
        const result = await registerUser(username, email, password);
        if (result.success) {
            setUser(result.user);
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
