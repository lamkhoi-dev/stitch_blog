import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import RichTextEditor from '../../components/admin/RichTextEditor';

const EMPTY_CHAPTER = { title: '', excerpt: '', content: '' };

export default function BookEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    author: '',
    year: new Date().getFullYear(),
    coverImage: '',
    description: '',
    chapters: [],
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    adminService.getBookById(id)
      .then((book) => {
        setForm({
          title: book.title || '',
          subtitle: book.subtitle || '',
          author: book.author || '',
          year: book.year || new Date().getFullYear(),
          coverImage: book.coverImage || '',
          description: book.description || '',
          chapters: book.chapters || [],
          status: book.status || 'draft',
        });
      })
      .catch(() => toast.error('Không thể tải dữ liệu sách'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  // Chapter management
  const addChapter = () => {
    setForm((prev) => ({ ...prev, chapters: [...prev.chapters, { ...EMPTY_CHAPTER }] }));
  };

  const updateChapter = (index, field, value) => {
    setForm((prev) => {
      const chapters = [...prev.chapters];
      chapters[index] = { ...chapters[index], [field]: value };
      return { ...prev, chapters };
    });
  };

  const removeChapter = (index) => {
    setForm((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  };

  const moveChapter = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= form.chapters.length) return;
    setForm((prev) => {
      const chapters = [...prev.chapters];
      [chapters[index], chapters[newIndex]] = [chapters[newIndex], chapters[index]];
      return { ...prev, chapters };
    });
  };

  // Cover image upload
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
      toast.success('Đã tải ảnh bìa');
    } catch {
      toast.error('Lỗi tải ảnh');
    }
  };

  // Save
  const handleSave = async (status) => {
    if (!form.title.trim()) return toast.error('Vui lòng nhập tiêu đề sách');
    if (!form.author.trim()) return toast.error('Vui lòng nhập tên tác giả');

    setSaving(true);
    try {
      const payload = { ...form, status };
      if (isEdit) {
        await adminService.updateBook(id, payload);
        toast.success('Đã cập nhật sách');
      } else {
        await adminService.createBook(payload);
        toast.success('Đã tạo sách mới');
      }
      navigate('/admin/books');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi lưu sách');
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
        <button onClick={() => navigate('/admin/books')} className="text-primary hover:text-secondary">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-3xl font-headline font-bold text-primary">
          {isEdit ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
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
              placeholder="Tiêu đề sách..."
              className="w-full text-2xl font-headline font-bold text-primary placeholder:text-outline-variant/50 outline-none border-none"
            />
          </div>

          {/* Subtitle */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 block">Phụ đề</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Phụ đề sách (tùy chọn)..."
              className="w-full text-sm text-on-surface placeholder:text-outline-variant/50 outline-none border-none"
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 block">Mô tả</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Mô tả ngắn gọn về cuốn sách..."
              rows={4}
              className="w-full text-sm text-on-surface placeholder:text-outline-variant/50 outline-none border-none resize-none"
            />
          </div>

          {/* Chapters */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Danh sách chương ({form.chapters.length})
              </label>
              <button
                onClick={addChapter}
                className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-sm hover:bg-primary/90 flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm chương
              </button>
            </div>

            {form.chapters.length === 0 ? (
              <p className="text-sm text-on-surface-variant text-center py-8 border border-dashed border-outline-variant/20 rounded">
                Chưa có chương nào. Bấm "Thêm chương" để bắt đầu.
              </p>
            ) : (
              <div className="space-y-3">
                {form.chapters.map((chapter, index) => (
                  <div key={index} className="border border-outline-variant/15 rounded p-4 bg-surface/30">
                    <div className="flex items-start gap-3">
                      {/* Order controls */}
                      <div className="flex flex-col gap-0.5 pt-1">
                        <button
                          onClick={() => moveChapter(index, -1)}
                          disabled={index === 0}
                          className="text-outline-variant hover:text-primary disabled:opacity-20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">expand_less</span>
                        </button>
                        <span className="text-[10px] text-on-surface-variant font-bold text-center">{index + 1}</span>
                        <button
                          onClick={() => moveChapter(index, 1)}
                          disabled={index === form.chapters.length - 1}
                          className="text-outline-variant hover:text-primary disabled:opacity-20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>

                      {/* Chapter fields */}
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapter(index, 'title', e.target.value)}
                          placeholder={`Tiêu đề Chương ${index + 1}...`}
                          className="w-full text-sm font-semibold text-on-surface outline-none border-b border-outline-variant/20 pb-1 focus:border-primary transition-colors"
                        />
                        <input
                          type="text"
                          value={chapter.excerpt}
                          onChange={(e) => updateChapter(index, 'excerpt', e.target.value)}
                          placeholder="Tóm tắt nội dung chương..."
                          className="w-full text-xs text-on-surface-variant outline-none"
                        />
                        <div className="mt-2">
                          <RichTextEditor
                            content={chapter.content || ''}
                            onChange={(html) => updateChapter(index, 'content', html)}
                          />
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeChapter(index)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

          {/* Cover Image */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6">
            <h3 className="font-bold text-on-surface mb-4">Ảnh bìa</h3>
            {form.coverImage ? (
              <div className="relative group">
                <img src={form.coverImage} alt="Cover" className="w-full aspect-[3/4] object-cover rounded" />
                <button
                  onClick={() => updateField('coverImage', '')}
                  className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-outline-variant/30 rounded cursor-pointer hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-3xl text-outline-variant mb-2">cloud_upload</span>
                <span className="text-sm text-on-surface-variant">Tải ảnh lên</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            )}
          </div>

          {/* Author & Year */}
          <div className="bg-white rounded-sm border border-outline-variant/20 p-6 space-y-4">
            <h3 className="font-bold text-on-surface mb-2">Thông tin</h3>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Tác giả</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Tên tác giả..."
                className="w-full text-sm border border-outline-variant/20 rounded-sm px-3 py-2 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Năm xuất bản</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => updateField('year', parseInt(e.target.value) || new Date().getFullYear())}
                className="w-full text-sm border border-outline-variant/20 rounded-sm px-3 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
