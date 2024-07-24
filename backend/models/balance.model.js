import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    balance: {
        type: Number,

    },
});

const Balance = mongoose.model("Balance", balanceSchema);

export default Balance