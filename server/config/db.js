// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to MongoDB at:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop the server
  }
};

export default connectDB;
