import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary w-full">
      {/* Subscription Section */}
      <section className="bg-primary-container py-16 px-6 lg:px-12 border-b border-on-primary-container/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="font-headline italic text-3xl text-primary-fixed">Nhận bản tin tri thức</h2>
            <p className="text-on-primary-container mt-2 text-sm">
              Cập nhật những phân tích chuyên sâu về địa chính trị và logistics toàn cầu trực tiếp vào hộp thư của bạn.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                className="bg-primary/30 border border-on-primary-container/20 text-white placeholder:text-on-primary-container/60 rounded-md px-6 py-3 focus:ring-1 focus:ring-primary-fixed outline-none min-w-[300px] transition-all duration-300"
                placeholder="Địa chỉ email của bạn"
                type="email"
              />
              <button
                className="bg-primary-fixed text-primary px-8 py-3 rounded-md font-medium uppercase text-[11px] tracking-wider hover:bg-white transition-colors duration-300"
                type="submit"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-12 py-20 flex flex-col lg:flex-row justify-between gap-16">
        {/* Identity Column */}
        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-4">
            <span className="text-3xl font-headline italic text-white block">Logiknowledge</span>
            <p className="text-on-primary-container/80 text-sm leading-relaxed max-w-xs">
              An editorial intelligence platform dedicated to the precision of global logistics and the authority of academic inquiry.
            </p>
          </div>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full flex items-center justify-center bg-on-primary-container/10 hover:bg-on-primary-container/20 transition-all group" href="#">
              <span className="material-symbols-outlined text-[20px] text-on-primary-container group-hover:text-white">video_library</span>
            </a>
            <a className="w-10 h-10 rounded-full flex items-center justify-center bg-on-primary-container/10 hover:bg-on-primary-container/20 transition-all group" href="#">
              <span className="material-symbols-outlined text-[20px] text-on-primary-container group-hover:text-white">article</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Governance */}
          <div className="space-y-6">
            <h3 className="uppercase text-[11px] font-bold tracking-[0.2em] text-primary-fixed">Governance</h3>
            <ul className="space-y-4">
              <li><Link to="/ve-chung-toi" className="text-on-primary-container/70 text-sm hover:text-white transition-opacity duration-300">Institutional Access</Link></li>
              <li><a className="text-on-primary-container/70 text-sm hover:text-white transition-opacity duration-300" href="#">Ethical Guidelines</a></li>
              <li><a className="text-on-primary-container/70 text-sm hover:text-white transition-opacity duration-300" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="uppercase text-[11px] font-bold tracking-[0.2em] text-primary-fixed">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a className="group flex flex-col" href="mailto:info@logiknowledge.com">
                  <span className="text-on-primary-container/70 text-sm group-hover:text-white transition-colors duration-300">info@logiknowledge.com</span>
                  <span className="uppercase text-[9px] text-on-primary-container/40 mt-1">Editorial Enquiries</span>
                </a>
              </li>
              <li>
                <a className="group flex flex-col" href="tel:+84123456789">
                  <span className="text-on-primary-container/70 text-sm group-hover:text-white transition-colors duration-300">+84 123 456 789</span>
                  <span className="uppercase text-[9px] text-on-primary-container/40 mt-1">Global Logistics Desk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Network Status */}
          <div className="space-y-6">
            <h3 className="uppercase text-[11px] font-bold tracking-[0.2em] text-primary-fixed">Network Status</h3>
            <div className="p-4 bg-primary-container rounded border border-on-primary-container/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-widest text-emerald-400">Systems Operational</span>
              </div>
              <div className="h-16 w-full opacity-30 flex items-end gap-1">
                {[40, 60, 30, 90, 50, 70, 45, 80, 65].map((h, i) => (
                  <div key={i} className="w-1 bg-on-primary-container" style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className="text-[10px] text-on-primary-container/50 mt-2">Real-time intelligence flow across 42 logistical nodes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-on-primary-container/5 bg-on-surface py-12 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
            © 2024 Logiknowledge. Editorial Intelligence &amp; Global Logistics.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">language</span>
              London — Singapore — New York
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
