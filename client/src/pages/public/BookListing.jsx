import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';

export default function BookListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const { books, isLoading, error } = useBooks({ limit: 12, search: activeSearch });

  return (
    <div className="max-w-screen-2xl mx-auto">
      <main className="bg-surface min-h-screen px-8 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-headline text-5xl font-bold text-on-surface mb-6 leading-tight">
              Thư viện Sách <br /><span className="italic text-primary">Chuyên ngành.</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              Khám phá kho tri thức được tuyển chọn khắt khe bởi các chuyên gia Logistics và Chuỗi cung ứng hàng đầu.
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-16 items-end">
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-outline mb-2 block">Tìm kiếm trong danh mục Sách</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 px-12 py-4 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all"
                  placeholder="Tên sách, tác giả hoặc ISBN..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveSearch(searchQuery); }}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">menu_book</span>
              </div>
            </div>
            <button
              onClick={() => setActiveSearch(searchQuery)}
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/10"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Loading & Error */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
            </div>
          )}
          {error && (
            <div className="text-center py-20">
              <p className="text-on-surface-variant">Không thể tải sách. Vui lòng thử lại sau.</p>
            </div>
          )}

          {/* Book Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {books.map((book) => (
                <Link key={book._id} to={`/thu-vien/sach/${book.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg shadow-md transition-transform duration-500 group-hover:-translate-y-2">
                    <img className="w-full h-full object-cover" src={book.coverImage} alt={book.title} onError={(e) => { if (e.target.src !== 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop') e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop'; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded border border-primary/10 uppercase">
                        {book.year}
                      </span>
                      <span className="text-[10px] text-outline font-medium tracking-tighter">
                        {book.chapters?.length || 0} Chương
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold leading-snug text-on-surface group-hover:text-primary transition-colors">{book.title}</h3>
                    <p className="text-xs text-outline uppercase tracking-wider font-semibold italic">{book.author}</p>
                    <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">{book.description}</p>
                    <div className="pt-4 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-primary font-bold text-xs">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        <span>Xem chi tiết</span>
                      </span>
                      <span className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">bookmark</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}


            </div>
          )}
        </div>
      </main>
    </div>
  );
}
