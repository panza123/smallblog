import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create the context outside the component
export const UserContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Changed to null for better state management

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get('profile');
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile(); // Call the function to fetch the user profile
    }, []); // Run once when the component mounts

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
