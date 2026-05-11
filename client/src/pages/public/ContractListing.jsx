import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDocuments } from '../../hooks/useDocuments';
import { getImageUrl } from '../../utils/imageUtils';

const TYPE_TABS = [
  { key: '', label: 'Tất cả' },
  { key: 'hop-dong', label: 'Hợp đồng' },
  { key: 'chung-tu', label: 'Chứng từ' },
  { key: 'incoterms', label: 'Incoterms' },
];

const TYPE_LABEL_MAP = {
  'hop-dong': 'Hợp đồng',
  'chung-tu': 'Chứng từ',
  'incoterms': 'Incoterms',
};

const TYPE_ICON_MAP = {
  'hop-dong': 'picture_as_pdf',
  'chung-tu': 'description',
  'incoterms': 'swap_horiz',
};

// Dynamic hero content per tab
const PAGE_META = {
  '': {
    title: 'Hợp đồng, Chứng từ & Incoterms',
    description: 'Kho lưu trữ toàn bộ biểu mẫu pháp lý, chứng từ thực tế và các điều kiện thương mại quốc tế Incoterms chuyên ngành logistics.',
  },
  'hop-dong': {
    title: 'Hợp đồng',
    description: 'Kho lưu trữ các mẫu hợp đồng thương mại, vận chuyển, 3PL và đại lý tiêu chuẩn cho doanh nghiệp logistics.',
  },
  'chung-tu': {
    title: 'Chứng từ',
    description: 'Tập hợp các biểu mẫu chứng từ xuất nhập khẩu thực tế: tờ khai hải quan, Packing List, Invoice, Vận đơn, L/C, C/O...',
  },
  'incoterms': {
    title: 'Incoterms',
    description: 'Tra cứu và phân tích 11 điều kiện thương mại quốc tế Incoterms 2020 — từ EXW, FCA, FOB, CIF đến DAP, DDP và DPU.',
  },
};

const FALLBACK_DOC = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop';

export default function ContractListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const [activeType, setActiveType] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState('');

  const queryParams = useMemo(() => {
    const params = { limit: 20 };
    if (activeType) params.type = activeType;
    if (searchTerm) params.search = searchTerm;
    return params;
  }, [activeType, searchTerm]);

  const { documents, isLoading, error } = useDocuments(queryParams);

  const handleTabChange = (key) => {
    setActiveType(key);
    if (key) {
      setSearchParams({ type: key });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="pt-12 pb-20 max-w-7xl mx-auto px-8">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <span className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">Thư viện học thuật</span>
            <h1 className="text-6xl md:text-7xl font-headline font-bold text-primary tracking-tight leading-none mb-6">
              {PAGE_META[activeType]?.title}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
              {PAGE_META[activeType]?.description}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-full bg-surface-container-low p-1 rounded-lg">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-md focus:ring-2 focus:ring-primary placeholder:text-outline-variant font-body"
                  placeholder="Tìm kiếm tài liệu..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs + Results */}
      <div className="space-y-12">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="flex gap-2">
            {TYPE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeType === tab.key
                    ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-on-surface-variant text-sm font-medium">
            {isLoading ? '...' : documents.length} kết quả
          </span>
        </div>

        {/* Loading & Error */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
          </div>
        )}
        {error && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant">Không thể tải tài liệu. Vui lòng thử lại sau.</p>
          </div>
        )}

        {/* Document Cards */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-8">
            {documents.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl mb-4 block opacity-40">folder_open</span>
                <p className="italic">Chưa có tài liệu nào trong danh mục này.</p>
              </div>
            ) : (
              documents.map((doc) => (
                <Link
                  key={doc._id}
                  to={`/thu-vien/hop-dong-chung-tu/${doc.slug}?type=${doc.type}`}
                  className="group grid grid-cols-1 md:grid-cols-12 bg-surface-container-low hover:bg-surface-container-high transition-colors duration-500 overflow-hidden rounded-md"
                >
                  <div className="md:col-span-4 h-64 md:h-auto relative">
                    <img
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      src={getImageUrl(doc.coverImage) || FALLBACK_DOC}
                      alt={doc.title}
                      onError={(e) => { e.target.src = FALLBACK_DOC; }}
                    />
                  </div>
                  <div className="md:col-span-8 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-headline font-bold text-primary group-hover:text-primary-container transition-colors">{doc.title}</h3>
                        <div className="flex items-center gap-2 bg-primary/5 px-2 py-1 shrink-0 ml-4">
                          <span className="material-symbols-outlined text-primary text-lg">
                            {TYPE_ICON_MAP[doc.type] || 'description'}
                          </span>
                          <span className="text-[10px] font-bold text-primary uppercase">
                            {TYPE_LABEL_MAP[doc.type] || doc.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-on-surface-variant line-clamp-3 mb-6 font-body leading-relaxed">{doc.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                      <div className="flex items-center gap-6">
                        <div className="text-xs">
                          <span className="text-outline uppercase tracking-tighter block mb-1">Ngày cập nhật</span>
                          <span className="text-primary font-bold">
                            {new Date(doc.updatedAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-outline uppercase tracking-tighter block mb-1">Loại</span>
                          <span className="text-primary font-bold">
                            {TYPE_LABEL_MAP[doc.type] || doc.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-primary font-bold text-sm underline decoration-secondary/30 underline-offset-8 hover:decoration-primary transition-all">
                        Tải xuống tài liệu
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
