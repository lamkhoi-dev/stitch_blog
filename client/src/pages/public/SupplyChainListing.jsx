import { Link } from 'react-router-dom';

const intelligenceCards = [
  {
    id: 1,
    slug: 'bien-dong-gia-cuoc-bien-q3-2024',
    title: 'Biến động Giá cước Biển Q3/2024: Phân tích Tuyến Á-Âu & Xuyên Thái Bình Dương',
    date: '15 Tháng 10, 2024',
    tag: 'Freight Intelligence',
    icon: 'sailing',
    description: 'Đánh giá tác động của căng thẳng Biển Đỏ và tình trạng tắc nghẽn tại các cảng trung chuyển lớn lên chỉ số SCFI và WCI trong quý 3.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDubL3D_TLsWXIX90XyraP38aLXLj5DTHINv68HuFt1mCkhqrted0ZzFG3BwBceaI0okWTUMtdQnZb8vcsiBEad5V-XfXt3_z0V2__iGSIkJlQqjWS32_bV9_WsSBr8fVV2m6EixqHE5cGb_qIaxbxaBKuBuSXd24_AWokzgQd7LOEBdUhNAEd5LW9LndlDIH8S3kW2SDE71lbWLuqHs2D_seOrx06xCAbncu9C_zqlg9eCE6Kqk8MnC510xIsygvzCGI0bHGP6lCc',
  },
  {
    id: 2,
    slug: 'xanh-hoa-chuoi-cung-ung-asean',
    title: 'Xanh hóa Chuỗi cung ứng ASEAN: Lộ trình và Thách thức Thực thi ESG',
    date: '08 Tháng 10, 2024',
    tag: 'ESG & Sustainability',
    icon: 'eco',
    description: 'Phân tích các bộ tiêu chuẩn ESG mới từ EU và tác động trực tiếp đến chiến lược mua hàng và sản xuất của doanh nghiệp Việt Nam.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARIBNcEYw8IMASUZlI53NHrCycmSUaOF-YIHre0eb6d8t7JEWO1rzJSRy8ssXb-sxcafWhY_csqTb8-Ma5WSVdETVeyvgQ5x14brl1CJp9v32FWo2pueExCoADbNvR9Cy2JF2di9DFbkjvlZaMAD89D0XV4s11updOkwUxAO2nPvd3NhXXedghRh-TJo4p-bLMEl6W-YAE5-rhGjfucDoz0bUBacovqQ_5Ta-Q7YW6orSSrakP3mi76surqu8SQQykSbpUdshGpAc',
  },
  {
    id: 3,
    slug: 'ung-dung-ai-du-bao-nhu-cau',
    title: 'Ứng dụng AI trong Dự báo Nhu cầu: Từ Mô hình đến Triển khai Thực tế',
    date: '01 Tháng 10, 2024',
    tag: 'Digital Transformation',
    icon: 'smart_toy',
    description: 'Case study về việc ứng dụng mô hình Machine Learning để dự báo nhu cầu tồn kho và tối ưu hóa đặt hàng tự động trong ngành FMCG.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZsBiPODvQ4P2IZWlksRSHBw6fezlYuSdijgC1-4-qW8eP7VJiefDHWYVJsV_6B5_T6EDRskF_RyKqn21gMAsZgwtT6quc02reSxWwCBJQ5gMgz_QsHtx2bSydAggFehzlsp3VRVSfNTrPasY9fKjaKj7owydk41I-s_jtwNYrDbhpKXjjDvJp57in-B5XaT1OdE3Cp435-IR_9ay3OSGBs61TNjnlsIZpSU59Gk__4l09QOoZeae4QAGUd0dlh2EReC8gLjbvxRM',
  },
  {
    id: 4,
    slug: 'chuoi-cung-ung-ban-dan-2024',
    title: 'Chuỗi cung ứng Bán dẫn: Bản đồ Phụ thuộc Toàn cầu và Cơ hội cho Việt Nam',
    date: '20 Tháng 09, 2024',
    tag: 'Strategic Analysis',
    icon: 'memory',
    description: 'Giải mã mạng lưới sản xuất chip toàn cầu và phân tích vị thế chiến lược của Việt Nam trong cuộc đua thu hút đầu tư bán dẫn.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMYgKOq_Jo6ynQuzeZ8_ze5IYmcAI4pNN7rr5BTwIhuaJlM5joZ7Rx5dJYkSTVTgjInUzsFu_heWt73mAGQU4h2J5OfbKY7rc_HvrXn5Swt-Gy48v9YnqUuZBHTiKTkbAY4HgzNBRWYNXqrWBT36uFAq92T1nkCCDyix5A6hN79xKYGIusUyitUhAuIm64lw1KkzSGnlpGXA-3jrFry8oRCNWYUoF9o0metZDmOvUU0qqPB0kCZI2FAjSHzu_QTf8ukDDGrYSNbUY',
  },
];

const kpiMetrics = [
  { value: '127+', label: 'Báo cáo phân tích' },
  { value: '18', label: 'Chuyên gia đóng góp' },
  { value: '45k+', label: 'Người theo dõi' },
];

export default function SupplyChainListing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="px-8 py-20 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm mb-6">
              Intelligence Hub
            </span>
            <h1 className="font-headline text-5xl md:text-6xl text-primary font-bold leading-tight tracking-tight mb-6">
              Chuỗi Cung ứng <br /><span className="italic">Thông minh.</span>
            </h1>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
              Trung tâm phân tích chiến lược dành cho các nhà hoạch định chuỗi cung ứng. Nơi hội tụ dữ liệu thị trường, xu hướng công nghệ và báo cáo chuyên sâu từ các chuyên gia hàng đầu.
            </p>
            <div className="flex gap-8">
              {kpiMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="font-headline text-3xl font-bold text-primary">{metric.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-outline mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[450px] rounded-xl overflow-hidden shadow-xl">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWVAvPfghbnkB8KEoA_BtKm1x6VW4oor7mCS57q6h2IALSwyeUtafyUMdPS4RWE3mHHpc6wL3_IvJUY33PIF6IPjY3-MGGjDfkHIeqlshbPS5JPwwzVL0mmkvZSlGYMrtdqRbyjkS7Ir7LdL7xl3GefWtjgRzY1HksDW3z4DEet_CiR2pgOKPiw22iu1p-BDNtwkhnY_5JEPCTcWyOm8tYbtw9VvC36iqnf36f_V5cP5Vo3WxROEl1AQPdzKXN1mjytyr5jlU408U"
              alt="Supply chain intelligence dashboard"
            />
          </div>
        </div>
      </section>

      {/* Intelligence Cards */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-headline text-4xl font-bold text-primary mb-3">Báo cáo Mới nhất</h2>
              <p className="text-on-surface-variant text-sm">Phân tích chuyên sâu từ đội ngũ biên tập của Logiverse</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm">Tất cả</button>
              <button className="px-4 py-2 bg-surface text-on-surface-variant text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-surface-container transition-colors">Freight</button>
              <button className="px-4 py-2 bg-surface text-on-surface-variant text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-surface-container transition-colors">ESG</button>
              <button className="px-4 py-2 bg-surface text-on-surface-variant text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-surface-container transition-colors">Digital</button>
            </div>
          </div>

          <div className="space-y-8">
            {intelligenceCards.map((card) => (
              <Link
                key={card.id}
                to={`/chuoi-cung-ung/${card.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-surface-container-lowest rounded-md border border-outline-variant/10 overflow-hidden hover:shadow-lg transition-shadow duration-500"
              >
                <div className="lg:col-span-4 h-64 lg:h-auto overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    src={card.image}
                    alt={card.title}
                  />
                </div>
                <div className="lg:col-span-8 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="material-symbols-outlined text-primary text-lg">{card.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{card.tag}</span>
                      <span className="text-[10px] text-outline">•</span>
                      <span className="text-[10px] text-outline">{card.date}</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-primary-container transition-colors mb-4 leading-snug">{card.title}</h3>
                    <p className="text-on-surface-variant line-clamp-2 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="flex items-center mt-6 pt-4 border-t border-outline-variant/10">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform flex items-center gap-2">
                      Đọc phân tích <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-20 flex justify-center">
            <button className="group flex items-center gap-4 bg-surface px-10 py-5 rounded-full border border-outline-variant/20 hover:bg-surface-container transition-all shadow-sm">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Khám phá thêm</span>
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
