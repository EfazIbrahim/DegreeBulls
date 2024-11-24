import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Your Firebase setup file

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Store the logged-in user
    const [loading, setLoading] = useState(true); // Track whether auth is being initialized

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Set user or null if logged out
            setLoading(false); // Auth state is resolved
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // Provide currentUser and loading state
    return (
        <AuthContext.Provider value={{ currentUser, loading }}>
            {!loading && children} {/* Only render children when loading is complete */}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
