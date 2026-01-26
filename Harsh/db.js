const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URL
const mongoUrl = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Connection instance
const db = mongoose.connection;

// Optional event listeners
db.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
   