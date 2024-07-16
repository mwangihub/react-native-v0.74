import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';

const dummySession = {
    token: 'dummy-token-12345',
    userDetails: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    }
};

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);
            try {
                let storedSession;
                if (Platform.OS === 'web') {
                    storedSession = localStorage.getItem('session');
                } else {
                    storedSession = await getItemAsync('session');
                }
                if (storedSession) {
                    setSession(JSON.parse(storedSession));
                }
            } catch (e) {
                console.error('Error retrieving session:', e);
            }
            setLoading(false);
        };
        checkSession();
    }, []);

    const signIn = async () => {
        setLoading(true);
        try {
            if (Platform.OS === 'web') {
                localStorage.setItem('session', JSON.stringify(dummySession));
            } else {
                await setItemAsync('session', JSON.stringify(dummySession));
            }
            setSession(dummySession);
        } catch (e) {
            console.error('Error setting session:', e);
        }
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        try {
            if (Platform.OS === 'web') {
                localStorage.removeItem('session');
            } else {
                await deleteItemAsync('session');
            }
            setSession(null);
        } catch (e) {
            console.error('Error removing session:', e);
        }
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
