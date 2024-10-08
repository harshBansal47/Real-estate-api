const bcrypt = require('bcrypt');
const User = require('../models/UserModel'); // Assuming your User model is in the 'models' folder
var jwt = require('jsonwebtoken')

// Controller for registering a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();
        console.log("new user create at", savedUser.createdAt);

        res.status(201).json({ status: "success", role: savedUser.role });
    } catch (error) {
        // Ensure to log the error for debugging
        console.error('Error during user registration:', error);

        // Properly format the error response
        res.status(500).json({ status: "error", message: "Server error", details: error.message });
    }
};

// Controller for verifying user login

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Check if the provided password matches the one stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        // Prepare JWT payload and sign token
        const jwt_payload = {
            id: user._id,
            role: user.role,
            username: user.username
        };

        const secretkey = process.env.SECRET_KEY || "-zFO3i8ka5SgWst1faIRlXxPjVJ1xVZRmSCYBWDN5UmHVXpPiiR_WKL8JHMKJ8Q2eZROxUWu6ADk-m4frR1bnA";
        const token = jwt.sign(jwt_payload, secretkey, { expiresIn: '1h' });

        // Send back the token and user's role
        res.status(200).json({ status: "success", token: token, role: user.role });

    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ status: "error", message: "Server error", details: error.message });
    }
};