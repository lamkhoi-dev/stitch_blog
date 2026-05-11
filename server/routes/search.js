const express = require('express');
const Article = require('../models/Article');
const Book = require('../models/Book');
const Document = require('../models/Document');

const router = express.Router();

// GET /api/search?q=keyword&type=all|articles|books|documents&limit=20
router.get('/', async (req, res) => {
  try {
    const { q, type = 'all', limit = 20 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.json({ results: [], total: 0, counts: { articles: 0, books: 0, documents: 0 } });
    }

    // Escape regex special characters to prevent injection
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = { $regex: escaped, $options: 'i' };
    const publishedFilter = { status: 'published' };
    const perType = Math.ceil(Number(limit) / 3);

    const queries = [];

    if (type === 'all' || type === 'articles') {
      queries.push(
        Article.find({
          ...publishedFilter,
          $or: [{ title: regex }, { excerpt: regex }, { content: regex }],
        })
          .select('title slug excerpt coverImage category createdAt')
          .sort({ createdAt: -1 })
          .limit(type === 'all' ? perType : Number(limit))
          .lean()
          .then((docs) =>
            docs.map((d) => ({
              _id: d._id,
              type: 'article',
              title: d.title,
              slug: d.slug,
              excerpt: d.excerpt || '',
              coverImage: d.coverImage || '',
              category: d.category || '',
              url: `/tin-tuc/${d.slug}`,
              createdAt: d.createdAt,
            }))
          )
      );
    }

    if (type === 'all' || type === 'books') {
      queries.push(
        Book.find({
          ...publishedFilter,
          $or: [{ title: regex }, { subtitle: regex }, { description: regex }],
        })
          .select('title slug subtitle description coverImage author year createdAt')
          .sort({ createdAt: -1 })
          .limit(type === 'all' ? perType : Number(limit))
          .lean()
          .then((docs) =>
            docs.map((d) => ({
              _id: d._id,
              type: 'book',
              title: d.title,
              slug: d.slug,
              excerpt: d.subtitle || d.description || '',
              coverImage: d.coverImage || '',
              category: `${d.author || ''} • ${d.year || ''}`.trim(),
              url: `/thu-vien/sach/${d.slug}`,
              createdAt: d.createdAt,
            }))
          )
      );
    }

    if (type === 'all' || type === 'documents') {
      queries.push(
        Document.find({
          ...publishedFilter,
          $or: [{ title: regex }, { description: regex }],
        })
          .select('title slug description coverImage type createdAt')
          .sort({ createdAt: -1 })
          .limit(type === 'all' ? perType : Number(limit))
          .lean()
          .then((docs) =>
            docs.map((d) => ({
              _id: d._id,
              type: 'document',
              title: d.title,
              slug: d.slug,
              excerpt: d.description || '',
              coverImage: d.coverImage || '',
              category: d.type === 'hop-dong' ? 'Hợp đồng' : 'Chứng từ',
              url: '/thu-vien/hop-dong-chung-tu',
              createdAt: d.createdAt,
            }))
          )
      );
    }

    const allResults = await Promise.all(queries);
    const merged = allResults.flat();

    // Sort: title-match first, then by date
    const lowerQ = q.toLowerCase();
    merged.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(lowerQ) ? 0 : 1;
      const bTitle = b.title.toLowerCase().includes(lowerQ) ? 0 : 1;
      if (aTitle !== bTitle) return aTitle - bTitle;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const counts = {
      articles: merged.filter((r) => r.type === 'article').length,
      books: merged.filter((r) => r.type === 'book').length,
      documents: merged.filter((r) => r.type === 'document').length,
    };

    res.json({
      results: merged.slice(0, Number(limit)),
      total: merged.length,
      counts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tìm kiếm', error: error.message });
  }
});

module.exports = router;
