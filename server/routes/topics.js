const express = require('express');
const Topic = require('../models/Topic');
const Article = require('../models/Article');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/topics — list all topics (optional filter by parentCategory)
router.get('/', async (req, res) => {
  try {
    const { parentCategory } = req.query;
    const filter = parentCategory ? { parentCategory } : {};
    const topics = await Topic.find(filter).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// GET /api/topics/:slug
router.get('/:slug', async (req, res) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.slug });
    if (!topic) return res.status(404).json({ message: 'Không tìm thấy chủ đề' });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// POST /api/topics — create (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Slug đã tồn tại' });
    }
    res.status(400).json({ message: 'Lỗi tạo chủ đề', error: error.message });
  }
});

// PUT /api/topics/:id — update (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!topic) return res.status(404).json({ message: 'Không tìm thấy chủ đề' });
    res.json(topic);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
});

// DELETE /api/topics/:id — delete (auth required, safeguard: check linked articles)
router.delete('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Không tìm thấy chủ đề' });

    const linkedArticles = await Article.countDocuments({ topic: topic.slug });
    if (linkedArticles > 0) {
      return res.status(400).json({
        message: `Không thể xóa: có ${linkedArticles} bài viết liên kết với chủ đề này`,
      });
    }

    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa chủ đề' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa', error: error.message });
  }
});

module.exports = router;
