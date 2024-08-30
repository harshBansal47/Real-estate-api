const bcrypt = require('bcrypt');
const User = require('../models/UserModel'); // Assuming your User model is in the 'models' folder

// Controller for registering a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        console.log(req.body)
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        // Save the user in the database
        await newUser.save();

        res.status(201).json({status:"suceess", role: user.role });
    } catch (error) {
        res.status(500).send("Server error",error);
    }
};

// Controller for verifying user login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Check if the provided password matches the one stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        // Send back the user's role
        res.status(200).json({status:"suceess", role: user.role });
    } catch (error) {
        res.status(500).send("Server error");
    }
};