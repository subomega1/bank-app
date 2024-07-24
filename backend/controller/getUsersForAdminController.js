import User from "../models/user.model.js";

export const getUsersForAdmin = async (req, res) => {
    try {
        const  loggedUser = req.user
        const FilteredUsers = await User.find({ _id: { $ne: loggedUser._id } }).select("-password");

        res.status(200).json(FilteredUsers)
        
    } catch (error) {
        console.log("Error in getUsersForAdmin controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}