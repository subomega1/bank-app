import User from "../models/user.model.js";
import Balance from "../models/balance.model.js";

export const getUsersForAdmin = async (req, res) => {
    try {
        const loggedUser = req.user;

        // Find all users except the logged-in user and exclude the password field
        const users = await User.find({ _id: { $ne: loggedUser._id } }).select("-password");

        // Retrieve balances for each user
        const usersWithBalances = await Promise.all(users.map(async (user) => {
            const balance = await Balance.findOne({ user: user._id });

            // Optionally, handle the case where a balance is not found
            const userBalance = balance ? balance.balance : null; // Set to null or handle differently if needed

            // Return user details along with balance
            return {
                ...user.toObject(),
                balance: userBalance,
            };
        }));

        res.status(200).json(usersWithBalances);
        
    } catch (error) {
        console.log("Error in getUsersForAdmin controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
