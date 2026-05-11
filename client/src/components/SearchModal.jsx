import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

const TYPE_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'articles', label: 'Bài viết', icon: 'article' },
  { key: 'books', label: 'Sách', icon: 'menu_book' },
  { key: 'documents', label: 'Tài liệu', icon: 'description' },
];

const TYPE_BADGE = {
  article: { label: 'Bài viết', color: 'bg-primary/10 text-primary' },
  book: { label: 'Sách', color: 'bg-teal-50 text-teal-700' },
  document: { label: 'Tài liệu', color: 'bg-indigo-50 text-indigo-700' },
};

const SUGGESTIONS = ['logistics', 'FCL', 'container', 'chuỗi cung ứng', 'hợp đồng'];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [results, setResults] = useState([]);
  const [counts, setCounts] = useState({ articles: 0, books: 0, documents: 0 });
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setActiveIndex(-1);
      setType('all');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setCounts({ articles: 0, books: 0, documents: 0 });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get('/search', {
          params: { q: query, type, limit: 20 },
        });
        setResults(data.results || []);
        setCounts(data.counts || { articles: 0, books: 0, documents: 0 });
        setActiveIndex(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, type]);

  // Navigate to result
  const goToResult = useCallback(
    (result) => {
      navigate(result.url);
      onClose();
    },
    [navigate, onClose]
  );

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    }
    if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      goToResult(results[activeIndex]);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-result-item]');
      items[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  const totalResults = results.length;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        style={{ animation: 'searchSlideIn 0.2s ease-out' }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/15">
          <span className="material-symbols-outlined text-outline-variant text-xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết, sách, tài liệu..."
            className="flex-1 text-base text-on-surface placeholder:text-outline-variant outline-none bg-transparent"
          />
          {loading && (
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 bg-surface rounded text-[11px] text-on-surface-variant font-mono border border-outline-variant/20">
            ESC
          </kbd>
        </div>

        {/* Type tabs */}
        <div className="flex items-center gap-1 px-5 py-2 border-b border-outline-variant/10 bg-surface/50">
          {TYPE_TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => { setType(key); setActiveIndex(-1); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm flex items-center gap-1 transition-colors ${
                type === key
                  ? 'bg-primary text-white'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
              {label}
              {key !== 'all' && counts[key + 's'] !== undefined && query.length >= 2 && (
                <span className="ml-0.5 opacity-70">({counts[key + 's'] || 0})</span>
              )}
            </button>
          ))}
        </div>

        {/* Results area */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            /* Empty state: suggestions */
            <div className="px-5 py-10 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant/40 mb-3 block">
                manage_search
              </span>
              <p className="text-sm text-on-surface-variant mb-4">
                Nhập ít nhất 2 ký tự để tìm kiếm
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="px-5 py-10 text-center">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-on-surface-variant">Đang tìm kiếm...</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="px-5 py-10 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant/40 mb-3 block">
                search_off
              </span>
              <p className="text-sm text-on-surface-variant">
                Không tìm thấy kết quả cho "{query}"
              </p>
            </div>
          ) : (
            <ul className="py-2">
              {results.map((item, index) => {
                const badge = TYPE_BADGE[item.type];
                const isActive = index === activeIndex;
                return (
                  <li key={`${item.type}-${item._id}`} data-result-item>
                    <button
                      onClick={() => goToResult(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                        isActive ? 'bg-primary/5' : 'hover:bg-surface/80'
                      }`}
                    >
                      {/* Thumbnail */}
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt=""
                          className="w-12 h-12 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded flex-shrink-0">
                          <span className="material-symbols-outlined text-outline text-lg">
                            {item.type === 'book' ? 'menu_book' : item.type === 'article' ? 'article' : 'description'}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${badge.color}`}>
                            {badge.label}
                          </span>
                          {item.category && (
                            <span className="text-[10px] text-on-surface-variant">{item.category}</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-on-surface line-clamp-1">{item.title}</p>
                        {item.excerpt && (
                          <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{item.excerpt}</p>
                        )}
                      </div>

                      {/* Arrow */}
                      <span className={`material-symbols-outlined text-[16px] flex-shrink-0 transition-opacity ${
                        isActive ? 'text-primary opacity-100' : 'opacity-0'
                      }`}>
                        arrow_forward
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {totalResults > 0 && (
          <div className="px-5 py-2 border-t border-outline-variant/10 bg-surface/50 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>{totalResults} kết quả</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-outline-variant/20 rounded text-[10px] font-mono">↑↓</kbd>
                di chuyển
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-outline-variant/20 rounded text-[10px] font-mono">Enter</kbd>
                mở
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes searchSlideIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
