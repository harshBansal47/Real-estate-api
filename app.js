const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config(); 
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Initialize app
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // HTTP request logger for development

// Multer configuration to save files in 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Dynamically create the folder if it doesn't exist
    }
    cb(null, dir); // Set the folder for saving uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique file name
  }
});

// Multer upload middleware
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // Set a file size limit (100MB)
});

// Function to get dynamic upload fields for site plans and site images
const getUploadFields = (maxSitePlans, maxSiteImages) => {
  const fields = [
    { name: 'brandImage', maxCount: 1 },
    { name: 'brochure', maxCount: 1 }
  ];

  // Dynamically add sitePlans file fields
  for (let i = 0; i < maxSitePlans; i++) {
    fields.push({ name: `sitePlans[${i}][imageUpload]`, maxCount: 1 });
  }

  // Dynamically add siteImages file fields
  for (let i = 0; i < maxSiteImages; i++) {
    fields.push({ name: `siteImages[${i}]`, maxCount: 1 });
  }

  return fields;
};

// Property Api Route
const { createProperty } = require('./controllers/propertiesController');
app.post('/api/property/create', upload.fields(getUploadFields(4, 6)), createProperty); // Directly use upload.fields

// Other routes...
const loginroutes = require('./routes/LoginRoute');
app.use('/api/login', loginroutes);

const authroutes = require('./routes/AuthRoute');
app.use('/api/auth', authroutes);

const searchroutes = require('./routes/SearchRoute');
app.use('/api/search', searchroutes);

const emailroute = require('./routes/EmailRoute');
app.use('/api/send-email', emailroute);

const builderroutes = require('./routes/BuilderRoute');
app.use('/props/builder', builderroutes);

const galleryroute = require('./routes/GalleryRoute');

app.use('/api/gallery', galleryroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to the console
  res.status(500).send({
    success: false,
    message: 'Something went wrong!'
  });
});

module.exports = app;