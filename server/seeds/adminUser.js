const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: 'admin@logiverse.vn' });
    if (existing) {
      console.log('Admin user already exists — skipping.');
      return process.exit(0);
    }

    const admin = new User({
      email: 'admin@logiverse.vn',
      password: 'Admin@2024',
      name: 'Logiverse Admin',
      role: 'admin',
    });
    await admin.save();
    console.log('✅ Admin user created: admin@logiverse.vn / Admin@2024');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedAdmin();
