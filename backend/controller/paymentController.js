import Balance from "../models/balance.model.js";
import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";

export const payment = async (req, res) => {
    try {
        const { senderUsername } = req.params;
        const sender = await User.findOne({ username: senderUsername });
        if (!sender) {
            return res.status(400).json({ error: "Sender not found" });
        }

        const { receiverUsername, amount } = req.body;
        const receiver = await User.findOne({ username: receiverUsername });
        if (!receiver) {
            return res.status(400).json({ error: "Receiver not found" });
        }

        // Check if amount is a positive number
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const senderBalance = await Balance.findOne({ user: sender._id });
        if (!senderBalance) {
            return res.status(400).json({ error: "Sender balance not found" });
        }

        const receiverBalance = await Balance.findOne({ user: receiver._id });
        if (!receiverBalance) {
            return res.status(400).json({ error: "Receiver balance not found" });
        }

        if (senderBalance.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        senderBalance.balance -= amount;
        receiverBalance.balance += amount;

        await senderBalance.save();
        await receiverBalance.save();

        const payment = new Payment({
            senderUsername,
            receiverUsername,
            amount,
        });
        await payment.save();

        res.status(200).json({
            senderUsername: payment.senderUsername,
            receiverUsername: payment.receiverUsername,
            amount: payment.amount,
        });
    } catch (error) {
        console.error("Error in payment controller:", error.message); // Use console.error for errors
        res.status(500).json({ error: "Internal server error" });
    }
};
