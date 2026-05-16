import { Link } from 'react-router-dom';
import ArticleCard from '../../components/cards/ArticleCard';
import { useArticles } from '../../hooks/useArticles';
import { usePublicStats } from '../../hooks/usePublicStats';
import { getImageUrl } from '../../utils/imageUtils';

export default function HomePage() {
  const { articles, isLoading, error } = useArticles({ limit: 5 });
  const { articles: caseStudies } = useArticles({ category: 'case-study', limit: 2 });
  const { stats } = usePublicStats();

  const featuredHotNews = articles.length > 0 ? {
    title: articles[0].title,
    desc: articles[0].summary || articles[0].content?.substring(0, 150) + '...',
    img: getImageUrl(articles[0].coverImage),
    tag: articles[0].category || "Tiêu điểm",
    date: new Date(articles[0].publishDate || articles[0].createdAt).toLocaleDateString('vi-VN'),
    link: `/tin-tuc/${articles[0].slug}`
  } : null;

  const compactHotNewsList = articles.slice(1).map(article => ({
    title: article.title,
    img: getImageUrl(article.coverImage),
    tag: article.category || "Tin tức",
    date: new Date(article.publishDate || article.createdAt).toLocaleDateString('vi-VN'),
    link: `/tin-tuc/${article.slug}`
  }));

  return (
    <>
      {/* Hero Section with Rich Photography */}
      <section className="relative min-h-[850px] flex items-center overflow-hidden bg-[#001e37]">
        <div className="absolute inset-0 z-0">
          <img
            alt="Global Logistics"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqdYLX0OsuN3hoOzRSXbBIMcSIzseLUIrXZrQORgSd7hlYt81P__OO2QLMPnf_1Z6PCPCqWM9EBHtSGL1yJvv4mzZdajoUoZinzjOqFFS2evhPzCkdI3CL1fs0no6fCHd8qJRwZEH5WWgZ-nj5-aXjzc1yan7RkLjGQ287rg-oNDzdo3hZwYQshvTjpQtxgsbcpfMyZ4Ala8jCEskBCn4evy-0H_ObPYUTxORWz8w6wHUixg_OWYpcN4vQXQnv3ENogi-IWuK9CJg"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#001e37] via-[#001e37]/80 to-transparent z-1"></div>
        <div className="absolute inset-0 pattern-overlay opacity-20 z-2"></div>
        <div className="max-w-7xl mx-auto px-8 py-24 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
              <h1 className="text-5xl md:text-7xl serif font-extrabold text-white leading-[1.1] mb-8 italic">
                Kiến thức Logistics và Supply Chain
              </h1>
              <p className="text-xl md:text-2xl text-on-primary-container font-light leading-relaxed max-w-2xl mb-12">
                Logiknowledge là nền tảng hàn lâm chuyên sâu, cung cấp cái nhìn đa chiều về dòng chảy logistics thế giới thông qua dữ liệu và phân tích sắc bén.
              </p>
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={() => {
                    const el = document.getElementById('mission-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white text-primary font-bold rounded-sm text-lg hover:bg-surface-container-low transition-all shadow-xl active:scale-95 inline-block"
                >
                  Khám phá ngay
                </button>
                <Link to="/thu-vien" className="px-8 py-4 border border-white/30 text-white font-bold rounded-sm text-lg hover:bg-white/10 transition-all">
                  Tài liệu nghiên cứu
                </Link>
              </div>
            </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                alt="Supply Chain Analytics"
                className="w-full h-full object-cover grayscale brightness-110 contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJIvDZbgXL7n6VAfRrK8rGeInJ8IaPKQPm18_TDFpjDUO0lEpfOZ33q7bXFyne1z8927zNfuXiRQ2pGjgKysmgUQgny0YcLU8y6kLyrwdh0qv96KkOXu0od9l6TVMLmwRD5O2VH9D4NeCXLHl_SWSrxBk8y0lKzIi860TXbBvtTf1RQb3vrxXur72ZLJei2-Kf3dXTW0lr844kapicT_yOuv0FgA9GfghB0ZG5MW8DlvGOJ5Ocyl9bZdjYAyQi_eS9o9zg47OtgPU"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & About Section with subtle background image */}
      <section id="mission-section" className="relative py-32 overflow-hidden bg-surface">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <img alt="background pattern" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA40-sL1oVvQrxTyXSYr2vD5XAb-tOMDOXUw3a-9aMLQL0lMcNMUwiMPiEsmx-oO_bFLrLOjv9An-11tzbxG8VZ50akShsNqVQkrxKXqg8rbQOf5YN1k0TsUjIXnFZl4W2MK9uqlwlbV6XGLy0HwZMaJjucxmmkio2x3Z8ZUDSAMzwgWkScXaR87kGgqiueaXMYqmfnVstI-FEYMYOZZ10-6uXipi8Or0jA7VZwDO8HNJupViqkn2atjzL4SBz_u7CzHz_i2giJHzs"/>
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-4xl serif font-bold text-primary mb-8 underline decoration-tertiary-fixed-dim decoration-4 underline-offset-8">Sứ mệnh & Mục tiêu</h2>
              <div className="space-y-8">
                <div className="p-8 bg-white border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-4">Sứ mệnh</h3>
                  <p className="text-on-surface-variant leading-relaxed italic">Chuẩn hóa hệ thống tri thức logistics tại Việt Nam thông qua việc lưu trữ và phân tích các biến động cung ứng quốc tế theo tiêu chuẩn báo chí điều tra.</p>
                </div>
                <div className="p-8 bg-white border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-4">Mục tiêu</h3>
                  <p className="text-on-surface-variant leading-relaxed italic">Trở thành điểm tựa học thuật cho 100,000 chuyên gia và sinh viên ngành chuỗi cung ứng vào năm 2025.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: stats?.totalArticles ?? '—', label: 'Bài nghiên cứu', bg: 'bg-primary-container text-white' },
                { value: stats?.totalBooks ?? '—', label: 'Đầu sách', bg: 'bg-surface-container-high text-primary' },
                { value: stats?.totalCaseStudies ?? '—', label: 'Case Study', bg: 'bg-surface-container-high text-primary' },
                { value: stats?.totalDocuments ?? '—', label: 'Tài liệu', bg: 'bg-secondary text-white' },
              ].map((item, index) => (
                <div key={index} className={`relative group flex flex-col justify-center items-center p-12 ${item.bg} text-center rounded-sm overflow-hidden`}>
                  <span className="relative z-10 text-5xl font-extrabold serif mb-2">{item.value}</span>
                  <span className="relative z-10 text-sm font-medium tracking-widest uppercase opacity-70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot News Section with Enhanced Photography */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-tertiary font-bold tracking-widest uppercase text-xs mb-4 block">Cập nhật thời gian thực</span>
              <h2 className="text-5xl serif font-bold text-primary italic">Tin tức nóng</h2>
            </div>
            <Link to="/tin-tuc" className="group flex items-center space-x-2 text-primary font-bold hover:opacity-70 transition-all">
              <span>Xem thêm</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Featured News */}
            <div className="lg:col-span-7">
              {isLoading ? (
                <div className="w-full h-96 bg-gray-200 animate-pulse rounded-sm"></div>
              ) : error ? (
                <div className="text-red-500">Lỗi: {error}</div>
              ) : featuredHotNews ? (
                <ArticleCard article={featuredHotNews} variant="featured" />
              ) : (
                <div className="text-on-surface-variant italic">Chưa có bài viết nào.</div>
              )}
            </div>
            {/* Right Column: List of News */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-full h-32 bg-gray-200 animate-pulse rounded-sm"></div>
                ))
              ) : (
                compactHotNewsList.map((article, index) => (
                  <ArticleCard key={index} article={article} variant="compact" />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section with High Quality Visuals */}
      <section className="bg-surface py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-5xl serif font-bold text-primary mb-8 italic">Case Study thực tiễn</h2>
              <p className="text-on-surface-variant mb-10 leading-relaxed text-lg">Chúng tôi phân tách các chiến dịch thực tế từ các tập đoàn hàng đầu để rút ra bài học kinh nghiệm cho cộng đồng logistics.</p>
              <Link to="/case-study" className="bg-primary text-white px-10 py-4 rounded-sm font-bold flex items-center justify-center space-x-3 hover:shadow-lg transition-all active:scale-95 inline-flex w-fit">
                <span>Khám phá kho thư viện</span>
                <span className="material-symbols-outlined">library_books</span>
              </Link>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.length > 0 ? caseStudies.map((cs, index) => (
                <div key={cs._id || index} className="relative bg-primary-container group p-1 aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                  <img
                    alt={cs.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    src={getImageUrl(cs.coverImage)}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=800&fit=crop'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001e37] via-[#001e37]/40 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <span className="text-secondary-fixed text-xs font-bold tracking-widest uppercase mb-4 block">
                      {cs.tags?.[0] || cs.category || 'Case Study'}
                    </span>
                    <h3 className="text-2xl serif font-bold mb-4 italic leading-tight">{cs.title}</h3>
                    <div className="max-h-0 group-hover:max-h-32 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <p className="text-sm text-slate-300 mb-6 line-clamp-2">{cs.excerpt || cs.content?.substring(0, 120) + '...'}</p>
                      <Link to={`/case-study/${cs.slug}`} className="text-sm font-bold border-b border-white pb-1 inline-block">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              )) : (
                /* Fallback when no case studies exist yet */
                [1, 2].map((i) => (
                  <div key={i} className="relative bg-primary-container p-1 aspect-[4/5] rounded-sm overflow-hidden shadow-2xl flex items-center justify-center">
                    <div className="text-center text-white/50 p-8">
                      <span className="material-symbols-outlined text-6xl mb-4 block">analytics</span>
                      <p className="text-sm italic">Case study sẽ được cập nhật...</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Editorial Background */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="relative bg-primary-container p-12 md:p-24 rounded-sm overflow-hidden flex flex-col items-center text-center shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img alt="Abstract Logistics" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTeJUkZ3aaqywBbfzS5vjzaRkvEhg6jEaAub3d_dV_Lgc1MPYSfchJ9-SAHKihWpkoEe68U5K2syumKveD8RGiAgfnPEdUNETtYOIUrQ1gS--QNl1_yaADSZrZResdYeIihOMLEimuadKzSPN2QFxCu0LMSbYMpocxLghjPRxDaR7kAJzCXnbvwSjCBKHucI4_x_6eti8ochGyxG_fG7JkuTE7erxEi5i8adOLew4TRfUZ85VM-CqlwVIXnHYs6vPSJMne-xanWLA"/>
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="material-symbols-outlined text-secondary-fixed text-6xl mb-6">mail</span>
            <h2 className="text-4xl serif font-bold text-white mb-6 italic">Nhận bản tin chuyên gia hàng tuần</h2>
            <p className="text-on-primary-container mb-10 text-lg">Đăng ký để nhận các phân tích độc quyền và dữ liệu supply chain mới nhất gửi trực tiếp vào hộp thư của bạn.</p>
            <form className="flex flex-col md:flex-row gap-4 w-full">
              <input className="flex-grow bg-white border-none focus:ring-2 focus:ring-secondary py-4 px-6 rounded-sm text-primary placeholder:italic" placeholder="Địa chỉ email của bạn" type="email"/>
              <button className="bg-secondary text-white font-bold py-4 px-10 rounded-sm hover:opacity-90 transition-all active:scale-95 shadow-lg">Đăng ký ngay</button>
            </form>
            <p className="mt-6 text-xs text-on-primary-container/60 italic">Chúng tôi cam kết bảo mật thông tin và không gửi thư rác.</p>
          </div>
        </div>
      </section>
    </>
  );
}
