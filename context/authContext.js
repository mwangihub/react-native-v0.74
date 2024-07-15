

import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
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

/**
 * @summary 
 * - The AuthContext.Provider passes the signIn, signOut, session, 
 *   and isLoading values to its children, making them accessible 
 *   throughout the application.
 * - This approach ensures that the authentication state is consistent 
 *   and that session data persists across page reloads, while also 
 *   handling login and logout actions properly.
 * @mwangihub https://github.com/mwangihub
 * @param {*} props.children 
 * @returns 
 */
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // try {
        //     localStorage.removeItem('session');

        // } catch (error) {
        //     SecureStore.deleteItemAsync("session");
        // }

        /**
         * @summary 
         * 
         * @mwangihub https://github.com/mwangihub
         * @param {*} object 
         * @returns
         */
        setLoading(true);
        const checkSession = async () => {
            try {
                if (Platform.OS === 'web') {
                    const storedSession = localStorage.getItem('session');
                    if (storedSession) setSession(JSON.parse(storedSession));
                } else {
                    const storedSession = await SecureStore.getItemAsync("session");
                    if (storedSession) setSession(JSON.parse(storedSession));
                }
            } catch (e) {
                console.error('Error retrieving session:', e);
            }
            setLoading(false);
        };
        checkSession();
    }, []);


    /**
     * @summary 
     * 
     * @mwangihub https://github.com/mwangihub
     * @param {*} object 
     * @returns
     */
    const signIn = async (object = null) => {
        console.log("Sign in data: ", object);
        setLoading(true);
        setTimeout(async () => {
            try {
                if (Platform.OS === 'web') {
                    localStorage.setItem('session', JSON.stringify(dummySession));
                } else {
                    await SecureStore.setItemAsync("session", JSON.stringify(dummySession));
                }
                setSession(dummySession);
            } catch (e) {
                console.error('Error setting session:', e);
            }
            setLoading(false);
        }, 3000);
    };

    /**
     * @summary 
     * 
     * @mwangihub https://github.com/mwangihub
     * @param {*} object 
     * @returns
     */
    const signOut = async () => {
        setLoading(true);

        setTimeout(async () => {
            try {
                if (Platform.OS === 'web') {
                    localStorage.removeItem('session');
                } else {
                    await SecureStore.deleteItemAsync("session");
                }
                setSession(null);
            } catch (e) {
                console.error('Error removing session:', e);
            }
            setLoading(false);
        }, 3000);

    };

    return (
        <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
