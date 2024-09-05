const jwt = require('jsonwebtoken');

exports.authcontroller = (req, res) => {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization']; // Use 'authorization' in lowercase
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const secretkey = process.env.SECRET_KEY || "-zFO3i8ka5SgWst1faIRlXxPjVJ1xVZRmSCYBWDN5UmHVXpPiiR_WKL8JHMKJ8Q2eZROxUWu6ADk-m4frR1bnA";
        
        // Verify the token
        const payload = jwt.verify(token, secretkey);

        // Check if token is about to expire (optional)
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeToExpire = payload.exp - currentTime;

        // Renew the token if it's about to expire (e.g., within 15 minutes)
        const newToken = timeToExpire < 15 * 60
            ? jwt.sign({ id: payload.id, role: payload.role, username: payload.username }, secretkey, { expiresIn: '1h' })
            : token; // Use the existing token if it's still valid

        res.status(200).json({ 
            status: 'success', 
            token: newToken, // Always send the token
            message: 'Token is valid', // You can customize this message as needed
            role: payload.role,
            username: payload.username
        });

    } catch (error) {
        // Handle token expiration or other JWT-related errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please login again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid token.' });
        } else {
            // For any other errors
            console.error('Token verification failed:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
};
