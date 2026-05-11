const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const slugify = require('slugify');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Article = require('../models/Article');
const Book = require('../models/Book');
const Document = require('../models/Document');
const Topic = require('../models/Topic');
const User = require('../models/User');

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
  book1: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=700&fit=crop',
  book2: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=700&fit=crop',
  book3: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=700&fit=crop',
  book4: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=700&fit=crop',
  book5: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=700&fit=crop',
  doc1: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
  doc2: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
  doc3: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop',
};

const contentTemplate = (title) => `<p class="drop-cap">Trong bối cảnh kinh tế toàn cầu đang đối mặt với những thay đổi cấu trúc sâu sắc, bài viết "${title}" cung cấp góc nhìn chuyên sâu dựa trên dữ liệu thực chứng từ các chuyên gia hàng đầu trong ngành.</p><p>Dữ liệu từ quý I năm 2024 cho thấy sự gia tăng đáng kể trong chi phí vận hành tại các cảng trung chuyển lớn. Các doanh nghiệp đang dần chuyển đổi từ mô hình "Just-in-Time" sang "Just-in-Case" để ứng phó với rủi ro chuỗi cung ứng.</p><blockquote>"Sự dịch chuyển không còn là một lựa chọn phòng vệ, mà đã trở thành một yêu cầu sinh tồn cho doanh nghiệp hiện đại."<cite>— Báo cáo Logistics Châu Á 2024</cite></blockquote><h2>Tác động của Số hóa và AI</h2><p>Phân tích định lượng từ 500 doanh nghiệp logistics hàng đầu cho thấy sự tương quan thuận giữa mức độ số hóa và biên lợi nhuận ròng. AI đã giúp giảm 15% hàng tồn kho không cần thiết và tối ưu hóa thời gian giao hàng.</p><h2>Kết luận</h2><p>Sự linh hoạt trong chuỗi cung ứng không còn là lợi thế cạnh tranh mà đã trở thành điều kiện tiên quyết để tồn tại trong thị trường toàn cầu hóa.</p>`;

const articles = [
  { title: 'Sự gián đoạn chuỗi cung ứng Biển Đỏ tiếp tục đẩy cước vận tải lên cao', category: 'tin-tuc', coverImage: IMG.ship, excerpt: 'Các cuộc tấn công ở Biển Đỏ đã buộc hàng loạt hãng tàu lớn phải định tuyến lại qua Mũi Hảo Vọng.', tags: ['Vận tải biển', 'Biển Đỏ', 'Cước vận tải'], readTime: '8 phút' },
  { title: 'Ứng dụng AI tạo sinh trong dự báo nhu cầu hàng hóa bán lẻ', category: 'tin-tuc', coverImage: IMG.ai, excerpt: 'AI có thể tăng độ chính xác của dự báo nhu cầu lên 35%.', tags: ['AI', 'Công nghệ', 'Dự báo'], readTime: '10 phút' },
  { title: 'Luật ESG mới của Châu Âu: Doanh nghiệp logistics Việt cần chuẩn bị gì?', category: 'tin-tuc', coverImage: IMG.factory, excerpt: 'Quy định chống phá rừng và CBAM của EU sẽ có hiệu lực vào năm tới.', tags: ['ESG', 'Bền vững', 'Châu Âu'], readTime: '12 phút' },
  { title: 'Biến động chuỗi cung ứng khu vực Châu Á - Thái Bình Dương', category: 'tin-tuc', coverImage: IMG.port, excerpt: 'Phân tích thực chứng về tác động của các hiệp định thương mại mới.', tags: ['APAC', 'Chuỗi cung ứng', 'Logistics 4.0'], readTime: '15 phút' },
  { title: 'Giá cước container toàn cầu: Xu hướng Q2/2024', category: 'tin-tuc', coverImage: IMG.container, excerpt: 'Tổng hợp biến động giá cước container trên các tuyến chính.', tags: ['Container', 'Giá cước', 'Vận tải biển'], readTime: '7 phút' },
  { title: 'Xu hướng tự động hóa kho bãi tại Đông Nam Á', category: 'tin-tuc', coverImage: IMG.warehouse, excerpt: 'Nghiên cứu về ứng dụng robot và AGV trong quản lý kho hàng hiện đại.', tags: ['Kho bãi', 'Tự động hóa', 'Đông Nam Á'], readTime: '9 phút' },
  { title: 'Tối ưu hóa giao hàng chặng cuối với xe điện', category: 'tin-tuc', coverImage: IMG.truck, excerpt: 'Lộ trình chuyển đổi sang xe tải điện trong vận tải hàng hóa đô thị.', tags: ['Last-mile', 'Xe điện', 'Xanh'], readTime: '6 phút' },
  { title: 'Phân tích dữ liệu lớn trong quản lý chuỗi cung ứng', category: 'tin-tuc', coverImage: IMG.chart, excerpt: 'Big Data đang thay đổi cách doanh nghiệp đưa ra quyết định logistics.', tags: ['Big Data', 'Analytics', 'Quản trị'], readTime: '11 phút' },
  // Case Studies
  { title: 'Giải mã mô hình vận hành tại Cảng Cát Lái: Cửa ngõ chiến lược miền Nam', category: 'case-study', coverImage: IMG.port, excerpt: 'Làm thế nào Cát Lái xử lý 5.5 triệu TEU mỗi năm với tỷ lệ sai sót cực thấp?', tags: ['Cảng biển', 'Cát Lái', 'Hạ tầng'], readTime: '18 phút' },
  { title: 'Chuỗi cung ứng Vinamilk: Bài toán tối ưu hóa Logistics lạnh đa quốc gia', category: 'case-study', coverImage: IMG.truck, excerpt: 'Phân tích hệ thống phân phối từ trang trại đến bàn ăn trong chưa đầy 24 giờ.', tags: ['FMCG', 'Cold chain', 'Vinamilk'], readTime: '20 phút' },
  { title: 'Số hóa kho hàng Omni-channel tại Central Retail Việt Nam', category: 'case-study', coverImage: IMG.warehouse, excerpt: 'Ứng dụng WMS tích hợp AI giúp rút ngắn thời gian xử lý đơn hàng từ 24h xuống 4h.', tags: ['Retail', 'WMS', 'Omni-channel'], readTime: '14 phút' },
  // Topic posts — Logistics
  { title: 'Vận tải đường biển: Tổng quan FCL và LCL', category: 'topic-post', topic: 'duong-bien', parentCategory: 'logistics', coverImage: IMG.ship, excerpt: 'Hướng dẫn toàn diện về vận tải container đường biển.', tags: ['FCL', 'LCL', 'Đường biển'], readTime: '10 phút' },
  { title: 'Công ước Rotterdam và trách nhiệm người chuyên chở đường biển', category: 'topic-post', topic: 'duong-bien', parentCategory: 'logistics', coverImage: IMG.port, excerpt: 'Phân tích chi tiết các điều khoản trách nhiệm trong vận đơn đường biển quốc tế.', tags: ['Pháp lý', 'Rotterdam', 'Vận đơn'], readTime: '14 phút' },
  { title: 'Quy trình xuất nhập khẩu hàng không từ A-Z', category: 'topic-post', topic: 'hang-khong', parentCategory: 'logistics', coverImage: IMG.factory, excerpt: 'Tất cả các bước cần thiết cho vận tải hàng không quốc tế.', tags: ['Hàng không', 'Xuất nhập khẩu'], readTime: '12 phút' },
  { title: 'So sánh chi phí Air Freight vs Sea Freight tuyến Á-Âu 2024', category: 'topic-post', topic: 'hang-khong', parentCategory: 'logistics', coverImage: IMG.chart, excerpt: 'Phân tích chi phí vận tải hàng không và đường biển trên tuyến thương mại lớn nhất thế giới.', tags: ['Chi phí', 'So sánh', 'Á-Âu'], readTime: '9 phút' },
  { title: 'Tối ưu hóa vận tải đường bộ Last-mile với AI', category: 'topic-post', topic: 'duong-bo', parentCategory: 'logistics', coverImage: IMG.truck, excerpt: 'Ứng dụng trí tuệ nhân tạo trong tối ưu tuyến đường và giảm chi phí giao hàng chặng cuối.', tags: ['Last-mile', 'AI', 'Đường bộ'], readTime: '8 phút' },
  { title: 'Quy định vận tải hàng nguy hiểm bằng đường bộ ADR 2025', category: 'topic-post', topic: 'duong-bo', parentCategory: 'logistics', coverImage: IMG.container, excerpt: 'Cập nhật quy định mới nhất về phân loại và vận chuyển hàng nguy hiểm.', tags: ['ADR', 'Hàng nguy hiểm', 'Pháp lý'], readTime: '11 phút' },
  { title: 'Tuyến đường sắt Trung Quốc - Châu Âu: Cơ hội cho Việt Nam', category: 'topic-post', topic: 'duong-sat', parentCategory: 'logistics', coverImage: IMG.warehouse, excerpt: 'Phân tích tiềm năng kết nối vào mạng lưới đường sắt xuyên lục địa Belt & Road.', tags: ['BRI', 'Đường sắt', 'Trung Quốc'], readTime: '13 phút' },
  { title: 'Rail Freight và bài toán giảm phát thải carbon trong logistics', category: 'topic-post', topic: 'duong-sat', parentCategory: 'logistics', coverImage: IMG.chart, excerpt: 'Đường sắt phát thải CO2 ít hơn 75% so với đường bộ trên cùng quãng đường.', tags: ['Carbon', 'Bền vững', 'Đường sắt'], readTime: '7 phút' },
  { title: 'Thiết kế mạng lưới vận tải đa phương thức tối ưu', category: 'topic-post', topic: 'da-phuong-thuc', parentCategory: 'logistics', coverImage: IMG.container, excerpt: 'Phương pháp kết hợp đường biển, đường bộ và đường sắt để giảm chi phí 20%.', tags: ['Multimodal', 'Tối ưu', 'Chi phí'], readTime: '10 phút' },
  { title: 'Chứng từ vận tải đa phương thức: FIATA FBL và MT B/L', category: 'topic-post', topic: 'da-phuong-thuc', parentCategory: 'logistics', coverImage: IMG.doc1, excerpt: 'Hướng dẫn sử dụng vận đơn đa phương thức trong thương mại quốc tế.', tags: ['FIATA', 'Chứng từ', 'Vận đơn'], readTime: '9 phút' },
  // Topic posts — Chuỗi cung ứng
  { title: 'Chiến lược Procurement bền vững cho doanh nghiệp SME', category: 'topic-post', topic: 'procurement', parentCategory: 'chuoi-cung-ung', coverImage: IMG.chart, excerpt: 'Cách tiếp cận mua hàng bền vững với ngân sách hạn chế.', tags: ['Procurement', 'SME', 'Bền vững'], readTime: '8 phút' },
  { title: 'E-Procurement: Số hóa quy trình mua hàng doanh nghiệp', category: 'topic-post', topic: 'procurement', parentCategory: 'chuoi-cung-ung', coverImage: IMG.ai, excerpt: 'Triển khai hệ thống mua hàng điện tử giúp giảm 30% thời gian xử lý đơn hàng.', tags: ['E-Procurement', 'Số hóa', 'ERP'], readTime: '10 phút' },
  { title: 'Global Sourcing: Đánh giá nhà cung cấp đa tiêu chí', category: 'topic-post', topic: 'sourcing', parentCategory: 'chuoi-cung-ung', coverImage: IMG.factory, excerpt: 'Framework đánh giá nhà cung cấp toàn cầu dựa trên chất lượng, giá và ESG compliance.', tags: ['Sourcing', 'Đánh giá', 'ESG'], readTime: '12 phút' },
  { title: 'China+1: Chiến lược đa dạng hóa nguồn cung sau COVID', category: 'topic-post', topic: 'sourcing', parentCategory: 'chuoi-cung-ung', coverImage: IMG.port, excerpt: 'Xu hướng dịch chuyển chuỗi cung ứng từ Trung Quốc sang Đông Nam Á.', tags: ['China+1', 'Nearshoring', 'ASEAN'], readTime: '11 phút' },
  { title: 'Demand Planning với Machine Learning: Từ lý thuyết đến thực hành', category: 'topic-post', topic: 'planning', parentCategory: 'chuoi-cung-ung', coverImage: IMG.ai, excerpt: 'Ứng dụng ML trong dự báo nhu cầu giúp giảm 40% hàng tồn kho dư thừa.', tags: ['ML', 'Demand Planning', 'Dự báo'], readTime: '15 phút' },
  { title: 'S&OP — Quy trình hoạch định bán hàng và vận hành tích hợp', category: 'topic-post', topic: 'planning', parentCategory: 'chuoi-cung-ung', coverImage: IMG.warehouse, excerpt: 'Kết nối kế hoạch bán hàng với kế hoạch sản xuất và logistics.', tags: ['S&OP', 'Planning', 'Tích hợp'], readTime: '9 phút' },
  { title: 'Lean Manufacturing: 7 loại lãng phí trong sản xuất', category: 'topic-post', topic: 'manufacturing', parentCategory: 'chuoi-cung-ung', coverImage: IMG.factory, excerpt: 'Nhận diện và loại bỏ lãng phí để tối ưu hóa quy trình sản xuất.', tags: ['Lean', 'Kaizen', 'Sản xuất'], readTime: '8 phút' },
  { title: 'Industry 4.0: Nhà máy thông minh và IoT trong sản xuất', category: 'topic-post', topic: 'manufacturing', parentCategory: 'chuoi-cung-ung', coverImage: IMG.ai, excerpt: 'Tích hợp IoT, Big Data và AI để xây dựng nhà máy tự động hóa hoàn toàn.', tags: ['Industry 4.0', 'IoT', 'Smart Factory'], readTime: '13 phút' },
];

const books = [
  { title: 'Logistics Quản trị Chuỗi cung ứng Thế kỷ 21', author: 'NXB Đại học Oxford', year: 2024, coverImage: IMG.book1, description: 'Phân tích toàn diện về các xu hướng logistics hiện đại, từ tự động hóa kho bãi đến chiến lược vận tải đa phương thức quốc tế.', chapters: [{ title: 'Tổng quan Logistics toàn cầu', excerpt: 'Giới thiệu về hệ sinh thái logistics và vai trò trong kinh tế số.' }, { title: 'Quản trị chuỗi cung ứng bền vững', excerpt: 'Chiến lược xanh hóa chuỗi cung ứng và tuân thủ ESG.' }] },
  { title: 'Vận tải Đa phương thức và Pháp luật Thương mại', author: 'NXB Kinh tế Quốc dân', year: 2023, coverImage: IMG.book2, description: 'Cẩm nang pháp lý về các công ước vận tải quốc tế, trách nhiệm của người chuyên chở và quản trị rủi ro.', chapters: [{ title: 'Incoterms 2020 chi tiết', excerpt: 'Phân tích 11 điều kiện thương mại quốc tế.' }] },
  { title: 'Blockchain trong Logistics: Cuộc cách mạng Minh bạch', author: 'Logiverse Press', year: 2024, coverImage: IMG.book3, description: 'Nghiên cứu sâu về ứng dụng chuỗi khối để tối ưu hóa theo dõi vận đơn và thanh toán thông minh.', chapters: [{ title: 'Smart Contract trong vận tải', excerpt: 'Tự động hóa thanh toán và xác minh chứng từ.' }] },
  { title: 'Kỹ thuật Quản trị Kho bãi 4.0', author: 'NXB Tài Chính', year: 2023, coverImage: IMG.book4, description: 'Tối ưu hóa không gian, quy trình lấy hàng tự động và quản lý tồn kho thời gian thực.', chapters: [{ title: 'WMS và IoT', excerpt: 'Hệ thống quản lý kho tích hợp cảm biến.' }] },
  { title: 'Incoterms 2020: Giải thích và Ứng dụng Thực tế', author: 'NXB Giáo Dục', year: 2022, coverImage: IMG.book5, description: 'Phân tích chi tiết 11 điều kiện thương mại quốc tế kèm tình huống tranh chấp điển hình.', chapters: [{ title: 'FOB, CIF và CFR', excerpt: 'So sánh trách nhiệm và rủi ro giữa người mua và người bán.' }] },
];

const documents = [
  { title: 'Hợp đồng Vận chuyển Đa phương thức Quốc tế', type: 'hop-dong', coverImage: IMG.doc1, description: 'Bản thảo hợp đồng chuẩn hóa cho các giao dịch vận tải xuyên biên giới, tích hợp Incoterms 2020.' },
  { title: 'Quy trình Khai báo Hải quan Điện tử (VNACCS/VCIS)', type: 'chung-tu', coverImage: IMG.doc2, description: 'Hướng dẫn chi tiết các bước khai báo hải quan điện tử cho hàng hóa nhập khẩu kinh doanh.' },
  { title: 'Mẫu Ủy thác Xuất nhập khẩu cho Doanh nghiệp SME', type: 'hop-dong', coverImage: IMG.doc3, description: 'Tài liệu tinh gọn dành riêng cho SME khi thực hiện ủy thác xuất nhập khẩu qua đại lý trung gian.' },
  { title: 'Phụ lục Bảo hiểm Hàng hải ICC (A) 2024', type: 'chung-tu', coverImage: IMG.doc1, description: 'Điều khoản bảo hiểm hàng hải phiên bản mới nhất với các quy định về rủi ro chiến tranh và đình công.' },
  // Incoterms 2020
  { title: 'FOB — Free On Board: Hướng dẫn áp dụng thực tế', type: 'incoterms', coverImage: IMG.ship, description: 'Phân tích điều kiện FOB — điều kiện thương mại phổ biến nhất trong xuất khẩu hàng hóa đường biển. Quy định rõ thời điểm chuyển rủi ro khi hàng qua lan can tàu tại cảng bốc hàng.' },
  { title: 'CIF — Cost, Insurance & Freight: Áp dụng trong nhập khẩu', type: 'incoterms', coverImage: IMG.container, description: 'Hướng dẫn chi tiết điều kiện CIF trong hợp đồng ngoại thương: ai chịu cước, ai mua bảo hiểm, rủi ro chuyển lúc nào và những tranh chấp thường gặp.' },
  { title: 'EXW vs DDP: Lựa chọn nào có lợi cho người mua?', type: 'incoterms', coverImage: IMG.warehouse, description: 'So sánh toàn diện giữa EXW (Ex Works) và DDP (Delivered Duty Paid) — hai đầu đối lập của 11 điều kiện Incoterms 2020, giúp doanh nghiệp nhập khẩu đưa ra quyết định đàm phán hợp đồng tối ưu.' },
  { title: 'Incoterms 2020: Bảng tổng hợp 11 điều kiện và phân loại', type: 'incoterms', coverImage: IMG.chart, description: 'Tài liệu tóm tắt toàn bộ 11 điều kiện Incoterms 2020 chia theo nhóm: nhóm E (EXW), nhóm F (FCA, FAS, FOB), nhóm C (CFR, CIF, CPT, CIP) và nhóm D (DAP, DPU, DDP). Kèm biểu đồ phân chia rủi ro và chi phí.' },
];

const topics = [
  { slug: 'duong-bien', name: 'Sea Freight', nameVi: 'Vận tải Đường biển & Đường thủy Nội địa', parentCategory: 'logistics', icon: 'directions_boat', description: 'Phân tích chuyên sâu về vận tải đường biển.', order: 1 },
  { slug: 'hang-khong', name: 'Air Freight', nameVi: 'Vận tải Hàng không', parentCategory: 'logistics', icon: 'flight_takeoff', description: 'Logistics hàng không quốc tế.', order: 2 },
  { slug: 'duong-bo', name: 'Road Transport', nameVi: 'Vận tải Đường bộ', parentCategory: 'logistics', icon: 'local_shipping', description: 'Vận tải đường bộ và giao hàng chặng cuối.', order: 3 },
  { slug: 'duong-sat', name: 'Rail Freight', nameVi: 'Vận tải Đường sắt', parentCategory: 'logistics', icon: 'train', description: 'Vận tải đường sắt xuyên biên giới.', order: 4 },
  { slug: 'da-phuong-thuc', name: 'Multimodal', nameVi: 'Vận tải Đa phương thức', parentCategory: 'logistics', icon: 'hub', description: 'Kết hợp nhiều phương thức vận tải.', order: 5 },
  { slug: 'procurement', name: 'Procurement', nameVi: 'Procurement — Quản trị Mua hàng', parentCategory: 'chuoi-cung-ung', icon: 'shopping_cart', description: 'Quản trị mua hàng bền vững.', order: 1 },
  { slug: 'sourcing', name: 'Sourcing', nameVi: 'Sourcing — Tìm nguồn cung', parentCategory: 'chuoi-cung-ung', icon: 'manage_search', description: 'Chiến lược lựa chọn nhà cung cấp.', order: 2 },
  { slug: 'planning', name: 'Planning', nameVi: 'Planning — Hoạch định', parentCategory: 'chuoi-cung-ung', icon: 'analytics', description: 'Lập kế hoạch nhu cầu và tồn kho.', order: 3 },
  { slug: 'manufacturing', name: 'Manufacturing', nameVi: 'Manufacturing — Sản xuất', parentCategory: 'chuoi-cung-ung', icon: 'precision_manufacturing', description: 'Sản xuất tinh gọn và kiểm soát chất lượng.', order: 4 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      Article.deleteMany({}),
      Book.deleteMany({}),
      Document.deleteMany({}),
      Topic.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed articles
    const authorNames = ['Minh Trí', 'Hương Lan', 'Lê Cường', 'TS. Đặng Minh Quân', 'Nguyễn Thùy Linh'];
    for (let i = 0; i < articles.length; i++) {
      const a = articles[i];
      const doc = new Article({
        ...a,
        slug: toSlug(a.title),
        content: contentTemplate(a.title),
        author: { name: authorNames[i % 5], title: 'Chuyên gia phân tích Logistics' },
        publishDate: new Date(2024, 4, 25 - i * 3),
        status: 'published',
        viewCount: Math.floor(Math.random() * 5000) + 500,
      });
      await doc.save();
    }
    console.log(`✅ Seeded ${articles.length} articles`);

    // Seed books
    for (const b of books) {
      const doc = new Book({ ...b, slug: toSlug(b.title), status: 'published' });
      await doc.save();
    }
    console.log(`✅ Seeded ${books.length} books`);

    // Seed documents
    for (const d of documents) {
      const doc = new Document({ ...d, slug: toSlug(d.title), status: 'published' });
      await doc.save();
    }
    console.log(`✅ Seeded ${documents.length} documents`);

    // Seed topics
    await Topic.insertMany(topics);
    console.log(`✅ Seeded ${topics.length} topics`);

    // Seed admin user
    const existingAdmin = await User.findOne({ email: 'admin@logiverse.com' });
    if (!existingAdmin) {
      await User.create({ email: 'admin@logiverse.com', password: 'admin123', name: 'Admin Logiverse', role: 'admin' });
      console.log('✅ Seeded admin user');
    }

    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
