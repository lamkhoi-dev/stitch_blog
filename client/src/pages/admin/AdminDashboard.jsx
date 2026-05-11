import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';

const STAT_CARDS = [
  { key: 'totalArticles', label: 'Tổng bài viết', icon: 'article', color: 'text-primary' },
  { key: 'totalPublished', label: 'Đã xuất bản', icon: 'check_circle', color: 'text-green-600' },
  { key: 'totalDrafts', label: 'Bản nháp', icon: 'edit_note', color: 'text-amber-600' },
  { key: 'totalTopics', label: 'Chủ đề', icon: 'category', color: 'text-secondary' },
  { key: 'totalBooks', label: 'Tổng sách', icon: 'menu_book', color: 'text-teal-600' },
  { key: 'totalDocuments', label: 'Tổng tài liệu', icon: 'description', color: 'text-indigo-600' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">Dashboard Tổng quan</h1>
        <Link
          to="/admin/articles/new"
          className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-sm hover:bg-primary/90 flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tạo bài viết
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {STAT_CARDS.map(({ key, label, icon, color }) => (
          <div key={key} className="p-6 bg-white border border-outline-variant/20 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">{label}</span>
              <span className={`material-symbols-outlined ${color} text-[24px]`}>{icon}</span>
            </div>
            <p className={`text-4xl font-headline font-bold ${color}`}>{stats?.[key] ?? '—'}</p>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="bg-white border border-outline-variant/20 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
          <h2 className="font-semibold text-primary">Bài viết gần đây</h2>
          <Link to="/admin/articles" className="text-sm text-secondary hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface text-on-surface-variant text-xs uppercase tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Tiêu đề</th>
              <th className="p-3 font-semibold w-28">Danh mục</th>
              <th className="p-3 font-semibold w-28">Ngày tạo</th>
              <th className="p-3 font-semibold w-24">Trạng thái</th>
              <th className="p-3 font-semibold w-20 text-right">Lượt xem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-sm">
            {stats?.recentArticles?.map((a) => (
              <tr key={a._id} className="hover:bg-surface/50">
                <td className="p-3">
                  <Link to={`/admin/articles/${a._id}/edit`} className="text-primary hover:text-secondary font-medium line-clamp-1">
                    {a.title}
                  </Link>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-xs rounded-sm">
                    {a.category}
                  </span>
                </td>
                <td className="p-3 text-on-surface-variant">{formatDate(a.createdAt)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-sm font-semibold ${
                      a.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {a.status === 'published' ? 'Xuất bản' : 'Nháp'}
                  </span>
                </td>
                <td className="p-3 text-right text-on-surface-variant">{a.viewCount || 0}</td>
              </tr>
            ))}
            {(!stats?.recentArticles || stats.recentArticles.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                  Chưa có bài viết nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
