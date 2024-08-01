import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useVerifierOtp = () => {
    const [otp, setOtp] = useState('');
    const { authUser, setAuthUser } = useAuthContext();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Convert ISO date string to JavaScript Date object
        const otpExpiresAt = new Date(authUser?.otpExpiresAt);
        const timeLeft = otpExpiresAt - Date.now();

        if (timeLeft > 0) {
            // Set initial time
            setMinutes(Math.floor(timeLeft / 60000));
            setSeconds(Math.floor((timeLeft % 60000) / 1000));
        } else {
            // Time has already expired
            setAuthUser(null);
            localStorage.removeItem('bank-user');
            toast.error('OTP has expired. Please login again.');
            navigate('/login');
            return; // Exit the effect if OTP is already expired
        }

        const countdownInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else {
                // Time expired, clear auth context and redirect
                setAuthUser(null);
                localStorage.removeItem('bank-user');
                toast.error('OTP has expired. Please login again.');
                navigate('/login');
                clearInterval(countdownInterval);
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [authUser, seconds, minutes, setAuthUser, navigate]);

    const handleVerify = async () => {
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: authUser.username, otp }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.error || 'OTP verification failed');
                return;
            }

            const data = await res.json();
            // Successful verification
            localStorage.setItem('bank-user', JSON.stringify(data));
            setAuthUser(data);
            toast.success('OTP verified successfully!');
            // Navigate to the appropriate dashboard based on the user's role
            navigate(data.role === 'admin' ? '/admin' : '/user');
        } catch (error) {
            toast.error(`Verification error: ${error.message}`);
        }
    };

    return { otp, setOtp, minutes, seconds, handleVerify };
};

export default useVerifierOtp;
