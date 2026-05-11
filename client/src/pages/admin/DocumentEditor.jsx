import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import RichTextEditor from '../../components/admin/RichTextEditor';

export default function DocumentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    type: 'hop-dong',
    description: '',
    content: '',
    fileUrl: '',
    coverImage: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    adminService.getDocumentById(id)
      .then((doc) => {
        setForm({
          title: doc.title || '',
          type: doc.type || 'hop-dong',
          description: doc.description || '',
          content: doc.content || '',
          fileUrl: doc.fileUrl || '',
          coverImage: doc.coverImage || '',
          status: doc.status || 'draft',
        });
      })
      .catch(() => toast.error('Không thể tải dữ liệu tài liệu'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await adminService.uploadImage(file);
      // Cloudinary returns full https:// URL; local disk returns relative /uploads/... path
      const url = data.isCloudinary
        ? data.url
        : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5001'}${data.url}`;
      updateField('coverImage', url);
      toast.success('Đã tải ảnh');
    } catch {
      toast.error('Lỗi tải ảnh');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const data = await adminService.uploadImage(file);
      const url = data.isCloudinary
        ? data.url
        : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5001'}${data.url}`;
      updateField('fileUrl', url);
      toast.success('Đã upload file tài liệu');
    } catch {
      toast.error('Lỗi upload file');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSave = async (status) => {
    if (!form.title.trim()) return toast.error('Vui lòng nhập tiêu đề');

    setSaving(true);
    try {
      const payload = { ...form, status };
      if (isEdit) {
        await adminService.updateDocument(id, payload);
        toast.success('Đã cập nhật tài liệu');
      } else {
        await adminService.createDocument(payload);
        toast.success('Đã tạo tài liệu mới');
      }
      navigate('/admin/documents');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi lưu tài liệu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/documents')} className="text-primary hover:text-secondary">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-3xl font-headline font-bold text-primary">
          {isEdit ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Tiêu đề tài liệu..."
              className="w-full text-2xl font-headline font-bold text-primary placeholder:text-outline-variant/50 outline-none border-none"
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 block">Mô tả</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Mô tả nội dung tài liệu..."
              rows={6}
              className="w-full text-sm text-on-surface placeholder:text-outline-variant/50 outline-none border-none resize-none"
            />
          </div>

          {/* Content (Rich Text) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Nội dung bài viết</label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => updateField('content', html)}
            />
          </div>

          {/* File Upload / URL */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3 block">
              File tài liệu
            </label>

            {/* Upload button */}
            <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-outline-variant/30 rounded cursor-pointer hover:border-primary/50 transition-colors mb-3">
              <span className="material-symbols-outlined text-on-surface-variant">
                {uploadingFile ? 'hourglass_empty' : 'upload_file'}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">
                  {uploadingFile ? 'Đang upload...' : 'Upload file PDF / DOCX'}
                </p>
                <p className="text-[11px] text-on-surface-variant">Tối đa 20MB</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploadingFile}
              />
            </label>

            {/* Manual URL fallback */}
            <div className="flex gap-3 items-center">
              <span className="text-xs text-on-surface-variant whitespace-nowrap">hoặc dán URL:</span>
              <input
                type="url"
                value={form.fileUrl}
                onChange={(e) => updateField('fileUrl', e.target.value)}
                placeholder="https://example.com/document.pdf"
                className="flex-1 text-sm border border-outline-variant/20 rounded-sm px-3 py-2 outline-none focus:border-primary"
              />
              {form.fileUrl && (
                <a
                  href={form.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-surface-container text-primary text-sm font-bold rounded-sm hover:bg-surface-container-high flex items-center gap-1 transition-colors whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  Xem
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <h3 className="font-bold text-on-surface mb-4">Xuất bản</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSave('published')}
                disabled={saving}
                className="w-full py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Đang lưu...' : 'Lưu & Xuất bản'}
              </button>
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="w-full py-3 border border-outline-variant/30 text-on-surface font-bold rounded-sm hover:bg-surface transition-colors disabled:opacity-50"
              >
                Lưu nháp
              </button>
            </div>
          </div>

          {/* Type */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <h3 className="font-bold text-on-surface mb-4">Loại tài liệu</h3>
            <select
              value={form.type}
              onChange={(e) => updateField('type', e.target.value)}
              className="w-full text-sm border border-outline-variant/20 rounded-sm px-3 py-2 outline-none focus:border-primary"
            >
              <option value="hop-dong">Hợp đồng</option>
              <option value="chung-tu">Chứng từ</option>
              <option value="incoterms">Incoterms</option>
            </select>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <h3 className="font-bold text-on-surface mb-4">Ảnh đại diện</h3>
            {form.coverImage ? (
              <div className="relative group">
                <img src={form.coverImage} alt="Cover" className="w-full aspect-video object-cover rounded" />
                <button
                  onClick={() => updateField('coverImage', '')}
                  className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-outline-variant/30 rounded cursor-pointer hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-3xl text-outline-variant mb-2">cloud_upload</span>
                <span className="text-sm text-on-surface-variant">Tải ảnh lên</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
