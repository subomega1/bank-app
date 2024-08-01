import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useLogout() {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Logout failed');
            }

            // Successful logout
            setAuthUser(null);
            localStorage.removeItem('bank-user');
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error(`Logout error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleLogout };
}

export default useLogout;
