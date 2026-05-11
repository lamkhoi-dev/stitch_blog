const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    subtitle: { type: String, default: '' },
    author: { type: String, required: true },
    year: { type: Number, default: new Date().getFullYear() },
    coverImage: { type: String, default: '' },
    description: { type: String, default: '' },
    readTime: { type: String, default: '10 phút' },
    tags: [{ type: String, trim: true }],
    chapters: [
      {
        title: { type: String },
        excerpt: { type: String },
        content: { type: String, default: '' },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

bookSchema.pre('save', function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true, locale: 'vi' });
  }
});

module.exports = mongoose.model('Book', bookSchema);
