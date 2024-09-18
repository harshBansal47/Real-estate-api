const mongoose = require('mongoose');
require('dotenv').config();
const detectEnvironment = require('../utils/detectenv');

const connectDB = async () => {
  try {
    const env = await detectEnvironment(); // Wait for environment detection
    console.log('Detected environment:', env);

    if (env === 'local') {
      process.env.DATABASE_URL = "mongodb://localhost:27017/proptrade"; // Set local DB URL
    }

    const db_url = process.env.DATABASE_URL;
    const conn = await mongoose.connect("mongodb+srv://harshbansal472000:OUG3IBzW3iuNZGRM@prop-cluster.afk19.mongodb.net/proptrade"); // Await the DB connection
    console.log(`MongoDB Connected: ${conn.connection.host} ${db_url}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Failed to detect environment or connect to DB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;