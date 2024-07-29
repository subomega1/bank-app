import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import Balance from "../models/balance.model.js";

export const verifyOtp = async (req, res) => {
    try {
        const { username, otp } = req.body;
        
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check OTP validity
        if ( Date.now() > user.otpExpiresAt) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ error: "WORONG OTP" });
        }

        // Clear OTP fields
        const validOtpUser = true
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        // Check if the user is an admin
        if (user.role === "admin") {
            generateToken(user._id, res);
            return res.status(200).json({
                _id: user._id,
                fullName: user.FullName,
                username: user.username,
                role: user.role,
                validOtpUser,

            });
        }

        // Check if the user's balance exists
        const userBalance = await Balance.findOne({ user: user._id });
        if (!userBalance) {
            return res.status(400).json({ error: "User balance not found" });
        }

        // Generate a token for the user
        const token = generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.FullName,
            username: user.username,
            role: user.role,
            userBalance: `${userBalance.balance} Dt`,
        });
    } catch (error) {
        console.log("Error in verifyOtp controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
