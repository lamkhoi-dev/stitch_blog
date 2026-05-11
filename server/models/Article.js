const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ['tin-tuc', 'case-study', 'topic-post'],
    },
    topic: { type: String, default: null },
    parentCategory: { type: String, default: null },
    tags: [{ type: String, trim: true }],
    author: {
      name: { type: String, default: 'Ban biên tập Logiverse' },
      title: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
    },
    coverImage: { type: String, default: '' },
    publishDate: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 phút' },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

articleSchema.pre('save', function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true, locale: 'vi' });
  }
});

module.exports = mongoose.model('Article', articleSchema);
