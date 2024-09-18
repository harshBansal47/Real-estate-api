const express = require('express');
const  { createProperty,getAllProperties,deleteProperty,updateProperty,getPropertyById } = require('../controllers/propertiesController');
const multer  = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Specify folder for uploads
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
    },
  });

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: function (req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf') {
        return cb(new Error('Only images and PDFs are allowed.'));
      }
      cb(null, true);
    },
  });


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