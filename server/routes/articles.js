const express = require('express');
const Article = require('../models/Article');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/articles — list with filters & pagination
router.get('/', async (req, res) => {
  try {
    const { category, topic, parentCategory, status, page = 1, limit = 12, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (topic) filter.topic = topic;
    if (parentCategory) filter.parentCategory = parentCategory;

    // If status is explicitly empty string, show all (admin mode).
    // If status is set, use it. Otherwise default to published (public).
    if (status === '') {
      // no status filter — show all
    } else if (status) {
      filter.status = status;
    } else {
      filter.status = 'published';
    }

    if (search) filter.title = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [articles, total] = await Promise.all([
      Article.find(filter).sort({ publishDate: -1 }).skip(skip).limit(parseInt(limit)),
      Article.countDocuments(filter),
    ]);

    res.json({
      articles,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/articles/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/articles/:id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// POST /api/articles — create (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Slug đã tồn tại, vui lòng đổi tiêu đề' });
    }
    res.status(400).json({ message: 'Lỗi tạo bài viết', error: error.message });
  }
});

// PUT /api/articles/:id — update (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
});

// DELETE /api/articles/:id — delete (auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    res.json({ message: 'Đã xóa bài viết' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa', error: error.message });
  }
});

module.exports = router;
