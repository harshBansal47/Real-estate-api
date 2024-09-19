const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config(); 
const multer  = require('multer')
const bodyParser = require('body-parser');

//initiallize app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(cors()); // Enable CORS - Cross-Origin Resource Sharing
app.use(morgan('dev')); // HTTP request logger for development
// app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

//initiallize router
const router = express.Router();
app.use(router);

//Login Api Route
const loginroutes = require('./routes/LoginRoute')
app.use('/api/login',loginroutes)

//Auth Route
const authroutes = require('./routes/AuthRoute')
app.use('/api/auth',authroutes);

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
  limits: { fileSize: 20 * 1024 * 1024 }, // Increase limit to 20MB (for example)
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
  { name: 'sitePlans', maxCount: 4 }, // For dynamic site plan image
]);

//Property Api Route
const propertyroute = require('./routes/PropertyRoute')
const {createProperty} = require('./controllers/propertiesController')
// app.use('/api/property');
app.use('/api/property/create',uploadFields,createProperty);

//Search Api Route
const searchroutes = require('./routes/SearchRoute')
app.use('/api/search',searchroutes);

//Email Api Route
const emailroute = require('./routes/EmailRoute')
app.use('/api/send-email',emailroute);

//Builder Api Route
const builderroutes = require('./routes/BuilderRoute')
app.use('/props/builder',builderroutes);

//Gallery Api Route
const galleryroute = require('./routes/GalleryRoute');
app.use('/api/gallery',galleryroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to the console
  res.status(500).send({
    success: false,
    message: 'Something went wrong!'
  });
});

module.exports = app;