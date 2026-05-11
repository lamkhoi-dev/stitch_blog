const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('[DB] Attempting to connect to MongoDB...');
    console.log('[DB] URI prefix:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 30) + '...' : 'MISSING');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DB] MongoDB connection error: ${error.message}`);
    console.error(`[DB] Full error:`, error);
    // Don't exit - let server run so we can debug via /api/health
  }
};

module.exports = connectDB;
