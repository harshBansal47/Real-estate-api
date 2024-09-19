const express = require('express');
const  { createProperty,getAllProperties,deleteProperty,updateProperty,getPropertyById } = require('../controllers/propertiesController');
const multer  = require('multer')
const router = express.Router();





const uploadFields = upload.fields([
    { name: 'brandImage', maxCount: 1 },
    { name: 'siteImages[]', maxCount: 10 }, // Adjust maxCount based on your needs
    { name: 'brochure', maxCount: 1 },
    { name: 'sitePlans[0][imageUpload]', maxCount: 1 }, // For dynamic site plan image
  ]);

router.post('/create',upload.fields([
    { name: 'brandImage', maxCount: 1 },
    { name: 'siteImages[]', maxCount: 10 },
    { name: 'brochure', maxCount: 1 },
    { name: 'sitePlans[0][imageUpload]', maxCount: 1 },
    // Add more for additional plans if necessary
  ]),createProperty);

router.get('/getAll',getAllProperties);
router.get('/delete/:id',deleteProperty);
router.get('/update/:id',updateProperty);
router.get('/findone/:id',getPropertyById);

module.exports = router;