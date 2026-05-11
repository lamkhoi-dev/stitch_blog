# Logiverse - Nền Tảng Thông Tin & Tài Liệu Logistics

Logiverse là một hệ thống quản lý nội dung (CMS) và nền tảng chia sẻ kiến thức chuyên sâu về lĩnh vực Logistics và Chuỗi Cung Ứng. Dự án bao gồm Frontend (React) và Backend (Node.js/Express, MongoDB) được thiết kế hiện đại, cung cấp kiến thức đa dạng từ tin tức, case study đến sách và các biểu mẫu tài liệu thực tế.

---

## 🚀 Hướng Dẫn Dành Cho Quản Trị Viên (Admin)

### 1. Thông Tin Đăng Nhập Mặc Định
- **Email:** `admin@logiverse.vn`
- **Mật khẩu:** `Admin@2024`
- **Đường dẫn Admin:** `/admin`

*(Lưu ý: Bạn nên đổi mật khẩu sau khi triển khai hệ thống lên môi trường thực tế)*

### 2. Cấu Trúc Dữ Liệu & Danh Mục Bài Viết (Rất Quan Trọng)
Hệ thống được chia thành 3 phân hệ dữ liệu chính: **Bài viết (Articles)**, **Tài liệu (Documents)**, và **Sách (Books)**. Dưới đây là hướng dẫn chi tiết để Admin biết bài viết mình tạo sẽ được lưu và hiển thị ở đâu.

#### 📦 A. Bài Viết (Articles)
Quản lý tại: **Admin Dashboard > Quản lý Bài viết**
Khi tạo bài viết mới, Admin cần chọn đúng `Category` (Danh mục) để bài viết hiển thị đúng vị trí trên trang chủ và các trang chuyên mục:

1. **Tin tức (`tin-tuc`)**
   - **Mục đích:** Đăng tải các tin tức cập nhật, sự kiện nóng, biến động thị trường, xu hướng logistics và chuỗi cung ứng trong và ngoài nước.
   - **Vị trí hiển thị:** Các mục "Tin tức Logistics" trên trang chủ và trang Tin tức.

2. **Case Study (`case-study`)**
   - **Mục đích:** Phân tích chuyên sâu về các mô hình thực tế, bài toán giải quyết vấn đề của các doanh nghiệp lớn (vd: Chuỗi cung ứng lạnh của Masan, Mô hình phân phối của Vinamilk, v.v.).
   - **Vị trí hiển thị:** Chuyên mục "Case Study nổi bật" trên trang chủ.

3. **Bài viết chuyên đề (`topic-post`)**
   - **Mục đích:** Các bài viết mang tính học thuật, cung cấp kiến thức nền tảng và nâng cao (vd: Hướng dẫn đọc Bill of Lading, Sự khác biệt giữa các phương thức vận tải, Phụ phí cảng biển...).
   - **Vị trí hiển thị:** Thường xuất hiện trong danh sách bài đăng kiến thức, được gắn tag và thuộc các chủ đề (Topic) cụ thể.

#### 📑 B. Tài Liệu & Biểu Mẫu (Documents)
Quản lý tại: **Admin Dashboard > Quản lý Tài liệu**
Phân hệ này chứa các file PDF/Word phục vụ cho nghiệp vụ thực tế. Có 3 loại (Type) tài liệu:

1. **Hợp đồng (`hop-dong`)**
   - **Mục đích:** Các mẫu hợp đồng thương mại, hợp đồng vận chuyển, hợp đồng thuê kho bãi (3PL), hợp đồng đại lý.
   - **Vị trí hiển thị:** Trang Thư viện (Library) > Tab **Hợp đồng**.

2. **Chứng từ (`chung-tu`)**
   - **Mục đích:** Các biểu mẫu chứng từ xuất nhập khẩu thực tế (Tờ khai hải quan, Packing List, Invoice, Vận đơn, L/C, C/O...).
   - **Vị trí hiển thị:** Trang Thư viện (Library) > Tab **Chứng từ**.

3. **Incoterms (`incoterms`)**
   - **Mục đích:** Các tài liệu phân tích, giải thích hoặc bảng tra cứu về 11 điều kiện thương mại quốc tế (Incoterms 2010, 2020) như FOB, CIF, EXW, FCA...
   - **Vị trí hiển thị:** Trang Thư viện (Library) > Tab **Incoterms**.

#### 📚 C. Sách (Books)
Quản lý tại: **Admin Dashboard > Quản lý Sách**
- **Mục đích:** Đăng tải các cuốn sách điện tử (e-book) chuyên ngành, giáo trình, hoặc cẩm nang logistics dài hạn.
- **Vị trí hiển thị:** Trang Thư viện (Library) > Section **Sách Nổi Bật** (Hiển thị dạng slider hoặc lưới).

---

## 🛠 Hướng Dẫn Cài Đặt (Dành cho Developer)

### 1. Yêu cầu hệ thống
- Node.js (v16 trở lên)
- MongoDB (Local hoặc MongoDB Atlas)

### 2. Thiết lập dự án

**Cài đặt dependencies:**
```bash
# Tại thư mục gốc (nếu có package.json tổng) hoặc cài cho từng phần:
cd client && npm install
cd ../server && npm install
```

**Cấu hình biến môi trường:**
Tạo file `.env` trong thư mục `server` với các biến sau:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/logiverse?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Đổ dữ liệu mẫu (Seeding)
Hệ thống đã có sẵn kịch bản seed dữ liệu mẫu phong phú (hơn 50 bài viết, sách, tài liệu):
```bash
cd server
node seeds/seed.js        # Seed dữ liệu cơ bản (sẽ xóa dữ liệu cũ)
node seeds/seed-more.js   # Seed thêm dữ liệu mở rộng (không xóa dữ liệu hiện có)
```

### 4. Khởi chạy dự án
Mở 2 terminal để chạy song song:

**Khởi chạy Backend (Server):**
```bash
cd server
npm run dev
```

**Khởi chạy Frontend (Client):**
```bash
cd client
npm run dev
```

Trang web sẽ có thể truy cập tại: `http://localhost:3000` (hoặc cổng tương ứng Vite/CRA).

---
*Dự án Logiverse được thiết kế với kiến trúc linh hoạt (Dynamic Data-Driven), giúp mọi nội dung trên Website đều có thể thay đổi ngay lập tức thông qua Admin Dashboard mà không cần can thiệp vào mã nguồn.*
# stitch_blog
