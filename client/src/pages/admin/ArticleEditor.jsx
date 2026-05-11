import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../../services/adminService';
import RichTextEditor from '../../components/admin/RichTextEditor';

const CATEGORY_OPTIONS = [
  { value: 'tin-tuc', label: 'Tin tức Thị trường' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'topic-post', label: 'Chuyên đề (Logistics / Chuỗi cung ứng)' },
];

const PARENT_CATEGORIES = [
  { value: 'logistics', label: 'Logistics' },
  { value: 'chuoi-cung-ung', label: 'Chuỗi cung ứng' },
];

const EMPTY_FORM = {
  title: '',
  category: 'tin-tuc',
  topic: '',
  parentCategory: '',
  tags: [],
  coverImage: '',
  excerpt: '',
  content: '',
  author: { name: 'Ban biên tập Logiverse', title: '', avatarUrl: '' },
  status: 'draft',
  publishDate: new Date().toISOString().split('T')[0],
  readTime: '5 phút',
};

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(EMPTY_FORM);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const fileInputRef = useRef(null);

  // Fetch article data for edit mode
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      setLoading(true);
      try {
        const article = await adminService.getArticleById(id);
        setForm({
          title: article.title || '',
          category: article.category || 'tin-tuc',
          topic: article.topic || '',
          parentCategory: article.parentCategory || '',
          tags: article.tags || [],
          coverImage: article.coverImage || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          author: article.author || EMPTY_FORM.author,
          status: article.status || 'draft',
          publishDate: article.publishDate ? new Date(article.publishDate).toISOString().split('T')[0] : '',
          readTime: article.readTime || '5 phút',
        });
        if (article.coverImage) setCoverPreview(article.coverImage);
      } catch {
        toast.error('Không thể tải bài viết');
        navigate('/admin/articles');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, navigate]);

  // Fetch topics when parentCategory changes
  useEffect(() => {
    if (form.category !== 'topic-post' || !form.parentCategory) {
      setTopics([]);
      return;
    }
    adminService.getTopics(form.parentCategory).then(setTopics).catch(() => setTopics([]));
  }, [form.parentCategory, form.category]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (value) => {
    updateField('category', value);
    if (value !== 'topic-post') {
      updateField('topic', '');
      updateField('parentCategory', '');
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await adminService.uploadImage(file);
      // Cloudinary returns full https:// URL; local disk returns relative /uploads/... path
      const url = result.isCloudinary
        ? result.url
        : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5001'}${result.url}`;
      updateField('coverImage', url);
      setCoverPreview(url);
      toast.success('Đã tải ảnh lên');
    } catch {
      toast.error('Upload ảnh thất bại');
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField('tags', [...form.tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag) => {
    updateField('tags', form.tags.filter((t) => t !== tag));
  };

  const handleSave = async (status) => {
    if (!form.title.trim()) {
      toast.error('Vui lòng nhập tiêu đề');
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      status,
      publishDate: form.publishDate ? new Date(form.publishDate).toISOString() : new Date().toISOString(),
    };

    try {
      if (isEdit) {
        await adminService.updateArticle(id, payload);
        toast.success('Đã cập nhật bài viết');
      } else {
        await adminService.createArticle(payload);
        toast.success('Đã tạo bài viết');
      }
      navigate('/admin/articles');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lưu thất bại');
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
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/articles"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-outline-variant/20 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-headline font-bold text-primary">
          {isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm">
            <input
              type="text"
              placeholder="Tiêu đề bài viết..."
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full text-2xl font-headline font-bold text-primary placeholder:text-outline-variant/50 border-none outline-none"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm">
            <label className="block text-sm font-semibold text-primary mb-2">Tóm tắt</label>
            <textarea
              placeholder="Mô tả ngắn gọn nội dung bài viết..."
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              rows={3}
              className="w-full p-3 border border-outline-variant/20 rounded-sm text-sm resize-none focus:border-secondary outline-none"
            />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Nội dung bài viết</label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => updateField('content', html)}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish actions */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm space-y-3">
            <h3 className="font-semibold text-primary border-b border-outline-variant/20 pb-2">Xuất bản</h3>
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="w-full py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              {saving ? 'Đang lưu...' : isEdit ? 'Cập nhật & Xuất bản' : 'Lưu & Xuất bản'}
            </button>
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="w-full py-3 bg-surface border border-outline-variant/30 text-primary font-bold rounded-sm hover:bg-outline-variant/10 disabled:opacity-60 transition-colors"
            >
              Lưu nháp
            </button>
          </div>

          {/* Category */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm space-y-4">
            <h3 className="font-semibold text-primary border-b border-outline-variant/20 pb-2">Phân loại</h3>
            <div>
              <label className="block text-sm text-on-surface-variant mb-1">Danh mục</label>
              <select
                value={form.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {form.category === 'topic-post' && (
              <>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Nhóm chuyên mục</label>
                  <select
                    value={form.parentCategory}
                    onChange={(e) => updateField('parentCategory', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
                  >
                    <option value="">— Chọn —</option>
                    {PARENT_CATEGORIES.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Chủ đề</label>
                  <select
                    value={form.topic}
                    onChange={(e) => updateField('topic', e.target.value)}
                    className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
                  >
                    <option value="">— Chọn —</option>
                    {topics.map((t) => (
                      <option key={t._id} value={t.slug}>{t.nameVi}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Cover image */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm space-y-4">
            <h3 className="font-semibold text-primary border-b border-outline-variant/20 pb-2">Ảnh đại diện</h3>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            {coverPreview ? (
              <div className="relative group">
                <img src={coverPreview} alt="Cover" className="w-full aspect-video object-cover rounded-sm" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-sm">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-primary text-sm rounded-sm font-semibold"
                  >
                    Thay đổi
                  </button>
                  <button
                    type="button"
                    onClick={() => { updateField('coverImage', ''); setCoverPreview(''); }}
                    className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-sm font-semibold"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-surface border-2 border-dashed border-outline-variant/30 flex items-center justify-center rounded-sm cursor-pointer hover:border-secondary transition-colors"
              >
                <div className="text-center">
                  <span className="material-symbols-outlined text-outline-variant mb-2">cloud_upload</span>
                  <p className="text-sm text-outline-variant">Tải ảnh lên</p>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm space-y-4">
            <h3 className="font-semibold text-primary border-b border-outline-variant/20 pb-2">Tags</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Thêm tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 p-2 border border-outline-variant/30 rounded-sm text-sm focus:border-secondary outline-none"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-secondary text-on-secondary text-sm rounded-sm font-semibold hover:bg-secondary/80 transition-colors"
              >
                +
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-secondary-container text-on-secondary-container text-xs rounded-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="bg-white p-6 border border-outline-variant/20 rounded-sm space-y-4">
            <h3 className="font-semibold text-primary border-b border-outline-variant/20 pb-2">Meta</h3>
            <div>
              <label className="block text-sm text-on-surface-variant mb-1">Ngày đăng</label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => updateField('publishDate', e.target.value)}
                className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-on-surface-variant mb-1">Thời gian đọc</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => updateField('readTime', e.target.value)}
                className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-on-surface-variant mb-1">Tác giả</label>
              <input
                type="text"
                value={form.author.name}
                onChange={(e) => updateField('author', { ...form.author, name: e.target.value })}
                className="w-full p-2 border border-outline-variant/30 rounded-sm text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
