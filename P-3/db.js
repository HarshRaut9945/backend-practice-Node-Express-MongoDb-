import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.DB_URL;

mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB server"))
  .catch(err => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on("disconnected", () => console.log("MongoDB disconnected"));

export default db;
