import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';

const PARENT_OPTIONS = [
  { value: 'logistics', label: 'Logistics' },
  { value: 'chuoi-cung-ung', label: 'Chuỗi cung ứng' },
];

const EMPTY_FORM = {
  slug: '',
  name: '',
  nameVi: '',
  parentCategory: 'logistics',
  icon: 'category',
  description: '',
  order: 0,
};

export default function TopicManager() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getTopics();
      setTopics(data);
    } catch {
      toast.error('Không thể tải danh sách chủ đề');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTopics(); }, [fetchTopics]);

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (topic) => {
    setEditId(topic._id);
    setForm({
      slug: topic.slug,
      name: topic.name,
      nameVi: topic.nameVi,
      parentCategory: topic.parentCategory,
      icon: topic.icon || 'category',
      description: topic.description || '',
      order: topic.order || 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.slug || !form.name || !form.nameVi) {
      toast.error('Vui lòng điền đầy đủ Slug, Tên EN và Tên VI');
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await adminService.updateTopic(editId, form);
        toast.success('Đã cập nhật chủ đề');
      } else {
        await adminService.createTopic(form);
        toast.success('Đã tạo chủ đề');
      }
      setShowModal(false);
      fetchTopics();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (topic) => {
    if (!window.confirm(`Xóa chủ đề "${topic.nameVi}"? Không thể hoàn tác.`)) return;
    try {
      await adminService.deleteTopic(topic._id);
      toast.success('Đã xóa chủ đề');
      fetchTopics();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Xóa thất bại');
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Group topics by parent
  const grouped = {
    logistics: topics.filter((t) => t.parentCategory === 'logistics'),
    'chuoi-cung-ung': topics.filter((t) => t.parentCategory === 'chuoi-cung-ung'),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Quản lý Chủ đề</h1>
          <p className="text-sm text-on-surface-variant mt-1">{topics.length} chủ đề</p>
        </div>
        <button
          onClick={openCreate}
          className="px-6 py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Thêm chủ đề
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        Object.entries(grouped).map(([parent, items]) => (
          <div key={parent} className="mb-8">
            <h2 className="text-lg font-semibold text-primary mb-3 uppercase tracking-wider">
              {parent === 'logistics' ? '📦 Logistics' : '🔗 Chuỗi cung ứng'}
            </h2>
            <div className="bg-white border border-outline-variant/20 rounded-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-surface border-b border-outline-variant/20 text-on-surface-variant text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3 font-semibold w-12">#</th>
                    <th className="p-3 font-semibold">Slug</th>
                    <th className="p-3 font-semibold">Tên (EN)</th>
                    <th className="p-3 font-semibold">Tên (VI)</th>
                    <th className="p-3 font-semibold w-16">Icon</th>
                    <th className="p-3 font-semibold w-24 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                        Chưa có chủ đề nào
                      </td>
                    </tr>
                  ) : (
                    items.map((t) => (
                      <tr key={t._id} className="hover:bg-surface/50 transition-colors">
                        <td className="p-3 text-on-surface-variant">{t.order}</td>
                        <td className="p-3 font-mono text-xs">{t.slug}</td>
                        <td className="p-3 font-semibold text-primary">{t.name}</td>
                        <td className="p-3">{t.nameVi}</td>
                        <td className="p-3">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{t.icon}</span>
                        </td>
                        <td className="p-3 text-right">
                          <button onClick={() => openEdit(t)} className="text-primary hover:text-secondary p-1.5">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button onClick={() => handleDelete(t)} className="text-red-500 hover:text-red-700 p-1.5">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20">
              <h3 className="text-xl font-headline font-bold text-primary">
                {editId ? 'Chỉnh sửa chủ đề' : 'Tạo chủ đề mới'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Slug *</label>
                  <input
                    value={form.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm focus:border-secondary outline-none"
                    placeholder="e.g. warehousing"
                    disabled={!!editId}
                  />
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Nhóm chuyên mục</label>
                  <select
                    value={form.parentCategory}
                    onChange={(e) => updateField('parentCategory', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
                  >
                    {PARENT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Tên (EN) *</label>
                  <input
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm focus:border-secondary outline-none"
                    placeholder="Warehousing"
                  />
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Tên (VI) *</label>
                  <input
                    value={form.nameVi}
                    onChange={(e) => updateField('nameVi', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm focus:border-secondary outline-none"
                    placeholder="Kho bãi"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Icon (Material Symbol)</label>
                  <input
                    value={form.icon}
                    onChange={(e) => updateField('icon', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm focus:border-secondary outline-none"
                    placeholder="category"
                  />
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Thứ tự</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm focus:border-secondary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-on-surface-variant mb-1">Mô tả</label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={2}
                  className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm resize-none focus:border-secondary outline-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border border-outline-variant/30 rounded-sm text-sm font-semibold hover:bg-surface transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-primary text-white rounded-sm text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {saving ? 'Đang lưu...' : editId ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
