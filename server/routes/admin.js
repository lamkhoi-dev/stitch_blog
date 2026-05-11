const express = require('express');
const auth = require('../middleware/auth');
const Article = require('../models/Article');
const Topic = require('../models/Topic');
const Book = require('../models/Book');
const Document = require('../models/Document');

const router = express.Router();

// GET /api/admin/stats — dashboard aggregate stats (auth required)
router.get('/stats', auth, async (req, res) => {
  try {
    const [totalArticles, totalDrafts, totalPublished, totalTopics, totalBooks, totalDocuments, recentArticles] =
      await Promise.all([
        Article.countDocuments(),
        Article.countDocuments({ status: 'draft' }),
        Article.countDocuments({ status: 'published' }),
        Topic.countDocuments(),
        Book.countDocuments(),
        Document.countDocuments(),
        Article.find().sort({ createdAt: -1 }).limit(5).select('title category status createdAt viewCount'),
      ]);

    res.json({
      totalArticles,
      totalDrafts,
      totalPublished,
      totalTopics,
      totalBooks,
      totalDocuments,
      recentArticles,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
