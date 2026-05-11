import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import NewsFlash from '../../components/widgets/NewsFlash';
import MostRead from '../../components/widgets/MostRead';
import NewsletterSidebar from '../../components/widgets/NewsletterSidebar';
import SearchBar from '../../components/ui/SearchBar';
import FilterBar from '../../components/ui/FilterBar';
import ArticleCard from '../../components/cards/ArticleCard';

const newsFlashData = [
  { time: '09:15 AM', title: 'Giá cước container đường biển từ Hải Phòng đi Mỹ giảm nhẹ 2% tuần này.' },
  { time: 'Hôm qua', title: 'Nghẽn cảng tại Singapore tiếp tục gây chậm trễ cho các tuyến nội Á.' },
  { time: 'Hôm qua', title: 'Việt Nam phê chuẩn kế hoạch nâng cấp hạ tầng đường sắt kết nối biên giới.' },
];

const mostReadData = [
  { title: 'Chiến lược đa dạng hóa chuỗi cung ứng: Bài học từ khủng hoảng năng lượng', meta: '12,402 LƯỢT ĐỌC' },
  { title: 'Tương lai của Drone trong giao hàng chặng cuối tại đô thị thông minh', meta: '9,850 LƯỢT ĐỌC' },
  { title: 'Bản đồ hạ tầng logistics Đông Nam Á tầm nhìn 2030', meta: '7,215 LƯỢT ĐỌC' },
];

const mapArticleToCard = (article) => ({
  tag: article.tags?.[0]?.toUpperCase() || article.category?.toUpperCase(),
  title: article.title,
  desc: article.excerpt || article.description,
  img: article.coverImage,
  author: article.author?.name,
  date: new Date(article.publishDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
  link: `/tin-tuc/${article.slug}`,
});

const NewsListing = () => {
  const { articles, isLoading, error } = useArticles({ category: 'tin-tuc', limit: 10 });

  const featured = articles[0];
  const mainArticles = articles.slice(1);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#0F3453] text-white pt-24 pb-20 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight">Tin tức Thị trường</h1>
          <p className="font-body text-white/80 max-w-2xl mb-12 text-lg leading-relaxed">
            Phân tích đa chiều và dữ liệu thực chứng về dòng chảy logistics toàn cầu. Chúng tôi lập bản đồ các xu hướng ảnh hưởng đến chuỗi cung ứng của bạn.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Category Tags */}
      <FilterBar />

      {/* Featured News */}
      {featured && (
        <section className="py-20 px-8 bg-surface">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl group">
                <img alt={featured.title} className="w-full aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-105" src={featured.coverImage} onError={(e) => { if (e.target.src !== 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=700&fit=crop') e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=700&fit=crop'; }} />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-widest">Tiêu điểm</span>
                  <span className="text-on-surface-variant font-label text-sm italic">
                    {new Date(featured.publishDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-8 leading-[1.15]">{featured.title}</h2>
                <p className="font-body text-on-surface-variant text-lg mb-10 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-6">
                  <a href={`/tin-tuc/${featured.slug}`} className="bg-[#0F3453] text-white px-8 py-3.5 rounded-lg font-label font-semibold hover:bg-primary transition-colors shadow-md">Đọc toàn văn bài viết</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <section className="py-24 px-8 bg-surface-container-low/30">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-20">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-6 mb-12">
                <h3 className="font-headline text-3xl font-bold text-primary">Bài báo chuyên sâu</h3>
              </div>

              {isLoading && (
                <div className="flex justify-center py-20">
                  <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                </div>
              )}

              {error && (
                <div className="text-center py-20">
                  <p className="text-on-surface-variant">Không thể tải bài viết. Vui lòng thử lại sau.</p>
                </div>
              )}

              {!isLoading && !error && mainArticles.map((article, index) => (
                <ArticleCard key={article._id || index} article={mapArticleToCard(article)} variant="horizontal" />
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-12">
                <NewsFlash items={newsFlashData} showViewAll={true} />
                <MostRead items={mostReadData} />
                <NewsletterSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsListing;
