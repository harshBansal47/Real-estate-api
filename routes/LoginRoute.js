const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/loginController'); // Adjust path as necessary

// Route for registering a new user
router.post('/register', registerUser);

// Route for user login
router.post('/', loginUser); // Using the base path for login

module.exports = router;