import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import Pagination from '../../components/Pagination';

const CaseStudyListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentTag = searchParams.get('tag') || '';
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
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      updateParams({ search: searchInput, page: 1 });
    }
  };

  const handleTagClick = (tag) => {
    updateParams({ tag: tag === 'all' ? '' : tag, page: 1 });
  };

  const { articles: caseStudies, totalPages, isLoading, error } = useArticles({ 
    category: 'case-study', 
    limit: 12,
    page: currentPage,
    tag: currentTag,
    search: currentSearch
  });

  const filterTags = ['FMCG', 'Retail & E-commerce', 'Manufacturing', 'Pharmaceuticals', 'Energy & Oil'];

  return (
    <main className="pt-20 pb-24 px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <section className="mb-16 border-l-8 border-primary pl-8 mt-12">
        <p className="font-label text-xs tracking-widest uppercase text-outline mb-4">Case Studies &amp; Intelligence</p>
        <h1 className="font-headline text-6xl md:text-7xl font-extrabold text-primary tracking-tight mb-6">
          Case Study Thực tiễn
        </h1>
        <p className="font-headline italic text-xl md:text-2xl text-on-surface-variant max-w-3xl leading-relaxed">
          Phân tích sâu về các giải pháp chuỗi cung ứng hiện đại, từ tối ưu hóa cảng biển đến mạng lưới phân phối logistics lạnh toàn cầu.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-4 group">
          <label className="font-label text-xs uppercase text-outline mb-2 block">Tìm kiếm tài liệu</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-b border-outline-variant focus:border-primary focus:ring-0 transition-all text-sm font-medium placeholder:text-outline/60" 
              placeholder="Nhập từ khóa hoặc mã dự án..." 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>
        </div>
        <div className="md:col-span-8 overflow-x-auto pb-2">
          <label className="font-label text-xs uppercase text-outline mb-4 block">Lọc theo ngành hàng</label>
          <div className="flex gap-3">
            <button 
              onClick={() => handleTagClick('all')}
              className={`px-5 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${!currentTag ? 'bg-primary text-surface-bright' : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'}`}
            >
              Tất cả bài viết
            </button>
            {filterTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => handleTagClick(tag)}
                className={`px-5 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${currentTag === tag ? 'bg-primary text-surface-bright' : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-on-surface-variant">Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
        </div>
      )}

      {/* Case Study Grid */}
      {!isLoading && !error && (
        <>
          {caseStudies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-on-surface-variant text-lg">Không tìm thấy case study nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
              {caseStudies.map((study) => (
                <Link to={`/case-study/${study.slug}`} key={study._id} className="flex flex-col group cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-surface-container">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={study.title} src={study.coverImage} />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                        {study.tags?.[0] || 'Case Study'}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-headline text-2xl font-bold text-primary mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {study.title}
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
                    {study.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-outline-variant/15 flex justify-between items-center">
                    <span className="font-label text-xs text-outline italic">
                      Xuất bản: {new Date(study.publishDate).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                      Đọc chi tiết
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => updateParams({ page })} 
            />
          )}
        </>
      )}
    </main>
  );
};

export default CaseStudyListing;

