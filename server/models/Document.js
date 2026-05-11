const mongoose = require('mongoose');
const slugify = require('slugify');

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ['hop-dong', 'chung-tu', 'incoterms'],
    },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    fileUrl: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    author: {
      name: { type: String, default: 'Ban biên tập Logiverse' },
      title: { type: String, default: '' },
    },
    readTime: { type: String, default: '5 phút' },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

documentSchema.pre('save', function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true, locale: 'vi' });
  }
});

module.exports = mongoose.model('Document', documentSchema);
