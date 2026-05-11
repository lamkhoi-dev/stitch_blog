import { useParams, Link } from 'react-router-dom';
import { useArticleBySlug } from '../../hooks/useArticles';
import NewsFlash from '../../components/widgets/NewsFlash';
import MostRead from '../../components/widgets/MostRead';
import NewsletterSidebar from '../../components/widgets/NewsletterSidebar';

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

export default function ArticleDetail() {
  const { slug } = useParams();
  const { article, isLoading, error } = useArticleBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="material-symbols-outlined text-6xl text-outline">article</span>
        <p className="text-on-surface-variant text-lg">{error || 'Không tìm thấy bài viết.'}</p>
        <Link to="/tin-tuc" className="text-primary font-bold">← Quay lại danh sách</Link>
      </div>
    );
  }

  const date = new Date(article.publishDate).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <main className="max-w-[1440px] mx-auto px-8 py-16 grid grid-cols-12 gap-16">
        <article className="col-span-12 lg:col-span-8">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed-variant text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-sm">
                {article.category === 'case-study' ? 'Case Study' : article.tags?.[0] || 'Phân tích'}
              </span>
              <span className="text-on-surface-variant text-sm font-medium">{date}</span>
              <span className="text-on-surface-variant text-sm">• {article.readTime} đọc</span>
            </div>
            <h1 className="font-headline text-5xl md:text-6xl font-bold leading-[1.1] text-primary mb-8 tracking-tight italic">{article.title}</h1>
            <div className="flex items-center gap-4 py-6 border-y border-outline-variant/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
              <div>
                <p className="font-bold text-primary">{article.author?.name}</p>
                <p className="text-sm text-on-surface-variant">{article.author?.title}</p>
              </div>
            </div>
          </header>
          {article.coverImage && (
            <figure className="mb-12">
              <img className="w-full aspect-[21/9] object-cover rounded-md shadow-sm" src={article.coverImage} alt={article.title} onError={(e) => { if (e.target.src !== 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=500&fit=crop') e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=500&fit=crop'; }} />
            </figure>
          )}
          <div className="prose-editorial font-headline text-xl leading-relaxed text-on-surface space-y-8" dangerouslySetInnerHTML={{ __html: article.content }} />
          {article.tags?.length > 0 && (
            <footer className="mt-16 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-4">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Thẻ:</span>
              {article.tags.map((tag) => (
                <Link key={tag} to={`/tin-tuc?tag=${encodeURIComponent(tag)}`} className="bg-surface-container text-primary text-xs px-4 py-1.5 rounded-full hover:bg-secondary-container transition-colors">{tag}</Link>
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
