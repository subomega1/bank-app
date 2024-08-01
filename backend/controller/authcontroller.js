import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { sendEmail } from '../utils/sendEmail.js';
import speakeasy from 'speakeasy';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Clear existing OTP if present
        if (user.otp || user.otpExpiresAt) {
            user.otp = undefined;
            user.otpExpiresAt = undefined;
            await user.save();
        }

        // Generate new OTP
        const otp = speakeasy.totp({
            secret: user.otpSecret, // Use a secret stored in your user document
            encoding: 'base32',
            step: 300, // OTP valid for 5 minutes
        });

        user.otp = otp;
        user.otpExpiresAt = Date.now() + 300000; // 5 minutes from now
        await user.save();

        // Send OTP via Email
        const emailSubject = 'Your OTP Code';
        const emailBody = `Your verification code is ${otp}. It is valid for 5 minutes.`;
        await sendEmail(user.Email, emailSubject, emailBody);

        res.status(200).json({
            otpExpiresAt: user.otpExpiresAt,
            username: user.username,
            message: `OTP sent to ${user.username}'s email`,
        });
    } catch (error) {
        console.error('Error in login controller:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
};
