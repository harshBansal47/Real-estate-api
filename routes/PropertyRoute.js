const express = require('express');
const  { createProperty,getAllProperties,deleteProperty,updateProperty } = require('../controllers/propertiesController');


const router = express.Router();

router.post('/create',createProperty);
router.get('/getAll',getAllProperties);
router.get('/delete/:id',deleteProperty);
router.get('update/:id',updateProperty);

module.exports = router;