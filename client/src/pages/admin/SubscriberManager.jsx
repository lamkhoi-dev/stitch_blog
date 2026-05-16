import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

export default function SubscriberManager() {
  const [subscribers, setSubscribers] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/subscribers?limit=200');
      setSubscribers(res.data.subscribers || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Xóa subscriber: ${email}?`)) return;
    setDeletingId(id);
    try {
      await apiClient.delete(`/subscribers/${id}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      alert('Xóa thất bại.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    const header = 'Email,Ngày đăng ký,Nguồn,Trạng thái\n';
    const rows = subscribers.map((s) =>
      `${s.email},${new Date(s.subscribedAt).toLocaleString('vi-VN')},${s.source},${s.status}`
    ).join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh sách Đăng ký Bản tin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng cộng <strong>{total}</strong> người đăng ký
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          disabled={subscribers.length === 0}
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Xuất CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-5xl block mb-3">mark_email_unread</span>
            <p>Chưa có ai đăng ký bản tin.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày đăng ký</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nguồn</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((s, i) => (
                <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{s.email}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(s.subscribedAt).toLocaleString('vi-VN', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">{s.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      s.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.status === 'active' ? 'Đang theo dõi' : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(s._id, s.email)}
                      disabled={deletingId === s._id}
                      className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
