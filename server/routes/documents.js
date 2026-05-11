const express = require('express');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/documents
router.get('/', async (req, res) => {
  try {
    const { type, status, page = 1, limit = 12, search } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (status === '') { /* admin: show all */ }
    else if (status) filter.status = status;
    else filter.status = 'published';
    if (search) filter.title = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [documents, total] = await Promise.all([
      Document.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Document.countDocuments(filter),
    ]);

    res.json({ documents, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/documents/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const doc = await Document.findOne({ slug: req.params.slug });
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy tài liệu' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/documents/:id
router.get('/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy tài liệu' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// POST /api/documents (auth)
router.post('/', auth, async (req, res) => {
  try {
    const doc = new Document(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo tài liệu', error: error.message });
  }
});

// PUT /api/documents/:id (auth)
router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy tài liệu' });
    res.json(doc);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
});

// DELETE /api/documents/:id (auth)
router.delete('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy tài liệu' });
    res.json({ message: 'Đã xóa tài liệu' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa', error: error.message });
  }
});

module.exports = router;
