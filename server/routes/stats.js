const express = require('express');
const Article = require('../models/Article');
const Book = require('../models/Book');
const Document = require('../models/Document');

const router = express.Router();

// GET /api/stats — public aggregate counts (no auth)
router.get('/', async (req, res) => {
  try {
    const [totalArticles, totalBooks, totalDocuments, totalCaseStudies] =
      await Promise.all([
        Article.countDocuments({ status: 'published' }),
        Book.countDocuments({ status: 'published' }),
        Document.countDocuments({ status: 'published' }),
        Article.countDocuments({ status: 'published', category: 'case-study' }),
      ]);

    res.json({ totalArticles, totalBooks, totalDocuments, totalCaseStudies });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
