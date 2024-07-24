import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    senderUsername:
    {
        type: String,
        required: true,
    },
    receiverUsername:
    {
        type: String,
        required: true
    },
    amount:
    {
        type: Number,
        required: true
    },
    



} , { timestamps: true, // Enables createdAt and updatedAt fields)
})

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment