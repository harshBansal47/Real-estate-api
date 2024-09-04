const express = require('express')
const {authcontroller} = require('../controllers/authcontroller');
const router = express.Router();

router.get('/',authcontroller);

module.exports = router;