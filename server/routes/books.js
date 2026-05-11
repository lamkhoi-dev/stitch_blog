const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/books
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 12, search } = req.query;
    const filter = {};

    if (status === '') { /* admin: show all */ }
    else if (status) filter.status = status;
    else filter.status = 'published';
    if (search) filter.title = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [books, total] = await Promise.all([
      Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Book.countDocuments(filter),
    ]);

    res.json({ books, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/books/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// POST /api/books (auth)
router.post('/', auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo sách', error: error.message });
  }
});

// PUT /api/books/:id (auth)
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
});

// DELETE /api/books/:id (auth)
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.json({ message: 'Đã xóa sách' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa', error: error.message });
  }
});

module.exports = router;
