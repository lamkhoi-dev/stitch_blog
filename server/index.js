const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Polyfill globalThis.crypto for environments that lack it (e.g. cPanel Passenger)
if (!globalThis.crypto) {
  globalThis.crypto = require('crypto');
}

dotenv.config();

// Log startup for debugging
console.log('[STARTUP] Node.js version:', process.version);
console.log('[STARTUP] NODE_ENV:', process.env.NODE_ENV);
console.log('[STARTUP] MONGO_URI exists:', !!process.env.MONGO_URI);

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().catch(err => {
  console.error('[FATAL] MongoDB connection failed:', err.message);
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      /^http:\/\/localhost:\d+$/,
      /^https?:\/\/(www\.)?logiknowledge\.com$/,
      /^https:\/\/.*\.onrender\.com$/,
    ];
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin || allowed.some(pattern => pattern.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/books', require('./routes/books'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/search', require('./routes/search'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/subscribers', require('./routes/subscribers'));

// Health check + DB debug (combined)
app.get('/api/health', async (req, res) => {
  const mongoose = require('mongoose');
  const result = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    mongoState: mongoose.connection.readyState,
    mongoStateLabel: ['disconnected','connected','connecting','disconnecting'][mongoose.connection.readyState],
    envCheck: {
      MONGO_URI: !!process.env.MONGO_URI,
      MONGO_URI_preview: process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 40) + '...' : 'MISSING',
      JWT_SECRET: !!process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV,
    },
    dbDebug: null,
  };

  // Auto-attempt reconnect if disconnected
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      result.dbDebug = { status: 'reconnected', host: mongoose.connection.host };
      result.mongoState = 1;
      result.mongoStateLabel = 'connected';
    } catch (err) {
      result.dbDebug = {
        status: 'connection_failed',
        error: err.message,
        code: err.code,
        name: err.name,
      };
    }
  } else {
    result.dbDebug = { status: 'already_connected', host: mongoose.connection.host };
  }

  res.json(result);
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  // Catch-all: serve React app for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Lỗi server nội bộ', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

app.listen(PORT, () => {
  console.log(`🚀 Logiverse API server running on port ${PORT}`);
});

// Catch unhandled errors
process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('[FATAL] Unhandled Rejection:', err);
});
