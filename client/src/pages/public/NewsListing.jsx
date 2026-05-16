import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import SearchBar from '../../components/ui/SearchBar';
import ArticleCard from '../../components/cards/ArticleCard';
import Pagination from '../../components/Pagination';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      updateParams({ search: searchInput, page: 1 });
    }
  };

  const { articles, totalPages, isLoading, error } = useArticles({
    category: 'tin-tuc',
    limit: 10,
    page: currentPage,
    search: currentSearch,
  });

  const featured = currentPage === 1 && !currentSearch ? articles[0] : null;
  const mainArticles = featured ? articles.slice(1) : articles;

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#0F3453] text-white pt-24 pb-20 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight">Tin tức Thị trường</h1>
          <p className="font-body text-white/80 max-w-2xl mb-12 text-lg leading-relaxed">
            Phân tích đa chiều và dữ liệu thực chứng về dòng chảy logistics toàn cầu. Chúng tôi lập bản đồ các xu hướng ảnh hưởng đến chuỗi cung ứng của bạn.
          </p>
          <SearchBar
            value={searchInput}
            onSearch={setSearchInput}
            onKeyDown={handleSearchSubmit}
          />
        </div>
      </section>

      {/* Featured News */}
      {featured && (
        <section className="py-20 px-8 bg-surface">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  alt={featured.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={featured.coverImage}
                  onError={(e) => { if (e.target.src !== 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=700&fit=crop') e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=700&fit=crop'; }}
                />
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

      {/* Main Content — Full Width */}
      <section className="py-24 px-8 bg-surface-container-low/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-6 mb-12">
            <h3 className="font-headline text-3xl font-bold text-primary">Bài báo chuyên sâu</h3>
            {currentSearch && (
              <span className="text-sm text-on-surface-variant italic">
                Kết quả tìm kiếm: "<strong>{currentSearch}</strong>"
              </span>
            )}
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

          {!isLoading && !error && (
            <>
              {mainArticles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-on-surface-variant text-lg">Không tìm thấy bài báo nào phù hợp.</p>
                </div>
              ) : (
                <div className="space-y-20">
                  {mainArticles.map((article, index) => (
                    <ArticleCard key={article._id || index} article={mapArticleToCard(article)} variant="horizontal" />
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => updateParams({ page })}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default NewsListing;
