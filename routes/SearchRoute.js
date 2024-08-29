const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Define the search route
router.get('/', searchController.searchProperties);

module.exports = router;