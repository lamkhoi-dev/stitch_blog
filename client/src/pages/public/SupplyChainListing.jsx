import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import articleService from '../../services/articleService';

const SUPPLY_CHAIN_TOPICS = [
  {
    slug: 'sourcing',
    name: 'Sourcing',
    nameVi: 'Tìm nguồn hàng',
    icon: 'search_insights',
    description: 'Chiến lược tìm kiếm và đánh giá nhà cung cấp toàn cầu, quản lý rủi ro trong procurement.',
    color: 'from-sky-900/80 to-sky-700/60',
  },
  {
    slug: 'procurement',
    name: 'Procurement',
    nameVi: 'Mua hàng & Đàm phán',
    icon: 'handshake',
    description: 'Quy trình đàm phán hợp đồng, quản lý chi phí và tối ưu hóa danh mục mua sắm.',
    color: 'from-emerald-900/80 to-emerald-700/60',
  },
  {
    slug: 'planning',
    name: 'Planning',
    nameVi: 'Hoạch định Chuỗi cung ứng',
    icon: 'calendar_view_month',
    description: 'S&OP, dự báo nhu cầu, lập kế hoạch sản xuất và tối ưu tồn kho theo thời gian thực.',
    color: 'from-amber-900/80 to-amber-700/60',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    nameVi: 'Sản xuất & Vận hành',
    icon: 'precision_manufacturing',
    description: 'Lean, Six Sigma, Industry 4.0 và các mô hình tối ưu quy trình sản xuất hiện đại.',
    color: 'from-rose-900/80 to-rose-700/60',
  },
];

const kpiMetrics = [
  { value: '127+', label: 'Báo cáo phân tích' },
  { value: '18', label: 'Chuyên gia đóng góp' },
  { value: '45k+', label: 'Người theo dõi' },
];

export default function SupplyChainListing() {
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    articleService.getArticles({ parentCategory: 'chuoi-cung-ung', limit: 3 })
      .then((data) => setRecentArticles(data.articles || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="px-8 py-20 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm mb-6">
              Intelligence Hub
            </span>
            <h1 className="font-headline text-5xl md:text-6xl text-primary font-bold leading-tight tracking-tight mb-6">
              Chuỗi Cung ứng <br /><span className="italic">Thông minh.</span>
            </h1>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
              Trung tâm phân tích chiến lược dành cho các nhà hoạch định chuỗi cung ứng. Nơi hội tụ dữ liệu thị trường, xu hướng công nghệ và báo cáo chuyên sâu từ các chuyên gia hàng đầu.
            </p>
            <div className="flex gap-8">
              {kpiMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="font-headline text-3xl font-bold text-primary">{metric.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-outline mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[450px] rounded-xl overflow-hidden shadow-xl">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWVAvPfghbnkB8KEoA_BtKm1x6VW4oor7mCS57q6h2IALSwyeUtafyUMdPS4RWE3mHHpc6wL3_IvJUY33PIF6IPjY3-MGGjDfkHIeqlshbPS5JPwwzVL0mmkvZSlGYMrtdqRbyjkS7Ir7LdL7xl3GefWtjgRzY1HksDW3z4DEet_CiR2pgOKPiw22iu1p-BDNtwkhnY_5JEPCTcWyOm8tYbtw9VvC36iqnf36f_V5cP5Vo3WxROEl1AQPdzKXN1mjytyr5jlU408U"
              alt="Supply chain intelligence dashboard"
            />
          </div>
        </div>
      </section>

      {/* Topic Navigation — Replaces broken hardcoded cards */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-3">Khám phá theo Chủ đề</h2>
            <p className="text-on-surface-variant text-sm">Chọn lĩnh vực bạn muốn nghiên cứu chuyên sâu</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUPPLY_CHAIN_TOPICS.map((topic) => (
              <Link
                key={topic.slug}
                to={`/thu-vien/chuoi-cung-ung/${topic.slug}`}
                className="group relative overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-lowest hover:shadow-xl transition-all duration-500 p-8 flex flex-col justify-between min-h-[200px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-3xl text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {topic.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-outline">{topic.name}</p>
                      <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-primary-container transition-colors">
                        {topic.nameVi}
                      </h3>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                    arrow_forward
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">{topic.description}</p>
                <div className="mt-6 pt-4 border-t border-outline-variant/10">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Xem tất cả tài liệu →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles from API */}
      {recentArticles.length > 0 && (
        <section className="px-8 py-20 bg-surface">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-primary mb-12">Bài viết mới nhất</h2>
            <div className="space-y-6">
              {recentArticles.map((article) => (
                <Link
                  key={article._id}
                  to={`/thu-vien/chuoi-cung-ung/${article.topic}/${article.slug}`}
                  className="group flex gap-6 bg-surface-container-lowest rounded-lg border border-outline-variant/15 hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-sm"
                >
                  {article.coverImage && (
                    <div className="w-48 h-36 shrink-0 overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={article.coverImage}
                        alt={article.title}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="flex-1 p-5 flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                      {article.topic?.toUpperCase() || 'SUPPLY CHAIN'}
                    </span>
                    <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
