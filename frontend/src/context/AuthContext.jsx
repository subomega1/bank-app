import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem('bank-user')) || null
    );

    useEffect(() => {
        if (authUser) {
            const currentTime = new Date().getTime();
            const otpExpiresAt = new Date(authUser.otpExpiresAt).getTime();

            if (currentTime > otpExpiresAt) {
                setAuthUser(null);
                localStorage.removeItem('bank-user');
            }
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
