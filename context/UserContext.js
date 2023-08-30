import React, {createContext, useEffect, useState} from 'react';

export const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // This code will only run on the client side
        const savedUser = JSON.parse(localStorage.getItem('user')) || null;
        setUser(savedUser);
    }, []);

    const saveUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        console.log('logging out??');
    };

    return (
        <UserContext.Provider value={{ user, saveUser, logout }}>
            {props.children}
        </UserContext.Provider>
    );
};
