import { Link } from 'react-router-dom';

const logisticsItems = [
  { slug: 'duong-bien', icon: 'directions_boat', label: 'Đường biển & Thủy nội địa' },
  { slug: 'hang-khong', icon: 'flight', label: 'Đường hàng không' },
  { slug: 'duong-bo', icon: 'local_shipping', label: 'Đường bộ' },
  { slug: 'duong-sat', icon: 'train', label: 'Đường sắt' },
  { slug: 'da-phuong-thuc', icon: 'dynamic_feed', label: 'Đa phương thức' },
];

const supplyChainItems = [
  { slug: 'procurement', icon: 'shopping_cart', label: 'Procurement', desc: 'Quy trình thu mua & tối ưu' },
  { slug: 'sourcing', icon: 'search', label: 'Sourcing', desc: 'Tìm kiếm nguồn hàng toàn cầu' },
  { slug: 'planning', icon: 'event_note', label: 'Planning', desc: 'Lập kế hoạch nhu cầu và sản xuất' },
  { slug: 'manufacturing', icon: 'factory', label: 'Manufacturing', desc: 'Quản trị sản xuất thông minh' },
];

export default function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[72px] z-[90] transition-all duration-500" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#121c28]/20 backdrop-blur-sm" />

      {/* Menu Panel */}
      <div
        className="absolute top-0 left-0 w-full bg-white shadow-2xl border-t border-outline-variant/10 animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Hợp đồng & Chứng từ */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary tracking-tight border-b border-surface-container pb-3">
              Hợp đồng & Chứng từ
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/thu-vien/hop-dong-chung-tu"
                  onClick={onClose}
                  className="group flex items-center justify-between hover:text-primary transition-colors"
                >
                  <span className="text-base text-on-surface-variant group-hover:text-primary">
                    Hợp đồng & Chứng từ
                  </span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    arrow_forward
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/thu-vien/hop-dong-chung-tu?type=incoterms"
                  onClick={onClose}
                  className="group flex items-center justify-between hover:text-primary transition-colors"
                >
                  <span className="text-base text-on-surface-variant group-hover:text-primary">
                    Incoterms 2020
                  </span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    arrow_forward
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Sách */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary tracking-tight border-b border-surface-container pb-3">
              Sách
            </h3>
            <div className="bg-surface-container-low p-4 rounded-xl space-y-4">
              <div className="h-32 bg-surface-variant rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop"
                  alt="Library books"
                />
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Khám phá kho tàng kiến thức logistics được biên soạn bởi các chuyên gia đầu ngành.
              </p>
              <Link
                to="/thu-vien/sach"
                onClick={onClose}
                className="inline-flex items-center text-primary font-semibold text-sm hover:underline"
              >
                Xem danh mục
                <span className="material-symbols-outlined text-xs ml-1">open_in_new</span>
              </Link>
            </div>
          </div>

          {/* Col 3: Logistics */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary tracking-tight border-b border-surface-container pb-3">
              Logistics
            </h3>
            <ul className="space-y-4">
              {logisticsItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/thu-vien/logistics/${item.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary-container">
                      {item.icon}
                    </span>
                    <span className="text-base">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Chuỗi cung ứng */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold text-primary tracking-tight border-b border-surface-container pb-3">
              Chuỗi cung ứng
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {supplyChainItems.map((item) => (
                <Link
                  key={item.slug}
                  to={`/thu-vien/chuoi-cung-ung/${item.slug}`}
                  onClick={onClose}
                  className="p-3 hover:bg-surface-container rounded-lg transition-colors flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-on-surface">{item.label}</span>
                    <span className="text-xs text-on-surface-variant">{item.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-surface-container-low px-12 py-6 border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                Trực quan hóa dữ liệu:
              </span>
              <div className="flex gap-4">
                <span className="px-2 py-1 bg-surface-container-highest text-[10px] rounded border border-outline-variant/20">
                  Real-time Map
                </span>
                <span className="px-2 py-1 bg-surface-container-highest text-[10px] rounded border border-outline-variant/20">
                  Metric Dashboard
                </span>
              </div>
            </div>
            <Link
              to="/thu-vien"
              onClick={onClose}
              className="text-sm font-semibold text-primary flex items-center gap-2 hover:translate-x-1 transition-transform"
            >
              Explore Full Library
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
