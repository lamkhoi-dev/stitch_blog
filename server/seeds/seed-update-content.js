/**
 * seed-update-content.js
 * Updates existing Documents and Books with rich article-style content.
 * Safe to run multiple times — only updates docs that have empty content.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Document = require('../models/Document');
const Book = require('../models/Book');

const authors = [
  { name: 'TS. Nguyễn Minh Trí', title: 'Chuyên gia Logistics Quốc tế' },
  { name: 'Nguyễn Thùy Linh', title: 'Chuyên gia Thương mại Quốc tế' },
  { name: 'Trần Hoàng Nam', title: 'Tư vấn Vận tải & Hải quan' },
  { name: 'TS. Đặng Minh Quân', title: 'Giảng viên Đại học Ngoại thương' },
  { name: 'Lê Cường', title: 'Phân tích viên Chuỗi cung ứng' },
];
const pickAuthor = () => authors[Math.floor(Math.random() * authors.length)];

// ── Rich HTML content generators ──

const contractContent = (title) => `
<p class="drop-cap">Trong hoạt động thương mại và logistics quốc tế, "${title}" là một trong những tài liệu pháp lý quan trọng nhất, đóng vai trò nền tảng cho mọi giao dịch giữa các bên.</p>

<h2>I. Tổng quan và phạm vi áp dụng</h2>
<p>Hợp đồng này được thiết kế dựa trên các thông lệ quốc tế (FIATA, ICC, BIMCO) và luật pháp Việt Nam hiện hành. Phạm vi áp dụng bao trùm toàn bộ quy trình từ ký kết, thực hiện đến thanh lý hợp đồng.</p>
<blockquote>"Một hợp đồng tốt không chỉ bảo vệ quyền lợi các bên mà còn tạo nền tảng cho mối quan hệ hợp tác lâu dài."<cite>— International Chamber of Commerce</cite></blockquote>

<h2>II. Các điều khoản cốt lõi</h2>
<p>Hợp đồng bao gồm các điều khoản thiết yếu:</p>
<ul>
<li><strong>Phạm vi dịch vụ:</strong> Mô tả chi tiết các dịch vụ được cung cấp, tiêu chuẩn chất lượng và KPI đánh giá.</li>
<li><strong>Giá cả và thanh toán:</strong> Cơ cấu phí, điều kiện thanh toán, xử lý phụ phí phát sinh.</li>
<li><strong>Trách nhiệm và giới hạn bồi thường:</strong> Quy định rõ trách nhiệm mỗi bên, giới hạn bồi thường theo thông lệ quốc tế.</li>
<li><strong>Bảo hiểm hàng hóa:</strong> Yêu cầu mức bảo hiểm tối thiểu, loại hình bảo hiểm phù hợp.</li>
<li><strong>Giải quyết tranh chấp:</strong> Cơ chế hòa giải, trọng tài hoặc tòa án thương mại.</li>
</ul>

<h2>III. Hướng dẫn sử dụng</h2>
<p>Khi sử dụng mẫu hợp đồng này, doanh nghiệp cần lưu ý:</p>
<ol>
<li>Điều chỉnh các điều khoản cho phù hợp với đặc thù giao dịch cụ thể</li>
<li>Tham vấn ý kiến pháp lý trước khi ký kết chính thức</li>
<li>Đảm bảo tất cả phụ lục và tài liệu tham chiếu được đính kèm đầy đủ</li>
<li>Lưu giữ bản gốc có xác nhận của cả hai bên</li>
</ol>

<h2>IV. Kết luận</h2>
<p>Việc sử dụng hợp đồng chuẩn hóa không chỉ giúp tiết kiệm thời gian soạn thảo mà còn giảm thiểu rủi ro pháp lý cho cả hai bên trong quá trình hợp tác.</p>
`;

const chungTuContent = (title) => `
<p class="drop-cap">Chứng từ "${title}" là một phần không thể thiếu trong bộ hồ sơ xuất nhập khẩu, đóng vai trò quyết định trong việc thông quan hàng hóa và thanh toán quốc tế.</p>

<h2>I. Giới thiệu và vai trò</h2>
<p>Trong hoạt động ngoại thương, chứng từ được coi là "tiếng nói" của hàng hóa. Một bộ chứng từ chính xác và đầy đủ giúp đảm bảo:</p>
<ul>
<li>Thông quan nhanh chóng, tránh phạt lưu kho</li>
<li>Thanh toán kịp thời qua ngân hàng</li>
<li>Tuân thủ quy định pháp luật hải quan</li>
<li>Bảo vệ quyền lợi người xuất khẩu và nhập khẩu</li>
</ul>

<h2>II. Cấu trúc và nội dung chi tiết</h2>
<p>Mỗi chứng từ có cấu trúc riêng biệt với các trường thông tin bắt buộc theo quy định quốc tế. Dưới đây là hướng dẫn chi tiết từng mục:</p>
<blockquote>"70% các vụ từ chối thanh toán L/C là do sai sót chứng từ — hầu hết đều có thể phòng tránh được."<cite>— ICC Banking Commission Report</cite></blockquote>

<h2>III. Lưu ý thực tế khi sử dụng</h2>
<p>Từ kinh nghiệm thực tiễn của hàng trăm lô hàng, chúng tôi tổng hợp các lỗi phổ biến và cách khắc phục:</p>
<ol>
<li><strong>Sai tên người thụ hưởng:</strong> Kiểm tra kỹ theo L/C hoặc hợp đồng</li>
<li><strong>Mô tả hàng hóa không khớp:</strong> Phải trùng 100% với L/C</li>
<li><strong>Thiếu chữ ký xác nhận:</strong> Đảm bảo tất cả bản gốc được ký và đóng dấu</li>
<li><strong>Ngày phát hành muộn:</strong> Tuân thủ deadline presentation theo UCP 600</li>
</ol>

<h2>IV. Kết luận</h2>
<p>Nắm vững quy cách chứng từ là kỹ năng nền tảng cho mọi chuyên viên xuất nhập khẩu. Tài liệu này cung cấp template và checklist để giảm thiểu sai sót trong thực tế.</p>
`;

const incotermsContent = (title) => `
<p class="drop-cap">"${title}" là một trong những nội dung quan trọng nhất mà mọi người làm thương mại quốc tế cần nắm vững. Incoterms do Phòng Thương mại Quốc tế (ICC) ban hành, quy định rõ trách nhiệm và chi phí giữa người bán và người mua.</p>

<h2>I. Bối cảnh ra đời và phiên bản 2020</h2>
<p>Incoterms® 2020 có hiệu lực từ ngày 01/01/2020, thay thế phiên bản 2010. Phiên bản mới có một số thay đổi đáng chú ý:</p>
<ul>
<li>DAT đổi tên thành <strong>DPU</strong> (Delivered at Place Unloaded)</li>
<li>FCA bổ sung quy định về B/L "On Board"</li>
<li>CIP yêu cầu mức bảo hiểm tối thiểu ICC (A) thay vì ICC (C)</li>
<li>Tất cả điều kiện đều có thể dùng cho vận tải nội địa</li>
</ul>

<h2>II. Phân tích chi tiết quyền và nghĩa vụ</h2>
<p>Mỗi điều kiện Incoterms xác định rõ 3 ranh giới quan trọng:</p>
<blockquote>"Incoterms không phải luật — chúng là ngôn ngữ chung để tránh hiểu lầm trong giao dịch quốc tế."<cite>— International Chamber of Commerce</cite></blockquote>
<ol>
<li><strong>Điểm chuyển giao rủi ro:</strong> Nơi rủi ro mất mát/hư hỏng hàng hóa chuyển từ người bán sang người mua</li>
<li><strong>Phân chia chi phí:</strong> Ai chịu cước vận chuyển, bảo hiểm, phí xếp dỡ, thông quan</li>
<li><strong>Nghĩa vụ thông quan:</strong> Bên nào chịu trách nhiệm thủ tục hải quan xuất/nhập khẩu</li>
</ol>

<h2>III. So sánh thực tiễn và lựa chọn phù hợp</h2>
<p>Việc lựa chọn đúng Incoterms phụ thuộc vào nhiều yếu tố: kinh nghiệm của doanh nghiệp, phương thức vận tải, loại hàng hóa, và mức độ kiểm soát mong muốn. Doanh nghiệp Việt Nam thường sử dụng FOB cho xuất khẩu và CIF cho nhập khẩu.</p>

<h2>IV. Kết luận</h2>
<p>Hiểu rõ Incoterms giúp doanh nghiệp đàm phán hiệu quả hơn, tránh rủi ro và chi phí ẩn. Tài liệu này cung cấp phân tích chi tiết để áp dụng trong giao dịch thực tế.</p>
`;

const chapterContent = (title) => `
<p>Chương "${title}" đi sâu vào phân tích các khía cạnh quan trọng nhất, cung cấp kiến thức từ cơ bản đến nâng cao cho người đọc.</p>

<h3>Nền tảng lý thuyết</h3>
<p>Trước khi đi vào thực tiễn, chúng ta cần nắm vững các khái niệm cốt lõi. Chương này xây dựng framework tư duy hệ thống, giúp người đọc tiếp cận vấn đề một cách logic và khoa học.</p>
<blockquote>"Lý thuyết mà không có thực hành thì vô nghĩa; thực hành mà không có lý thuyết thì nguy hiểm."<cite>— Peter Drucker</cite></blockquote>

<h3>Ứng dụng thực tiễn</h3>
<p>Dựa trên khảo sát hơn 100 doanh nghiệp logistics Việt Nam, chúng tôi tổng hợp các mô hình áp dụng thành công:</p>
<ul>
<li><strong>Mô hình 1:</strong> Áp dụng cho doanh nghiệp SME — tối ưu chi phí với nguồn lực hạn chế</li>
<li><strong>Mô hình 2:</strong> Dành cho doanh nghiệp lớn — tích hợp công nghệ và tự động hóa</li>
<li><strong>Mô hình 3:</strong> Phù hợp với doanh nghiệp FDI — chuẩn hóa theo tiêu chuẩn quốc tế</li>
</ul>

<h3>Case study minh họa</h3>
<p>Phân tích 3 doanh nghiệp tiêu biểu đã triển khai thành công, rút ra bài học kinh nghiệm và các yếu tố quyết định thành công.</p>

<h3>Tóm tắt chương</h3>
<p>Chương này đã trình bày đầy đủ từ lý thuyết đến thực tiễn. Người đọc có thể áp dụng ngay các framework và checklist được cung cấp vào công việc hàng ngày.</p>
`;

const contentByType = {
  'hop-dong': contractContent,
  'chung-tu': chungTuContent,
  'incoterms': incotermsContent,
};

const tagsByType = {
  'hop-dong': ['Hợp đồng', 'Pháp lý', 'Logistics'],
  'chung-tu': ['Chứng từ', 'Xuất nhập khẩu', 'Hải quan'],
  'incoterms': ['Incoterms', 'ICC', 'Thương mại quốc tế'],
};

const readTimeByType = {
  'hop-dong': '12 phút',
  'chung-tu': '10 phút',
  'incoterms': '15 phút',
};

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB...\n');

    // ── Update Documents ──
    const docs = await Document.find({ $or: [{ content: '' }, { content: { $exists: false } }] });
    let docUpdated = 0;
    for (const doc of docs) {
      const genContent = contentByType[doc.type];
      if (genContent) {
        doc.content = genContent(doc.title);
        doc.author = pickAuthor();
        doc.tags = tagsByType[doc.type] || [];
        doc.readTime = readTimeByType[doc.type] || '8 phút';
        await doc.save();
        docUpdated++;
        console.log(`  📄 Updated document: ${doc.title}`);
      }
    }
    console.log(`\n✅ Updated ${docUpdated} documents with rich content\n`);

    // ── Update Books ──
    const books = await Book.find();
    let bookUpdated = 0;
    for (const book of books) {
      let changed = false;

      // Add tags if missing
      if (!book.tags || book.tags.length === 0) {
        book.tags = ['Logistics', 'Chuỗi cung ứng', 'Sách chuyên ngành'];
        changed = true;
      }

      // Add readTime if missing
      if (!book.readTime || book.readTime === '10 phút') {
        const totalChapters = book.chapters?.length || 1;
        book.readTime = `${totalChapters * 15} phút`;
        changed = true;
      }

      // Update chapters with content
      if (book.chapters?.length > 0) {
        for (const ch of book.chapters) {
          if (!ch.content) {
            ch.content = chapterContent(ch.title);
            changed = true;
          }
        }
      }

      if (changed) {
        await book.save();
        bookUpdated++;
        console.log(`  📚 Updated book: ${book.title} (${book.chapters?.length || 0} chapters)`);
      }
    }
    console.log(`\n✅ Updated ${bookUpdated} books with chapter content\n`);

    // Summary
    const [totalD, totalB] = await Promise.all([
      Document.countDocuments(),
      Book.countDocuments(),
    ]);
    console.log(`📊 Totals: ${totalD} documents, ${totalB} books`);
    console.log('🎉 Content update completed!');
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

run();
