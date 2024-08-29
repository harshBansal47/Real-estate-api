const express = require('express');
const { addBuilder } = require('../controllers/builderController');
const router = express.Router();


// Define the builder add route
router.post('/addBuilder',addBuilder);



module.exports = router;