const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

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
    ];
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  // Express 5 uses {*path} instead of * for catch-all
  app.get('/{*path}', (req, res) => {
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
