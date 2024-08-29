const app = require('./app');
const connectDB = require('./config'); // Import the database connection function

const PORT = process.env.PORT || 3000;

// Connect to Datbase
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
