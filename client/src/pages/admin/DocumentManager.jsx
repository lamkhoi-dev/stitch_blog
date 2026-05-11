import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';

const TYPE_TABS = [
  { key: '', label: 'Tất cả' },
  { key: 'hop-dong', label: 'Hợp đồng' },
  { key: 'chung-tu', label: 'Chứng từ' },
  { key: 'incoterms', label: 'Incoterms' },
];

const STATUS_BADGE = {
  published: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xuất bản' },
  draft: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Bản nháp' },
};

const TYPE_LABEL = {
  'hop-dong': { label: 'Hợp đồng', icon: 'picture_as_pdf', color: 'bg-red-50 text-red-700' },
  'chung-tu': { label: 'Chứng từ', icon: 'description', color: 'bg-blue-50 text-blue-700' },
  'incoterms': { label: 'Incoterms', icon: 'swap_horiz', color: 'bg-teal-50 text-teal-700' },
};

export default function DocumentManager() {
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (typeFilter) params.type = typeFilter;
      if (search) params.search = search;
      const data = await adminService.getDocuments(params);
      setDocuments(data.documents);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Không thể tải danh sách tài liệu');
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter, search]);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Xóa tài liệu "${title}"? Không thể hoàn tác.`)) return;
    try {
      await adminService.deleteDocument(id);
      toast.success('Đã xóa tài liệu');
      fetchDocuments();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  const handleTypeChange = (key) => {
    setTypeFilter(key);
    setPage(1);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Quản lý Tài liệu</h1>
          <p className="text-sm text-on-surface-variant mt-1">{total} tài liệu</p>
        </div>
        <Link
          to="/admin/documents/new"
          className="px-6 py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Thêm tài liệu
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-white border border-outline-variant/20 rounded-sm overflow-hidden">
          {TYPE_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTypeChange(key)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                typeFilter === key
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
            placeholder="Tìm kiếm tài liệu..."
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
              <th className="p-4 font-semibold w-16">Ảnh</th>
              <th className="p-4 font-semibold">Tiêu đề</th>
              <th className="p-4 font-semibold w-28">Loại</th>
              <th className="p-4 font-semibold w-28">Ngày tạo</th>
              <th className="p-4 font-semibold w-32">File</th>
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
            ) : documents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-on-surface-variant">
                  Không có tài liệu nào
                </td>
              </tr>
            ) : (
              documents.map((doc) => {
                const badge = STATUS_BADGE[doc.status] || STATUS_BADGE.draft;
                const typeMeta = TYPE_LABEL[doc.type] || TYPE_LABEL['chung-tu'];
                return (
                  <tr key={doc._id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <img
                        src={doc.coverImage || 'https://images.unsplash.com/photo-1568667256549-094345857637?w=100&h=100&fit=crop'}
                        alt=""
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=100&h=100&fit=crop'; }}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-primary line-clamp-1">{doc.title}</p>
                      {doc.description && (
                        <span className="text-[11px] text-on-surface-variant line-clamp-1">{doc.description}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-sm font-semibold ${typeMeta.color}`}>
                        <span className="material-symbols-outlined text-[14px]">{typeMeta.icon}</span>
                        {typeMeta.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">{formatDate(doc.createdAt)}</td>
                    <td className="p-4">
                      {doc.fileUrl ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary underline hover:text-secondary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Xem file ↗
                        </a>
                      ) : (
                        <span className="text-xs text-outline-variant">Chưa upload</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 ${badge.bg} ${badge.text} text-xs rounded-sm font-semibold`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/admin/documents/${doc._id}/edit`}
                        className="text-primary hover:text-secondary p-2 inline-block"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(doc._id, doc.title)}
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
