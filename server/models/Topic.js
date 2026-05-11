const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nameVi: { type: String, required: true },
    parentCategory: {
      type: String,
      required: true,
      enum: ['logistics', 'chuoi-cung-ung'],
    },
    icon: { type: String, default: 'category' },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Topic', topicSchema);
