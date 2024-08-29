const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config(); 

//initiallize app
const app = express();

// Middleware
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(cors()); // Enable CORS - Cross-Origin Resource Sharing
app.use(morgan('dev')); // HTTP request logger for development
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

//initiallize router
const router = express.Router();
app.use(router);

//Search Api Route
const searchroutes = require('./routes/SearchRoute')
app.use('/props/search',searchroutes);

//Builder Api Route
const builderroutes = require('./routes/BuilderRoute')
app.use('/props/builder',builderroutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to the console
  res.status(500).send({
    success: false,
    message: 'Something went wrong!'
  });
});

module.exports = app;