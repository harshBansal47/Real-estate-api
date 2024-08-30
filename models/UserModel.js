const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'user'], // Allowed values for the role
        default: 'user'
    }
}, { timestamps: true });

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;