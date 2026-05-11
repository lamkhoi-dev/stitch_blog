const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../models/Topic');
const User = require('../models/User');

const topics = [
  // Logistics (5 modes)
  { slug: 'duong-bien', name: 'Sea Freight', nameVi: 'Vận tải Đường biển & Đường thủy Nội địa', parentCategory: 'logistics', icon: 'directions_boat', description: 'Phân tích chuyên sâu về vận tải đường biển, FCL/LCL, tuyến hàng hải quốc tế.', order: 1 },
  { slug: 'hang-khong', name: 'Air Freight', nameVi: 'Vận tải Hàng không', parentCategory: 'logistics', icon: 'flight_takeoff', description: 'Logistics hàng không, quy trình vận chuyển hàng hóa bằng đường hàng không.', order: 2 },
  { slug: 'duong-bo', name: 'Road Transport', nameVi: 'Vận tải Đường bộ', parentCategory: 'logistics', icon: 'local_shipping', description: 'Vận tải đường bộ, trucking, giao hàng chặng cuối.', order: 3 },
  { slug: 'duong-sat', name: 'Rail Freight', nameVi: 'Vận tải Đường sắt', parentCategory: 'logistics', icon: 'train', description: 'Vận tải đường sắt xuyên biên giới, tuyến China-Europe Railway Express.', order: 4 },
  { slug: 'da-phuong-thuc', name: 'Multimodal', nameVi: 'Vận tải Đa phương thức', parentCategory: 'logistics', icon: 'hub', description: 'Kết hợp nhiều phương thức vận tải, tối ưu hóa chuỗi logistics.', order: 5 },

  // Supply Chain (4 stages)
  { slug: 'procurement', name: 'Procurement', nameVi: 'Procurement — Quản trị Mua hàng', parentCategory: 'chuoi-cung-ung', icon: 'shopping_cart', description: 'Quản trị mua hàng và tìm kiếm nguyên liệu đầu vào bền vững.', order: 1 },
  { slug: 'sourcing', name: 'Sourcing', nameVi: 'Sourcing — Tìm nguồn cung', parentCategory: 'chuoi-cung-ung', icon: 'manage_search', description: 'Chiến lược lựa chọn nhà cung cấp và tối ưu hóa chi phí sản xuất.', order: 2 },
  { slug: 'planning', name: 'Planning', nameVi: 'Planning — Hoạch định', parentCategory: 'chuoi-cung-ung', icon: 'analytics', description: 'Lập kế hoạch nhu cầu và quản trị tồn kho dự phòng.', order: 3 },
  { slug: 'manufacturing', name: 'Manufacturing', nameVi: 'Manufacturing — Sản xuất', parentCategory: 'chuoi-cung-ung', icon: 'precision_manufacturing', description: 'Quy trình sản xuất tinh gọn và kiểm soát chất lượng đầu ra.', order: 4 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Seed topics
    await Topic.deleteMany({});
    await Topic.insertMany(topics);
    console.log(`✅ Seeded ${topics.length} topics`);

    // Seed default admin user
    const existingAdmin = await User.findOne({ email: 'admin@logiverse.com' });
    if (!existingAdmin) {
      await User.create({
        email: 'admin@logiverse.com',
        password: 'admin123',
        name: 'Admin Logiverse',
        role: 'admin',
      });
      console.log('✅ Seeded admin user (admin@logiverse.com / admin123)');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🎉 Seed completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
