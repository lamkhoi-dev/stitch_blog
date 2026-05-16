const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const auth = require('../middleware/auth');

// POST /api/subscribers — public, user submits email
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Email không hợp lệ.' });
  }

  try {
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email này đã được đăng ký.' });
    }

    const subscriber = new Subscriber({ email, source: req.body.source || 'footer' });
    await subscriber.save();

    res.status(201).json({ message: 'Đăng ký thành công! Cảm ơn bạn đã theo dõi Logiknowledge.' });
  } catch (err) {
    console.error('Subscriber error:', err);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại.' });
  }
});

// GET /api/subscribers — admin only, list all subscribers
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = status ? { status } : {};
    const total = await Subscriber.countDocuments(filter);
    const subscribers = await Subscriber.find(filter)
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ subscribers, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

// DELETE /api/subscribers/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa subscriber.' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

module.exports = router;
