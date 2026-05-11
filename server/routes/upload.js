const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/upload — single file upload (auth required)
// Returns absolute URL — works for both Cloudinary and local disk storage
router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file được upload' });
  }

  // Cloudinary returns req.file.path as the full CDN URL
  // Local disk storage returns req.file.filename, so we build the URL manually
  const url = req.file.path || `/uploads/${req.file.filename}`;
  const isCloudinary = url.startsWith('http');

  res.json({
    url,
    isCloudinary,
    filename: req.file.filename || req.file.public_id || null,
    originalName: req.file.originalname,
  });
});

module.exports = router;
