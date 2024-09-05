const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController'); // Adjust the path according to your project structure

// Route to add images to the gallery
router.post('/upload', galleryController.addImagesToGallery);
router.get('/getall',galleryController.getAllImagesFromGallery);

module.exports = router;
