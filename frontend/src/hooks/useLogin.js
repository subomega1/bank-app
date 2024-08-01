import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {
        if (!username || !password) {
            toast.error('Please fill in all fields');
            return { success: false };
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.error || 'Login failed');
                return { success: false };
            }

            const data = await res.json();

            localStorage.setItem('bank-user', JSON.stringify(data));
            setAuthUser(data);

            return { success: true };
        } catch (error) {
            toast.error(`Login error: ${error.message}`);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
