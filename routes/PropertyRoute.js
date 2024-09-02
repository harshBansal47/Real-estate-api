const express = require('express');
const  { createProperty } = require('../controllers/propertiesController');

const router = express.Router();

router.post('/create',createProperty);

module.exports = router;