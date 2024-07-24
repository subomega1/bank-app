import User from "../models/user.model.js";
import Balance from "../models/balance.model.js";
import bcryptjs from "bcryptjs";

export const addUser = async (req, res) => {
    try {
        const { FullName, username, password, Email } = req.body;
        const userAlreadyExists = await User.findOne({ username });
        if (userAlreadyExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            FullName,
            username,
            password: hashedPassword,
            role: "user",
            Email,
        });

        // Create a balance record for the new user
        await Balance.create({
            user: user._id,
            balance: 0, // Initial balance can be set here
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error in addUser controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Optionally delete the user's balance record as well
        await Balance.findOneAndDelete({ user: id });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { FullName, username, password, Email, balance } = req.body;

        // Prepare the update object
        const updateData = {};

        if (FullName) updateData.FullName = FullName;
        if (username) updateData.username = username;
        if (Email) updateData.Email = Email;

        if (password) {
            // Hash the new password if provided
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user's balance if provided
        if (balance !== undefined) {
            const balanceRecord = await Balance.findOne({ user: id });
            if (balanceRecord) {
                balanceRecord.balance = balance;
                await balanceRecord.save();
            } else {
                // Optionally create a new balance record if none exists
                await Balance.create({ user: id, balance });
            }
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log("Error in updateUser controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
