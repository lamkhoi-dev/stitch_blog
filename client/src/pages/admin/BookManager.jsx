import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';

const STATUS_TABS = [
  { key: '', label: 'Tất cả' },
  { key: 'published', label: 'Đã xuất bản' },
  { key: 'draft', label: 'Bản nháp' },
];

const STATUS_BADGE = {
  published: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xuất bản' },
  draft: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Bản nháp' },
};

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;
      const data = await adminService.getBooks(params);
      setBooks(data.books);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Không thể tải danh sách sách');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Xóa sách "${title}"? Không thể hoàn tác.`)) return;
    try {
      await adminService.deleteBook(id);
      toast.success('Đã xóa sách');
      fetchBooks();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  const handleStatusChange = (key) => {
    setStatusFilter(key);
    setPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Quản lý Sách</h1>
          <p className="text-sm text-on-surface-variant mt-1">{total} cuốn sách</p>
        </div>
        <Link
          to="/admin/books/new"
          className="px-6 py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Thêm sách mới
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-white border border-outline-variant/20 rounded-sm overflow-hidden">
          {STATUS_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleStatusChange(key)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                statusFilter === key
                  ? 'bg-primary text-white'
                  : 'text-on-surface-variant hover:bg-surface'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-outline-variant/20 rounded-sm text-sm focus:border-secondary outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-outline-variant/20 rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface border-b border-outline-variant/20 text-on-surface-variant text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold w-16">Bìa</th>
              <th className="p-4 font-semibold">Tiêu đề</th>
              <th className="p-4 font-semibold w-36">Tác giả</th>
              <th className="p-4 font-semibold w-16 text-center">Năm</th>
              <th className="p-4 font-semibold w-20 text-center">Chương</th>
              <th className="p-4 font-semibold w-28">Trạng thái</th>
              <th className="p-4 font-semibold w-24 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-on-surface-variant">
                  <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-on-surface-variant">
                  Không có sách nào
                </td>
              </tr>
            ) : (
              books.map((book) => {
                const badge = STATUS_BADGE[book.status] || STATUS_BADGE.draft;
                return (
                  <tr key={book._id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <img
                        src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=140&fit=crop'}
                        alt=""
                        className="w-12 h-16 object-cover rounded"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=140&fit=crop'; }}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-primary line-clamp-1">{book.title}</p>
                      {book.subtitle && (
                        <span className="text-[11px] text-on-surface-variant line-clamp-1">{book.subtitle}</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">{book.author}</td>
                    <td className="p-4 text-sm text-on-surface-variant text-center">{book.year}</td>
                    <td className="p-4 text-sm text-on-surface-variant text-center">{book.chapters?.length || 0}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 ${badge.bg} ${badge.text} text-xs rounded-sm font-semibold`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/admin/books/${book._id}/edit`}
                        className="text-primary hover:text-secondary p-2 inline-block"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id, book.title)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 text-sm border border-outline-variant/20 rounded-sm disabled:opacity-30 hover:bg-surface transition-colors"
          >
            ← Trước
          </button>
          <span className="text-sm text-on-surface-variant px-4">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-2 text-sm border border-outline-variant/20 rounded-sm disabled:opacity-30 hover:bg-surface transition-colors"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}
