import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useArticles } from '../../hooks/useArticles';
import articleService from '../../services/articleService';

// Topics that use Pattern B (full-width landscape list)
const PATTERN_B_TOPICS = ['procurement', 'planning'];
// Topics that use Pattern C (bento grid + quote)
const PATTERN_C_TOPICS = ['sourcing', 'manufacturing'];

// Logistics sidebar icons per slug
const LOGISTICS_ICONS = {
  'duong-bien': 'directions_boat',
  'hang-khong': 'flight',
  'duong-bo': 'local_shipping',
  'duong-sat': 'train',
  'da-phuong-thuc': 'hub',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function ArticleImage({ src, alt, className }) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop'; }}
    />
  );
}

/* ─── PATTERN A: Logistics Sidebar + List ─── */
function PatternA({ topicSlug, currentTopic, siblingTopics, articles, isLoading, basePath }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-surface-container-low border-r border-outline-variant/15 p-6 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
        <div className="mb-8">
          <h2 className="font-headline italic text-xl text-primary">Global Modalities</h2>
          <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mt-1">Logistic Intelligence Mapping</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {siblingTopics.map((t) => (
            <Link
              key={t.slug}
              to={`${basePath}/${t.slug}`}
              className={`flex items-center gap-3 p-3 rounded-md font-semibold transition-all duration-200 ${
                t.slug === topicSlug
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={t.slug === topicSlug ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {LOGISTICS_ICONS[t.slug] || t.icon || 'local_shipping'}
              </span>
              <span className="text-xs uppercase tracking-wider">{t.name}</span>
            </Link>
          ))}
        </nav>
        <div className="pt-8">
          <button className="w-full py-3 bg-primary text-on-primary rounded font-medium text-sm hover:opacity-90 transition-opacity">
            Download Reports
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 pt-8 pb-20 px-6 md:px-12 max-w-4xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2 text-on-surface-variant text-xs uppercase tracking-widest font-label">
          <span>Library</span>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span>Logistics</span>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-primary font-bold">{currentTopic?.name || topicSlug}</span>
        </div>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight mb-4">
            {currentTopic?.nameVi || currentTopic?.name || topicSlug}
          </h1>
          {currentTopic?.description && (
            <p className="text-on-surface-variant leading-relaxed mb-6 max-w-2xl">{currentTopic.description}</p>
          )}
          {/* Search */}
          <div className="relative max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-lg focus:border-primary/50 outline-none text-sm transition-all"
              placeholder="Tìm kiếm tài liệu, quy trình, pháp lý..."
              type="text"
            />
          </div>
        </header>

        {/* Article List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex bg-surface-container-lowest rounded-lg border border-outline-variant/15 animate-pulse h-44" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline/30 block mb-4">article</span>
            <p className="text-on-surface-variant">Chưa có bài viết nào trong chủ đề này.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article._id}
                to={`${basePath}/${topicSlug}/${article.slug}`}
                className="group flex bg-surface-container-lowest rounded-lg border border-outline-variant/15 hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-sm"
              >
                <div className="w-56 h-44 shrink-0 overflow-hidden">
                  <ArticleImage
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase text-outline tracking-tighter">
                        {formatDate(article.publishDate)}
                      </span>
                      {article.fileSize && (
                        <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">picture_as_pdf</span>
                          {article.fileSize}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {article.readTime && (
                      <span className="text-[11px] text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {article.readTime}
                      </span>
                    )}
                    {article.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] bg-surface-container-highest text-on-surface-variant rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── PATTERN B: Supply Chain Full-width Landscape List (Procurement, Planning) ─── */
function PatternB({ topicSlug, currentTopic, articles, isLoading, basePath }) {
  const categoryLabel = 'Supply Chain Intelligence';

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 border-b border-outline-variant/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="inline-block py-1 px-3 mb-6 bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-widest font-bold rounded-sm">
              {categoryLabel}
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight tracking-tight">
              {currentTopic?.nameVi?.split(' - ')[0] || currentTopic?.name || topicSlug}
              {currentTopic?.nameVi?.includes(' - ') && (
                <>
                  <br />
                  <span className="italic font-light text-on-surface-variant text-4xl md:text-5xl">
                    {currentTopic.nameVi.split(' - ').slice(1).join(' - ')}
                  </span>
                </>
              )}
            </h1>
          </div>
          {currentTopic?.description && (
            <div className="lg:col-span-4 pb-2">
              <p className="text-on-surface-variant leading-relaxed text-lg font-light italic">
                "{currentTopic.description}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sticky Search */}
      <section className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-md py-5 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative max-w-2xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant/20 rounded-lg focus:ring-1 focus:ring-primary/50 outline-none text-on-surface-variant transition-all"
              placeholder={`Tìm kiếm tài liệu ${currentTopic?.name || ''}...`}
              type="text"
            />
          </div>
        </div>
      </section>

      {/* Article List */}
      <section className="max-w-7xl mx-auto px-6 mt-16 pb-20">
        {isLoading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-8 animate-pulse">
                <div className="col-span-4 h-64 bg-surface-container-high rounded-lg" />
                <div className="col-span-8 space-y-4 py-4">
                  <div className="h-4 bg-surface-container-high rounded w-1/3" />
                  <div className="h-8 bg-surface-container-high rounded w-3/4" />
                  <div className="h-4 bg-surface-container-high rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline/30 block mb-4">article</span>
            <p className="text-on-surface-variant">Chưa có bài viết nào trong chủ đề này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {articles.map((article) => (
              <Link
                key={article._id}
                to={`${basePath}/${topicSlug}/${article.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-xl hover:bg-surface-container transition-colors duration-500 p-1"
              >
                <div className="md:col-span-4 h-64 overflow-hidden rounded-lg">
                  <ArticleImage
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="md:col-span-8 pr-6 py-4">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-outline uppercase tracking-widest font-semibold text-xs">
                      Cập nhật: {formatDate(article.publishDate)}
                    </span>
                    <span className="flex items-center gap-1 bg-primary/5 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                      <span className="material-symbols-outlined text-xs">picture_as_pdf</span>
                      PDF AVAILABLE
                    </span>
                  </div>
                  <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-primary-container transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-light mb-6">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center text-primary font-bold text-sm tracking-tight border-b border-primary/20 pb-0.5 group-hover:border-primary transition-all">
                    ĐỌC CHI TIẾT <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More */}
        {articles.length > 0 && (
          <div className="mt-20 flex justify-center">
            <button className="group flex flex-col items-center gap-4">
              <span className="font-bold text-primary tracking-[0.2em] uppercase text-sm">Xem thêm</span>
              <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_double_arrow_down</span>
              </div>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

/* ─── PATTERN C: Supply Chain Bento Grid (Sourcing, Manufacturing) ─── */
function PatternC({ topicSlug, currentTopic, articles, isLoading, basePath }) {
  const hotTags = currentTopic?.hotTags || articles.flatMap(a => a.tags || []).slice(0, 4);
  const [featured, ...rest] = articles;

  return (
    <div className="min-h-[calc(100vh-80px)]">
      <main className="pt-28 pb-20 px-6 max-w-screen-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-on-surface-variant text-xs uppercase tracking-widest">
          <span>Library</span>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span>Supply Chain</span>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-primary font-bold">{currentTopic?.name || topicSlug}</span>
        </div>

        {/* Header */}
        <header className="mb-12 border-l-4 border-primary pl-8 py-2">
          <h1 className="text-5xl md:text-6xl font-headline font-semibold text-primary leading-tight tracking-tight italic">
            {currentTopic?.nameVi || currentTopic?.name || topicSlug}
          </h1>
          {currentTopic?.description && (
            <p className="mt-4 max-w-3xl text-lg text-on-surface-variant leading-relaxed">
              {currentTopic.description}
            </p>
          )}
        </header>

        {/* Search */}
        <section className="mb-16">
          <div className="bg-surface-container-low p-1 rounded-xl max-w-4xl">
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-grow flex items-center px-4 bg-surface-container-lowest rounded-lg border border-outline-variant/30 focus-within:border-primary/50 transition-all">
                <span className="material-symbols-outlined text-outline">search</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 py-4 px-3 text-on-surface placeholder:text-outline-variant outline-none"
                  placeholder={`Tìm kiếm nghiên cứu về ${currentTopic?.name || topicSlug}...`}
                  type="text"
                />
              </div>
              <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90">
                <span>Tra cứu</span>
                <span className="material-symbols-outlined text-sm">bolt</span>
              </button>
            </div>
          </div>
          {hotTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs uppercase text-on-surface-variant mr-2 self-center">Chủ đề hot:</span>
              {hotTags.slice(0, 4).map((tag, i) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-xs font-bold rounded-sm tracking-wide ${
                    i === 0
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container-highest text-on-surface-variant font-medium'
                  }`}
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Bento Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-pulse">
            <div className="md:col-span-8 h-80 bg-surface-container-high rounded-xl" />
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="h-36 bg-surface-container-high rounded-xl" />
              <div className="h-36 bg-surface-container-high rounded-xl" />
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline/30 block mb-4">article</span>
            <p className="text-on-surface-variant">Chưa có bài viết nào trong chủ đề này.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Featured Card */}
            {featured && (
              <Link
                to={`${basePath}/${topicSlug}/${featured.slug}`}
                className="md:col-span-8 group bg-surface-container-lowest border border-outline-variant/15 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8"
              >
                <div className="md:w-1/3 aspect-[3/4] rounded-lg overflow-hidden relative shrink-0">
                  <ArticleImage
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded">
                    FEATURED
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs text-outline uppercase tracking-tighter">Cập nhật: {formatDate(featured.publishDate)}</span>
                      <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
                        <span className="text-[10px] font-bold">PDF AVAILABLE</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4 group-hover:text-primary-container transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed mb-6">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-surface-container-highest text-primary font-bold px-6 py-2 rounded hover:bg-primary hover:text-on-primary transition-all text-sm">
                      Đọc tóm tắt
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Secondary Cards */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {rest.slice(0, 2).map((article) => (
                <Link
                  key={article._id}
                  to={`${basePath}/${topicSlug}/${article.slug}`}
                  className="group bg-surface-container-lowest border border-outline-variant/15 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-outline uppercase">{formatDate(article.publishDate)}</span>
                    <span className="material-symbols-outlined text-sm text-primary">picture_as_pdf</span>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-3 group-hover:underline decoration-primary/30">
                    {article.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-4">{article.excerpt}</p>
                  <span className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    XEM CHI TIẾT <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom Row */}
            {rest.slice(2).map((article, i) => (
              <Link
                key={article._id}
                to={`${basePath}/${topicSlug}/${article.slug}`}
                className="md:col-span-4 group bg-surface-container-lowest border border-outline-variant/15 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border-t-4 border-t-secondary-container"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-outline uppercase">{formatDate(article.publishDate)}</span>
                  <span className="material-symbols-outlined text-sm text-primary">picture_as_pdf</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-3">{article.title}</h3>
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-secondary italic">
                    {article.tags?.[0] || 'Academic Journal'}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-lg cursor-pointer hover:text-primary">bookmark</span>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Load More */}
        {articles.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-30" />
            <button className="group flex items-center gap-3 bg-surface border border-primary/20 px-10 py-4 text-primary font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm rounded">
              <span className="text-lg">Xem thêm</span>
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_double_arrow_down</span>
            </button>
            <p className="text-xs text-on-surface-variant font-medium tracking-wide">
              Hiển thị {articles.length} tài liệu nghiên cứu
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Root Component ─── */
export default function TopicPage() {
  const { topicSlug } = useParams();
  const location = useLocation();
  const parentCategory = location.pathname.includes('/chuoi-cung-ung/') ? 'chuoi-cung-ung' : 'logistics';

  const [currentTopic, setCurrentTopic] = useState(null);
  const [siblingTopics, setSiblingTopics] = useState([]);
  const [topicLoading, setTopicLoading] = useState(true);

  const { articles, isLoading, error } = useArticles({
    category: 'topic-post',
    topic: topicSlug,
    parentCategory,
    limit: 20,
  });

  useEffect(() => {
    let isMounted = true;
    setTopicLoading(true);
    Promise.all([
      articleService.getTopicBySlug(topicSlug),
      articleService.getTopics(parentCategory),
    ])
      .then(([topic, allTopics]) => {
        if (isMounted) {
          setCurrentTopic(topic);
          setSiblingTopics(allTopics);
        }
      })
      .catch((err) => console.error('Topic fetch error:', err))
      .finally(() => { if (isMounted) setTopicLoading(false); });
    return () => { isMounted = false; };
  }, [topicSlug, parentCategory]);

  const basePath = parentCategory === 'logistics' ? '/thu-vien/logistics' : '/thu-vien/chuoi-cung-ung';

  if (topicLoading && isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-on-surface-variant text-sm tracking-widest uppercase">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  const sharedProps = { topicSlug, currentTopic, articles, isLoading, basePath };

  if (parentCategory === 'logistics') {
    return <PatternA {...sharedProps} siblingTopics={siblingTopics} />;
  }
  if (PATTERN_B_TOPICS.includes(topicSlug)) {
    return <PatternB {...sharedProps} />;
  }
  if (PATTERN_C_TOPICS.includes(topicSlug)) {
    return <PatternC {...sharedProps} />;
  }
  // Default fallback for any new supply chain topic
  return <PatternB {...sharedProps} />;
}
