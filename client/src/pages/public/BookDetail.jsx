import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookBySlug } from '../../hooks/useBooks';
import NewsFlash from '../../components/widgets/NewsFlash';
import MostRead from '../../components/widgets/MostRead';
import NewsletterSidebar from '../../components/widgets/NewsletterSidebar';

const FALLBACK = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=500&fit=crop';

const newsFlash = [
  { time: '08:30 AM', title: 'Giá cước container đường biển từ Thượng Hải đi Châu Âu tăng 4% trong tuần qua.' },
  { time: '10:15 AM', title: 'Singapore công bố kế hoạch mở rộng giai đoạn 3 cảng Tuas.' },
  { time: '02:45 PM', title: 'Việt Nam thăng hạng trong chỉ số Hiệu suất Logistics (LPI) của World Bank.' },
];

const mostRead = [
  { title: 'Ảnh hưởng của lạm phát đến chi phí vận tải đường bộ 2024.', author: 'Lê Hoài Nam' },
  { title: 'Lộ trình chuyển đổi sang xe tải điện trong vận tải hàng hóa.', author: 'Nguyễn Thùy Linh' },
  { title: 'Blockchain và sự minh bạch hóa vận đơn quốc tế.', author: 'Đặng Minh Quân' },
];

export default function BookDetail() {
  const { slug } = useParams();
  const { book, isLoading, error } = useBookBySlug(slug);
  const [activeChapter, setActiveChapter] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="material-symbols-outlined text-6xl text-outline">menu_book</span>
        <p className="text-on-surface-variant text-lg">{error || 'Không tìm thấy sách.'}</p>
        <Link to="/thu-vien/sach" className="text-primary font-bold">← Quay lại danh sách</Link>
      </div>
    );
  }

  const date = new Date(book.updatedAt || book.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
  const currentChapter = book.chapters?.[activeChapter];

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-16 grid grid-cols-12 gap-16">
        <article className="col-span-12 lg:col-span-8">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed-variant text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-sm">
                Sách chuyên ngành
              </span>
              <span className="text-on-surface-variant text-sm font-medium">{date}</span>
              {book.readTime && <span className="text-on-surface-variant text-sm">• {book.readTime} đọc</span>}
            </div>
            <h1 className="font-headline text-5xl md:text-6xl font-bold leading-[1.1] text-primary mb-4 tracking-tight italic">{book.title}</h1>
            {book.subtitle && (
              <p className="font-headline text-xl text-on-surface-variant italic mb-8">{book.subtitle}</p>
            )}
            <div className="flex items-center gap-4 py-6 border-y border-outline-variant/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
              <div>
                <p className="font-bold text-primary">{book.author}</p>
                <p className="text-sm text-on-surface-variant">Năm xuất bản: {book.year}</p>
              </div>
            </div>
          </header>

          {book.coverImage && (
            <figure className="mb-12">
              <img
                className="w-full aspect-[21/9] object-cover rounded-md shadow-sm"
                src={book.coverImage}
                alt={book.title}
                onError={(e) => { if (e.target.src !== FALLBACK) e.target.src = FALLBACK; }}
              />
            </figure>
          )}

          {/* Book description as lead */}
          {book.description && (
            <div className="prose-editorial font-headline text-xl leading-relaxed text-on-surface space-y-8 mb-12">
              <p className="drop-cap">{book.description}</p>
            </div>
          )}

          {/* Chapter navigation + content */}
          {book.chapters?.length > 0 && (
            <div className="mb-12">
              {/* Chapter tabs */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-outline-variant/20 overflow-x-auto">
                <span className="text-xs uppercase tracking-widest text-outline font-bold shrink-0 mr-2">Mục lục:</span>
                {book.chapters.map((ch, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveChapter(i)}
                    className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                      activeChapter === i
                        ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Chương {i + 1}
                  </button>
                ))}
              </div>

              {/* Active chapter content */}
              {currentChapter && (
                <div>
                  <h2 className="font-headline text-3xl font-bold text-primary mb-4">
                    Chương {activeChapter + 1}: {currentChapter.title}
                  </h2>
                  {currentChapter.excerpt && !currentChapter.content && (
                    <p className="text-on-surface-variant text-lg leading-relaxed italic mb-8">{currentChapter.excerpt}</p>
                  )}
                  {currentChapter.content && (
                    <div className="prose-editorial font-headline text-xl leading-relaxed text-on-surface space-y-8" dangerouslySetInnerHTML={{ __html: currentChapter.content }} />
                  )}
                </div>
              )}

              {/* Chapter navigation arrows */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-outline-variant/20">
                <button
                  onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                  disabled={activeChapter === 0}
                  className="flex items-center gap-2 text-primary font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:gap-3 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Chương trước
                </button>
                <span className="text-on-surface-variant text-sm">
                  {activeChapter + 1} / {book.chapters.length}
                </span>
                <button
                  onClick={() => setActiveChapter(Math.min(book.chapters.length - 1, activeChapter + 1))}
                  disabled={activeChapter === book.chapters.length - 1}
                  className="flex items-center gap-2 text-primary font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:gap-3 transition-all"
                >
                  Chương sau
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Tags */}
          {book.tags?.length > 0 && (
            <footer className="mt-16 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Thẻ:</span>
              {book.tags.map((tag) => (
                <span key={tag} className="bg-surface-container text-primary text-xs px-4 py-1.5 rounded-full">{tag}</span>
              ))}
            </footer>
          )}
        </article>

        <aside className="col-span-12 lg:col-span-4 space-y-12">
          <NewsFlash items={newsFlash} />
          <MostRead items={mostRead} />
          <NewsletterSidebar />
        </aside>
      </main>
    </>
  );
}
