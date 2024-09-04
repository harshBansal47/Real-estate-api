const mongoose = require('mongoose');
require('dotenv').config(); 


const connectDB = async () => {
  try {
    const db_url = process.env.DATABASE_URL || "http://localhost:27017/proptrade";
    const conn = await mongoose.connect(db_url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;