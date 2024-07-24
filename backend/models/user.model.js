import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    FullName:{
        type: String,
        required: true,
    }, 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    Email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
},{ timestamps: true, // Enables createdAt and updatedAt fields
versionKey: false // Optional: Disables the __v field if you don't need versioning);
})

const User = mongoose.model('User', userSchema);

export default User;
