const coreValues = [
  {
    icon: 'account_tree',
    title: 'Hệ Thống Hóa',
    description: 'Chuyển đổi dữ liệu thô và các lý thuyết rời rạc thành các mô hình quản trị có cấu trúc, giúp doanh nghiệp dễ dàng áp dụng vào quy trình vận hành.',
  },
  {
    icon: 'translate',
    title: 'Bản Địa Hóa',
    description: 'Tinh chỉnh những tiêu chuẩn quốc tế để phù hợp với đặc thù pháp lý, hạ tầng và văn hóa kinh doanh tại Việt Nam.',
  },
  {
    icon: 'auto_awesome',
    title: 'Đổi Mới AI',
    description: 'Tận dụng trí tuệ nhân tạo để phân tích xu hướng logistics, dự báo biến động thị trường và cá nhân hóa trải nghiệm học tập tri thức.',
  },
];

const teamMembers = [
  {
    name: 'Dr. Minh Khôi',
    role: 'Chủ biên Logistics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1o_N6_2ufY8D-7Rt6LIx5tIYT_ht1vONSt5byxPCBSS1zPLPUhAl71_7FcFUiLMaINCXUiyNr1pFMcxpHJ9NoM0Q2VZBfEv-Z4dA-U4ZWMhr2wtqjF-B7MRMSBLdRld9lqiWkpXiXBjUf4TjMO1CR9NBfE5l0d3Gwnfir3XDhf7Jb0mgXDjFebtQVneDceaEkU0OctpjMfzafVAcLLBpFDUTwx3QdTfP9ajV504VoAgbknHAIQE3_Gd72dcLzzqQ28ABo5u6hXKw',
  },
  {
    name: 'Lê Mai Anh',
    role: 'Chuyên gia Chuỗi cung ứng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr4T8RvVhupZTwOeCCoNfLI2A5WH0ItPwf9U77pPod0sYv3ZGQiElBTihA0MdlZvPMaWdmUkZ-30qJD2FL8b0vqbdFbiezrrotVanS4AvSz5wsGbVWSqJ_jcUVXnrI5f6YaumMMo-icjERwEYej5XvSadhCyPgy6Fb5S0o2mqrl-fZPXW0lkH1BX9-mVTi2XEHPzr245bcF6QUcavRdEeZOsEJ0WgI9VvmtY4F5CXMRxHNxCRGCcAkSk0xvhn5D0XhOuxX36KAuLs',
  },
  {
    name: 'GS. Trần Hữu',
    role: 'Cố vấn Chiến lược',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8LX04rrQxH8jiGl-rwanxRbxEO5PidM-S2Wu2QLZXjfi-cGtRHzP5HvlnTW3BtZ9SdO3buda42KcypjTJpMhE4HA54RhE27_j7Zd_f79unXg8R8WI6lG2fTZml1Bdl_s0VvEgwN35t_GqLTf82AACwgRQynqF8kfbTEqM7fF864G8HS2NwCJd82ZI02ADV8Bm4lhNJcGJwsbwgMtN8_85olPNdQ7hOa-gmNjzk15eAeJ0uNZNlAxIbcy9Q_2KMwuYI3CIA6F_Sd0',
  },
  {
    name: 'Phạm Thảo Vy',
    role: 'Giám đốc Công nghệ (AI)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl9xda_jCeBpZFxZpp_QQ6DncdJCr3c1jkscvsc-G98tOmp_A4zOsjFASAPZur8pVWZPuSf7FILmNxy92iz46-2UgMj1yBpAm17hvgm8p1L6lWbAn03CWVw2xs8O4e4e_fliFpE6cb6EcOCcjGQRq1eR-qPab0Pl65OA3XAOQHVjGNezgZM02msRJgAZ8Ehg8eVOo-UjwxKuQbVFpmME6nSls3elP2KPPK6Ccu58hmvL6wRoY-pE4cQNqafOvmls0SG6KLiyueMVo',
  },
];

const techPartners = ['WordPress', 'Gemini AI', 'n8n.io'];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden min-h-[716px] flex items-center">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 380c20-5 40-10 70-5s60 20 100 15 80-30 130-20 70 20 100 10v20H0v-20zm0-40c30-10 60 0 90 5s60 0 100-15 80-20 120-5 60 25 90 15v20c-30 10-60-5-90-15s-80-10-120 5-60 15-100 15-60-15-90-5v-20z' fill='%231f4060' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-24 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm mb-6">
            Editorial Archive
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-headline leading-tight mb-8">
            Về Chúng Tôi
          </h1>
          <p className="text-xl md:text-2xl text-on-primary-container font-body max-w-2xl font-light leading-relaxed">
            Kiến tạo bản đồ tri thức Logistics toàn cầu, kết nối lý thuyết kinh điển với thực tiễn chuyển đổi số tại Việt Nam.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block opacity-20">
          <img
            alt="background texture"
            className="w-full h-full object-cover grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1dCXu_NCeqGyNztpNaVDxq5czfuxBIfxVtFA10q7Hc8Uigxw8JsRt2btUvIXw0gAKsSt39iliQ1sWhUxruyw0cEvtzM_LZogRuj-WHIpor-r6VNUDmVXAO9t1C8vJ90UVBkRmvghkD8jWSotGAxdZOaK-fJXHe8iqI0zDAwW9elyeqvbQK4ZOK3I_K1E0WulBimHz8FHfVyxH6QcY6jaFLUdZWMOR7vFzPucFev0P_jvWwQAzauohTZ4lbkzQQyoYZiwCfh6kBUM"
          />
        </div>
      </section>

      {/* Our Story/Mission Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-4xl md:text-5xl text-primary font-headline leading-tight">
              Sứ mệnh hệ thống hóa tri thức Logistics.
            </h2>
            <div className="mt-8 h-1 w-24 bg-primary" />
            <p className="mt-8 text-on-surface-variant font-body text-lg leading-relaxed italic">
              "Thông tin không phải là kiến thức. Kiến thức thực sự chỉ đến từ việc cấu trúc hóa dữ liệu thành một lộ trình có thể thực thi."
            </p>
          </div>
          <div className="lg:col-span-7 space-y-12 text-on-surface font-body text-lg leading-loose">
            <p>
              Logiverse ra đời từ một nhu cầu cấp thiết: Sự đứt gãy giữa các giáo trình Logistics kinh điển thế giới và thực trạng vận hành tại thị trường Việt Nam. Chúng tôi không chỉ dịch thuật; chúng tôi <strong>bản địa hóa tri thức</strong>.
            </p>
            <div className="p-8 bg-surface-container-low border-l-4 border-primary">
              <p className="font-medium text-primary mb-4">Mối liên kết Cengage</p>
              Chúng tôi tập trung vào việc hệ thống hóa và chuyển ngữ các học thuyết Logistics từ <strong>Cengage</strong>—nhà xuất bản giáo dục hàng đầu thế giới. Bằng cách kết hợp độ chính xác học thuật với ngôn ngữ thực tiễn của ngành, Logiverse giúp các chuyên gia Việt Nam tiếp cận những tinh hoa quản trị chuỗi cung ứng hiện đại nhất.
            </div>
            <p>
              Mỗi bài viết, mỗi bản đồ tư duy trên Logiverse đều được đội ngũ biên tập kiểm duyệt gắt gao theo tiêu chuẩn báo chí học thuật. Chúng tôi tin rằng, một ngành Logistics vững mạnh cần được xây dựng trên một nền tảng tri thức được quy hoạch bài bản như những hải đồ chi tiết nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl text-primary font-headline">Giá Trị Cốt Lõi</h2>
            <p className="text-on-surface-variant font-label uppercase tracking-widest max-w-xs text-right">03 Trụ cột của sự chính xác</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]">
            {coreValues.map((value, idx) => (
              <div
                key={value.title}
                className={`bg-surface p-12 hover:bg-surface-container transition-colors group ${idx === 1 ? 'border-x border-outline-variant/20' : ''}`}
              >
                <span className="material-symbols-outlined text-4xl text-primary mb-8 block">{value.icon}</span>
                <h3 className="text-2xl font-headline text-primary mb-6">{value.title}</h3>
                <p className="text-on-surface-variant font-body leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-primary font-headline mb-4">Hội Đồng Biên Tập</h2>
            <p className="text-on-surface-variant font-body">Những người đứng sau các bản đồ tri thức của chúng tôi</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[3/4] bg-surface-container-high mb-6 overflow-hidden">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    src={member.image}
                  />
                </div>
                <h4 className="text-xl font-headline text-primary">{member.name}</h4>
                <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Partners */}
      <section className="py-24 px-8 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 opacity-80">
          <div className="font-headline text-2xl text-primary font-bold italic">Tech Stack</div>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            {techPartners.map((tech) => (
              <span key={tech} className="font-body font-bold text-on-surface-variant text-xl">{tech}</span>
            ))}
            <div className="h-8 w-px bg-outline-variant" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">school</span>
              <span className="font-body font-bold text-primary text-xl">FTU Partner</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
