const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const slugify = require('slugify');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Article = require('../models/Article');
const Book = require('../models/Book');
const Document = require('../models/Document');

const toSlug = (str) => slugify(str, { lower: true, strict: true, locale: 'vi' });

const IMG = {
  port: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=500&fit=crop',
  ship: 'https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?w=800&h=500&fit=crop',
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
  truck: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop',
  factory: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop',
  ai: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
  chart: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  container: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop',
  drone: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=500&fit=crop',
  train: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop',
  cold: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
  customs: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
  green: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop',
  book6: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=700&fit=crop',
  book7: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=700&fit=crop',
  book8: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=700&fit=crop',
  book9: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=700&fit=crop',
  book10: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&h=700&fit=crop',
  doc4: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=500&fit=crop',
  doc5: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop',
};

const content = (title) => `<p class="drop-cap">Trong bối cảnh logistics toàn cầu đang chuyển mình mạnh mẽ, "${title}" là chủ đề được các chuyên gia hàng đầu đặc biệt quan tâm trong năm 2024.</p><p>Dữ liệu từ các tổ chức nghiên cứu quốc tế cho thấy xu hướng này đang tác động trực tiếp đến chi phí vận hành và khả năng cạnh tranh của doanh nghiệp Việt Nam trên thị trường toàn cầu.</p><blockquote>"Tối ưu hóa không phải là lựa chọn — đó là điều kiện để tồn tại trong chuỗi cung ứng hiện đại."<cite>— Báo cáo Supply Chain 2024</cite></blockquote><h2>Phân tích chuyên sâu</h2><p>Nghiên cứu từ 200 doanh nghiệp logistics hàng đầu khu vực ASEAN chỉ ra rằng việc áp dụng công nghệ và tối ưu hóa quy trình có thể giảm đến 25% chi phí vận hành trong vòng 18 tháng.</p><h2>Xu hướng và dự báo</h2><p>Với sự phát triển của AI và tự động hóa, ngành logistics đang bước vào kỷ nguyên mới — nơi dữ liệu thời gian thực và ra quyết định tự động trở thành lợi thế cạnh tranh cốt lõi.</p><h2>Kết luận</h2><p>Doanh nghiệp cần hành động ngay hôm nay để không bị bỏ lại phía sau trong cuộc đua chuyển đổi số của ngành logistics.</p>`;

const authors = [
  { name: 'TS. Nguyễn Minh Trí', title: 'Chuyên gia Logistics Quốc tế' },
  { name: 'Hương Lan', title: 'Biên tập viên Logiverse' },
  { name: 'Lê Cường', title: 'Phân tích viên Chuỗi cung ứng' },
  { name: 'TS. Đặng Minh Quân', title: 'Giảng viên Đại học Ngoại thương' },
  { name: 'Nguyễn Thùy Linh', title: 'Chuyên gia Thương mại Quốc tế' },
  { name: 'Trần Hoàng Nam', title: 'Tư vấn Vận tải & Hải quan' },
  { name: 'Phạm Bảo Châu', title: 'Chuyên gia ESG & Logistics Xanh' },
];

const moreArticles = [
  // Tin tức
  { title: 'Cảng Lạch Huyện mở rộng giai đoạn 2: Cú hích cho logistics miền Bắc', category: 'tin-tuc', coverImage: IMG.port, excerpt: 'Dự án mở rộng 2 tỷ USD sẽ nâng công suất cảng lên 5 triệu TEU/năm vào 2026.', tags: ['Cảng biển', 'Hạ tầng', 'Miền Bắc'], readTime: '7 phút' },
  { title: 'DHL công bố đầu tư 1 tỷ USD vào mạng lưới kho thông minh Đông Nam Á', category: 'tin-tuc', coverImage: IMG.warehouse, excerpt: 'Hệ thống kho tự động thế hệ mới với robot AMR và AI picking sẽ được triển khai tại 8 quốc gia.', tags: ['DHL', 'Kho thông minh', 'Robot'], readTime: '8 phút' },
  { title: 'Freight rates Á-Âu giảm 40% sau khi tuyến Suez dần ổn định', category: 'tin-tuc', coverImage: IMG.ship, excerpt: 'Cước vận tải container trên tuyến Á-Âu đang điều chỉnh về mức cân bằng mới.', tags: ['Cước vận tải', 'Suez', 'Á-Âu'], readTime: '6 phút' },
  { title: 'Việt Nam lọt top 10 quốc gia có tốc độ tăng trưởng logistics nhanh nhất', category: 'tin-tuc', coverImage: IMG.chart, excerpt: 'Báo cáo Agility 2024 xếp Việt Nam ở vị trí thứ 8 về chỉ số tăng trưởng thị trường logistics.', tags: ['Việt Nam', 'Tăng trưởng', 'Agility'], readTime: '5 phút' },
  { title: 'Công nghệ drone delivery bắt đầu thử nghiệm thương mại tại TP.HCM', category: 'tin-tuc', coverImage: IMG.drone, excerpt: 'Giao hàng bằng drone có thể giảm 60% thời gian so với phương thức truyền thống trong nội đô.', tags: ['Drone', 'Last-mile', 'TP.HCM'], readTime: '9 phút' },
  { title: 'Hiệp định RCEP thúc đẩy thương mại nội khối tăng 18% năm 2024', category: 'tin-tuc', coverImage: IMG.container, excerpt: 'RCEP đang tái định hình dòng chảy thương mại và logistics trong khu vực ASEAN+6.', tags: ['RCEP', 'Thương mại', 'ASEAN'], readTime: '10 phút' },
  { title: 'Thiếu hụt tài xế xe tải: Bài toán nan giải của logistics Việt Nam', category: 'tin-tuc', coverImage: IMG.truck, excerpt: 'Ngành vận tải đang thiếu khoảng 150.000 tài xế có tay nghề, ảnh hưởng đến chuỗi cung ứng nội địa.', tags: ['Nhân lực', 'Xe tải', 'Vận tải nội địa'], readTime: '8 phút' },
  { title: 'Amazon triển khai mô hình kho tự động thế hệ 4 tại châu Á', category: 'tin-tuc', coverImage: IMG.factory, excerpt: 'Hệ thống Robotic Fulfillment Center mới có thể xử lý 500.000 đơn hàng/ngày với độ chính xác 99.9%.', tags: ['Amazon', 'Tự động hóa', 'Fulfillment'], readTime: '11 phút' },
  // Case Studies
  { title: 'Masan Group tối ưu cold chain: Từ 3°C đến tay người tiêu dùng trong 6 giờ', category: 'case-study', coverImage: IMG.cold, excerpt: 'Bài học về xây dựng chuỗi lạnh tích hợp từ sản xuất đến phân phối bán lẻ.', tags: ['Cold chain', 'FMCG', 'Masan'], readTime: '16 phút' },
  { title: 'Samsung HCMC CE: Quản lý 200 nhà cung cấp linh kiện xuyên biên giới', category: 'case-study', coverImage: IMG.factory, excerpt: 'Cách Samsung áp dụng Supplier Relationship Management để đảm bảo zero-defect trong sản xuất điện tử.', tags: ['Samsung', 'Supplier', 'Electronics'], readTime: '22 phút' },
  { title: 'Grab Logistics: Tận dụng nền tảng gig economy cho last-mile delivery', category: 'case-study', coverImage: IMG.truck, excerpt: 'Mô hình crowdsourced delivery của Grab đã giảm 35% chi phí giao hàng chặng cuối tại TP.HCM.', tags: ['Grab', 'Gig economy', 'Last-mile'], readTime: '14 phút' },
  { title: 'Thaco Trường Hải: Logistics nội địa hóa chuỗi cung ứng ô tô', category: 'case-study', coverImage: IMG.port, excerpt: 'Chiến lược xây dựng hệ sinh thái logistics khép kín từ linh kiện đến xe hoàn chỉnh tại Chu Lai.', tags: ['Thaco', 'Ô tô', 'Nội địa hóa'], readTime: '19 phút' },
  // Topic posts bổ sung
  { title: 'Vận đơn đường biển Bill of Lading: Phân loại và Ứng dụng', category: 'topic-post', topic: 'duong-bien', parentCategory: 'logistics', coverImage: IMG.customs, excerpt: 'Hướng dẫn toàn diện về các loại B/L: Original, Telex Release, Sea Waybill.', tags: ['Bill of Lading', 'Chứng từ', 'Vận đơn'], readTime: '12 phút' },
  { title: 'Phân tích chi phí THC và các phụ phí cảng biển 2024', category: 'topic-post', topic: 'duong-bien', parentCategory: 'logistics', coverImage: IMG.port, excerpt: 'Breakdown các loại surcharge: THC, PSS, BAF, CAF và cách đàm phán với hãng tàu.', tags: ['THC', 'Surcharge', 'Chi phí'], readTime: '10 phút' },
  { title: 'AWB — Air Waybill: Chứng từ then chốt trong vận tải hàng không', category: 'topic-post', topic: 'hang-khong', parentCategory: 'logistics', coverImage: IMG.drone, excerpt: 'Phân biệt Master AWB và House AWB, quy trình phát hành và kiểm tra chứng từ.', tags: ['AWB', 'Hàng không', 'Chứng từ'], readTime: '9 phút' },
  { title: 'Cross-border e-commerce logistics: Thách thức hải quan và thuế', category: 'topic-post', topic: 'hang-khong', parentCategory: 'logistics', coverImage: IMG.customs, excerpt: 'Giải pháp tối ưu cho doanh nghiệp xuất khẩu hàng thương mại điện tử xuyên biên giới.', tags: ['E-commerce', 'Hải quan', 'Thuế'], readTime: '13 phút' },
  { title: 'Green Logistics: Chiến lược giảm phát thải carbon trong vận tải', category: 'topic-post', topic: 'da-phuong-thuc', parentCategory: 'logistics', coverImage: IMG.green, excerpt: 'Framework để tính toán và giảm thiểu carbon footprint trong chuỗi cung ứng.', tags: ['Green', 'Carbon', 'ESG'], readTime: '11 phút' },
  { title: 'Digital Freight Forwarding: Xu hướng thay thế forwarder truyền thống', category: 'topic-post', topic: 'da-phuong-thuc', parentCategory: 'logistics', coverImage: IMG.ai, excerpt: 'Flexport, Freightos và làn sóng digitalization đang thay đổi nghề freight forwarding.', tags: ['Digital', 'Freight', 'Forwarding'], readTime: '10 phút' },
  { title: 'VMI — Vendor Managed Inventory: Chia sẻ rủi ro tồn kho với nhà cung cấp', category: 'topic-post', topic: 'planning', parentCategory: 'chuoi-cung-ung', coverImage: IMG.warehouse, excerpt: 'Mô hình VMI giúp giảm stockout 40% và cắt giảm chi phí tồn kho cho cả hai bên.', tags: ['VMI', 'Tồn kho', 'Nhà cung cấp'], readTime: '9 phút' },
  { title: 'CPFR — Hoạch định và dự báo cộng tác với đối tác bán lẻ', category: 'topic-post', topic: 'planning', parentCategory: 'chuoi-cung-ung', coverImage: IMG.chart, excerpt: 'Triển khai CPFR giữa nhà sản xuất và siêu thị để đồng bộ kế hoạch bán hàng.', tags: ['CPFR', 'Dự báo', 'Cộng tác'], readTime: '11 phút' },
  { title: 'Nearshoring và Friendshoring: Chiến lược tái cấu trúc chuỗi cung ứng', category: 'topic-post', topic: 'sourcing', parentCategory: 'chuoi-cung-ung', coverImage: IMG.factory, excerpt: 'Làn sóng dịch chuyển sản xuất về gần thị trường tiêu thụ và tác động với Việt Nam.', tags: ['Nearshoring', 'Chuỗi cung ứng', 'Địa chính trị'], readTime: '14 phút' },
  { title: 'Six Sigma trong kiểm soát chất lượng sản xuất logistics', category: 'topic-post', topic: 'manufacturing', parentCategory: 'chuoi-cung-ung', coverImage: IMG.chart, excerpt: 'Áp dụng DMAIC để giảm tỷ lệ lỗi từ 3.4 lỗi/triệu cơ hội trong quy trình đóng gói.', tags: ['Six Sigma', 'Chất lượng', 'DMAIC'], readTime: '12 phút' },
];

const moreBooks = [
  { title: 'Quản trị Rủi ro Chuỗi Cung ứng Toàn cầu', author: 'NXB Kinh tế TP.HCM', year: 2024, coverImage: IMG.book6, description: 'Phân tích framework SCRM — Supply Chain Risk Management với các case study thực tế từ COVID-19 và khủng hoảng Biển Đỏ. Phương pháp xây dựng kế hoạch dự phòng đa lớp.', chapters: [{ title: 'Nhận diện và phân loại rủi ro', excerpt: 'Ma trận rủi ro và phương pháp scoring.' }, { title: 'Kế hoạch Business Continuity', excerpt: 'BCP trong logistics và sản xuất.' }] },
  { title: 'Hải quan Điện tử và Thương mại Quốc tế', author: 'TS. Trần Văn Hùng', year: 2023, coverImage: IMG.book7, description: 'Hướng dẫn toàn diện về hệ thống VNACCS/VCIS, khai báo điện tử, phân luồng hàng hóa và các quy định mới nhất của Hải quan Việt Nam theo chuẩn WCO.', chapters: [{ title: 'VNACCS/VCIS từ A-Z', excerpt: 'Quy trình khai báo điện tử chi tiết.' }, { title: 'Phân luồng và kiểm tra hàng', excerpt: 'Luồng xanh, vàng, đỏ.' }] },
  { title: 'Cold Chain Logistics: Chuỗi lạnh từ Trang trại đến Bàn ăn', author: 'Logiverse Press', year: 2024, coverImage: IMG.book8, description: 'Thiết kế và vận hành hệ thống chuỗi lạnh cho hàng thực phẩm, dược phẩm. Bao gồm tiêu chuẩn GDP, GMP, công nghệ IoT monitoring nhiệt độ và xử lý sự cố.', chapters: [{ title: 'Tiêu chuẩn GDP trong vận tải lạnh', excerpt: 'Quy định và kiểm soát nhiệt độ.' }, { title: 'IoT và giám sát real-time', excerpt: 'Hệ thống cảnh báo tự động.' }] },
  { title: 'E-Commerce Logistics: Mô hình Fulfillment Hiện đại', author: 'NXB Bách Khoa', year: 2023, coverImage: IMG.book9, description: 'Xây dựng hệ thống fulfillment cho thương mại điện tử: từ warehouse layout, WMS tích hợp, đến chiến lược last-mile delivery và xử lý hàng hoàn (reverse logistics).', chapters: [{ title: 'Warehouse Design cho e-commerce', excerpt: 'Slotting và flow optimization.' }, { title: 'Reverse Logistics', excerpt: 'Quy trình xử lý hàng hoàn hiệu quả.' }] },
  { title: 'Đàm phán Hợp đồng Ngoại thương Thực chiến', author: 'LS. Nguyễn Văn Lợi', year: 2024, coverImage: IMG.book10, description: 'Kỹ năng đàm phán và soạn thảo hợp đồng ngoại thương, từ term sheet đến final agreement. Kèm 50 tình huống tranh chấp thực tế và bài học kinh nghiệm.', chapters: [{ title: 'Cấu trúc hợp đồng ngoại thương', excerpt: 'Các điều khoản cốt lõi.' }, { title: 'Giải quyết tranh chấp quốc tế', excerpt: 'Trọng tài và tòa án thương mại.' }] },
];

const moreDocuments = [
  // Hợp đồng
  { title: 'Hợp đồng Đại lý Vận tải Quốc tế (Freight Agency Agreement)', type: 'hop-dong', coverImage: IMG.doc4, description: 'Mẫu hợp đồng chuẩn giữa chủ hàng và đại lý vận tải quốc tế theo thông lệ FIATA, quy định rõ phạm vi dịch vụ, phí đại lý và trách nhiệm pháp lý.' },
  { title: 'Hợp đồng Thuê kho Logistics và Dịch vụ 3PL', type: 'hop-dong', coverImage: IMG.doc5, description: 'Template hợp đồng thuê kho và dịch vụ logistics bên thứ ba (3PL), bao gồm SLA, KPI vận hành, điều khoản bảo mật thông tin và chính sách bồi thường.' },
  { title: 'Hợp đồng Vận chuyển Hàng lạnh (Cold Chain Transport)', type: 'hop-dong', coverImage: IMG.doc4, description: 'Hợp đồng chuyên biệt cho vận chuyển hàng hóa yêu cầu kiểm soát nhiệt độ, bao gồm điều khoản về thiết bị, giám sát và trách nhiệm khi vi phạm chuỗi lạnh.' },
  // Chứng từ
  { title: 'Bộ chứng từ xuất khẩu theo điều kiện FOB đầy đủ', type: 'chung-tu', coverImage: IMG.customs, description: 'Hướng dẫn chuẩn bị trọn bộ chứng từ xuất khẩu FOB: Commercial Invoice, Packing List, B/L, C/O, phytosanitary certificate và các chứng từ bổ sung.' },
  { title: 'Mẫu L/C (Letter of Credit) và Hướng dẫn kiểm tra chứng từ', type: 'chung-tu', coverImage: IMG.doc5, description: 'Cấu trúc thư tín dụng theo UCP 600, các loại L/C phổ biến, checklist kiểm tra bất hợp lệ chứng từ và xử lý discrepancy với ngân hàng.' },
  { title: 'Tờ khai hải quan xuất nhập khẩu — Mẫu HQ 2024', type: 'chung-tu', coverImage: IMG.customs, description: 'Mẫu tờ khai hải quan mới nhất theo Thông tư 38/2015 (sửa đổi), hướng dẫn điền từng ô tiêu chí, mã HS code và xử lý các trường hợp đặc biệt.' },
  // Incoterms
  { title: 'FCA — Free Carrier: Điều kiện linh hoạt nhất Incoterms 2020', type: 'incoterms', coverImage: IMG.truck, description: 'FCA 2020 có điều chỉnh quan trọng: người mua có thể yêu cầu hãng tàu phát hành B/L ghi "On Board". Phân tích điểm chuyển giao rủi ro và nghĩa vụ thông quan.' },
  { title: 'CPT và CIP: Sự khác biệt về bảo hiểm hàng hóa', type: 'incoterms', coverImage: IMG.container, description: 'So sánh chi tiết CPT (Carriage Paid To) và CIP (Carriage and Insurance Paid To) — hai điều kiện C-group cho mọi phương thức vận tải, lưu ý về mức tối thiểu bảo hiểm CIP theo ICC (A).' },
  { title: 'DAP, DPU, DDP: Nhóm D-terms và trách nhiệm người bán', type: 'incoterms', coverImage: IMG.warehouse, description: 'Phân tích nhóm D-terms trong Incoterms 2020: DAP (Delivered At Place), DPU (Delivered at Place Unloaded) và DDP (Delivered Duty Paid). So sánh mức độ trách nhiệm và rủi ro người bán phải gánh.' },
];

const seedMore = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB...');

    let aCount = 0, bCount = 0, dCount = 0;

    for (const a of moreArticles) {
      const slug = toSlug(a.title);
      const exists = await Article.findOne({ slug });
      if (!exists) {
        const authorObj = authors[Math.floor(Math.random() * authors.length)];
        await new Article({
          ...a,
          slug,
          content: content(a.title),
          author: authorObj,
          publishDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          status: 'published',
          viewCount: Math.floor(Math.random() * 8000) + 300,
        }).save();
        aCount++;
      }
    }
    console.log(`✅ Added ${aCount} new articles (skipped ${moreArticles.length - aCount} duplicates)`);

    for (const b of moreBooks) {
      const slug = toSlug(b.title);
      const exists = await Book.findOne({ slug });
      if (!exists) {
        await new Book({ ...b, slug, status: 'published' }).save();
        bCount++;
      }
    }
    console.log(`✅ Added ${bCount} new books`);

    for (const d of moreDocuments) {
      const slug = toSlug(d.title);
      const exists = await Document.findOne({ slug });
      if (!exists) {
        await new Document({ ...d, slug, status: 'published' }).save();
        dCount++;
      }
    }
    console.log(`✅ Added ${dCount} new documents`);

    // Summary
    const [totalA, totalB, totalD] = await Promise.all([
      Article.countDocuments({ status: 'published' }),
      Book.countDocuments({ status: 'published' }),
      Document.countDocuments({ status: 'published' }),
    ]);
    console.log(`\n📊 Database totals:`);
    console.log(`   Articles : ${totalA}`);
    console.log(`   Books    : ${totalB}`);
    console.log(`   Documents: ${totalD}`);
    console.log('\n🎉 Seed-more completed!');
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
};

seedMore();
